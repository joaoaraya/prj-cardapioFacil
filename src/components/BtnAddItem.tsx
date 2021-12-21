/* Importar dependencias */
import { useEffect, useState } from 'react';
import { criarItem } from '../functions/realtimeFirebase';

/* Estilo da página */
import '../styles/components/btnAddItem.scss'

/* Imagens */
import addIcon from '../assets/icons/add.png'

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
    const [disabled, setDisabled] = useState(true);
    const [getTitulo, setTitulo] = useState('');
    const [getDesc, setDesc] = useState('');
    const [getValor, setValor] = useState('');

    // Checar se as inputs estão vazias (caso não, liberar o botão salvar)
    useEffect(() => {
        if (getTitulo != '' && getDesc != '' && getValor != '') {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    });

    // Funções
    const salvar = () => {
        if (!disabled) {
            criarItem(user, categoriaId, getTitulo, getDesc, getValor);
        }
    }
    const setReset = () => {
        setTitulo('');
        setDesc('');
        setValor('');
    }
    const cancelar = () => {
        setModal(false);
        setReset();
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
                    <button type='button' onClick={salvar} className="btnSave" disabled={disabled}>Salvar</button>
                    <button type='button' onClick={cancelar} className="btnCancel">Cancelar</button>
                </Modal> : null}
        </div>
    )
}