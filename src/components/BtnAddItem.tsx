/* Importar dependencias */
import { useEffect, useState } from 'react';
import { criarItem } from '../functions/realtimeFirebase';

/* Estilo da página */
import '../styles/components/btnAddItem.scss'

/* Imagens */
import addIcon from '../assets/icons/add.svg'

/* Componentes */
import { Modal } from '../components/Modal'

type ItemProps = {
    user?: string;
    categoriaId?: number;
    id?: number;
    titulo?: string;
    desc?: string;
    valor?: string;
}

export function BtnAddItem({ user, categoriaId }: ItemProps) {
    // Estados das variaveis
    const [showModal, setModal] = useState(false);
    const [getTitulo, setTitulo] = useState('');
    const [getDesc, setDesc] = useState('');
    const [getValor, setValor] = useState('');
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

        const resposta: any = await criarItem(user, categoriaId, getTitulo, getDesc, getValor);
        try {
            if (resposta === 'sucess') {
                setBtnSaveTxt('Salvo!');
                setBtnSaveOff(false);
                fechar();
            } else {
                setBtnSaveTxt('Não salvo!');
            }
        }
        catch (e) {
            setBtnSaveTxt('Não salvo!');
            console.error(e);
        }
    }
    const setDefault = () => {
        setTitulo('');
        setDesc('');
        setValor('');
        setBtnSaveTxt('Salvar');
    }
    const fechar = () => {
        setModal(false);
        setDefault();
    }

    // Virtual DOM
    return (
        <div className="btnAddItem">
            <button onClick={() => setModal(true)}>
                <img src={addIcon} alt="" />
                NOVO ITEM
            </button>
            {showModal ?
                <Modal>
                    <input type="text" placeholder="Produto" value={getTitulo} onInput={txt => setTitulo((txt.target as HTMLTextAreaElement).value)} />
                    <input type="text" placeholder="Descrição" value={getDesc} onInput={txt => setDesc((txt.target as HTMLTextAreaElement).value)} />
                    <input type="text" placeholder="R$ 0,00" value={getValor} onInput={txt => setValor((txt.target as HTMLTextAreaElement).value)} />
                    <button type='button' onClick={salvar} className="btnSave" disabled={btnSaveOff}>{btnSaveTxt}</button>
                    <button type='button' onClick={fechar} className="btnClose">Voltar</button>
                </Modal> : null
            }
        </div>
    )
}