/* Importar dependencias */
import { useState, ReactNode, useEffect } from 'react';
import { atualizarItem, excluirItem } from '../functions/realtimeFirebase';

/* importar estilo */
import '../styles/components/item.scss'

/* Importar imagens */
import delIcon from '../assets/icons/delete.svg'

/* Componentes */
import { Modal } from '../components/Modal'

type ItemProps = {
    user?: string;
    categoriaId?: number;
    id?: number;
    titulo?: string;
    desc?: string;
    valor?: string;
    children?: ReactNode; // (? = opcional) Elementos dentro do componente
}

export function Item({ titulo = "titulo", desc = "desc", valor = "0.00", children }: ItemProps) {
    return (
        <div className='item'>
            <h1>{titulo}</h1>
            <h2>{desc}</h2>
            <span>{valor}</span>
            <div>
                {children /* Inclui-los aqui */}
            </div>
        </div>
    )
}

export function ItemButtons({ user, categoriaId, id, titulo, desc, valor }: ItemProps) {
    // Estados das variaveis
    const [showModalEdit, setModalEdit] = useState(false);
    const [showModalDel, setModalDel] = useState(false);
    const [getTitulo, setTitulo] = useState(titulo);
    const [getDesc, setDesc] = useState(desc);
    const [getValor, setValor] = useState(valor);
    const [btnSaveOff, setBtnSaveOff] = useState(true);
    const [btnSaveTxt, setBtnSaveTxt] = useState('Salvar');

    // Checar se as inputs estão vazias (caso não, liberar o botão salvar)
    useEffect(() => {
        if (getTitulo !== '' && getDesc !== '' && getValor !== '') {
            setBtnSaveOff(false);
        } else {
            setBtnSaveOff(true);
        }
    });

    // Funções
    const salvar = async () => {
        setBtnSaveTxt('Salvando...');

        const resposta: any = await atualizarItem(user, categoriaId, id, getTitulo, getDesc, getValor);
        try {
            resposta === 'sucess' ? setBtnSaveTxt('Salvo!') : setBtnSaveTxt('Não salvo!');
        }
        catch (e) {
            setBtnSaveTxt('Não salvo!');
            console.error(e);
        }
    }
    const excluir = () => {
        excluirItem(user, categoriaId, id)
    }
    const setDefault = () => {
        setTitulo(titulo);
        setDesc(desc);
        setValor(valor);
        setBtnSaveTxt('Salvar');
    }
    const fechar = () => {
        // Fechar modal e redefinir variaveis
        setModalEdit(false);
        setModalDel(false);
        setDefault();
    }

    // Virtual DOM
    return (
        <div className='itemBtn'>
            <button onClick={() => setModalEdit(true)}>Editar</button>
            <button onClick={() => setModalDel(true)} className="btnDel">Excluir</button>

            {showModalEdit ?
                <Modal>
                    <input type="text" placeholder="Produto" value={getTitulo} onInput={txt => setTitulo((txt.target as HTMLTextAreaElement).value)} />
                    <input type="text" placeholder="Descrição" value={getDesc} onInput={txt => setDesc((txt.target as HTMLTextAreaElement).value)} />
                    <input type="text" placeholder="R$ 0,00" value={getValor} onInput={txt => setValor((txt.target as HTMLTextAreaElement).value)} />
                    <button type='button' onClick={salvar} className="btnSave" disabled={btnSaveOff}>{btnSaveTxt}</button>
                    <button type='button' onClick={fechar} className="btnClose">Voltar</button>
                </Modal> : null
            }
            {showModalDel ?
                <Modal>
                    <img className='imgDel' src={delIcon} alt="delete" />
                    <h1 className='del'>Remover item <ins>{getTitulo}</ins> ?</h1>
                    <h2 className='delDesc'>A ação não poderá ser desfeita!</h2>
                    <button type='button' onClick={excluir} className="btnSave del">Excluir</button>
                    <button type='button' onClick={fechar} className="btnClose">Cancelar</button>
                </Modal> : null
            }
        </div >
    )
}