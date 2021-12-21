/* Importar dependencias */
import { useEffect, useState } from 'react';
import { criarCategoria } from '../functions/realtimeFirebase';

/* Estilo da página */
import '../styles/components/btnAddTag.scss'

/* Imagens */
import addIcon from '../assets/icons/add.png'

/* Componentes */
import { Modal } from '../components/Modal'

type ItemProps = {
    user?: string;
    categoriaId?: number;
    titulo?: string;
}

export function BtnAddTag({ user }: ItemProps) {
    // Estados das variaveis
    const [showModal, setModal] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [getTitulo, setTitulo] = useState('');

    // Checar se as inputs estão vazias (caso não, liberar o botão salvar)
    useEffect(() => {
        if (getTitulo != '') {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    });

    // Funções
    const salvar = () => {
        if (!disabled) {
            criarCategoria(user, getTitulo);
        }
    }
    const setReset = () => {
        setTitulo('');
    }
    const cancelar = () => {
        setModal(false);
        setReset();
    }

    // Virtual DOM
    return (
        <div className="btnAddTag">
            <br />
            <button onClick={() => setModal(true)}>
                <img src={addIcon} alt="" />
                NOVA CATEGORIA
            </button>
            <br />
            {showModal ?
                <Modal>
                    <input type="text" placeholder="Categoria" value={getTitulo} onInput={txt => setTitulo((txt.target as HTMLTextAreaElement).value)} />
                    <button type='button' onClick={salvar} className="btnSave" disabled={disabled}>Salvar</button>
                    <button type='button' onClick={cancelar} className="btnCancel">Cancelar</button>
                </Modal> : null}
        </div>
    )
}