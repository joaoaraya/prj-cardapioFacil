/* Importar dependencias */
import { useEffect, useState } from 'react';
import { atualizarCategoria, excluirCategoria } from '../functions/realtimeFirebase';

/* Importar estilo */
import '../styles/components/itemTagEditor.scss';

/* Importar Imagens */
import delIcon from '../assets/icons/delete.png'
import removeIcon from '../assets/icons/remove.png'
import editIcon from '../assets/icons/edit.png';

/* Componentes */
import { Modal } from '../components/Modal'

type ItemProps = {
    user?: string;
    id?: number;
    titulo?: string;
}

export function ItemTagEditor({ user, id, titulo }: ItemProps) {
    // Estados das variaveis
    const [showModalEdit, setModalEdit] = useState(false);
    const [showModalDel, setModalDel] = useState(false);
    const [getTitulo, setTitulo] = useState(titulo);
    const [btnSaveOff, setBtnSaveOff] = useState(true);
    const [btnSaveTxt, setBtnSaveTxt] = useState('Salvar');

    // Checar se as inputs estão vazias (caso não, liberar o botão salvar)
    useEffect(() => {
        if (getTitulo !== '') {
            setBtnSaveOff(false);
        } else {
            setBtnSaveOff(true);
        }
    });

    // Funções
    const salvar = async () => {
        setBtnSaveTxt('Salvando...');

        const resposta: any = await atualizarCategoria(user, id, getTitulo);
        try {
            resposta === 'sucess' ? setBtnSaveTxt('Salvo!') : setBtnSaveTxt('Não salvo!');
        }
        catch (e) {
            setBtnSaveTxt('Não salvo!');
            console.error(e);
        }
    }
    const excluir = () => {
        excluirCategoria(user, id);
    }
    const setDefault = () => {
        setTitulo(titulo);
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
        <div className='itemTagEditor'>
            <span>{titulo}</span>
            <div className="actionButtons">
                <button onClick={() => setModalDel(true)} title="Excluir categoria" className="btnDel">
                    <img src={removeIcon} alt="excluir" />
                </button>
                <button onClick={() => setModalEdit(true)} title="Editar categoria">
                    <img src={editIcon} alt="editar" />
                </button>
            </div>

            {showModalEdit ?
                <Modal>
                    <input type="text" placeholder="Categoria" value={getTitulo} onInput={txt => setTitulo((txt.target as HTMLTextAreaElement).value)} />
                    <button type='button' onClick={salvar} className="btnSave" disabled={btnSaveOff}>{btnSaveTxt}</button>
                    <button type='button' onClick={fechar} className="btnClose">Voltar</button>
                </Modal> : null
            }
            {showModalDel ?
                <Modal>
                    <img className='imgDel' src={delIcon} alt="delete" />
                    <h1 className='del'>Remover categoria <ins>{getTitulo}</ins> ?</h1>
                    <h2 className='delDesc'>Todos os itens serão apagados juntos!</h2>
                    <button type='button' onClick={excluir} className="btnSave del">Excluir</button>
                    <button type='button' onClick={fechar} className="btnClose">Cancelar</button>
                </Modal> : null
            }
        </div>
    )
}