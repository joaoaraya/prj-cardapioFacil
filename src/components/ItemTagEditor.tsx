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
    const [disabled, setDisabled] = useState(true);
    const [getTitulo, setTitulo] = useState(titulo);

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
        atualizarCategoria(user, id, getTitulo);
    }
    const excluir = () => {
        excluirCategoria(user, id);
    }
    const setReset = () => {
        setTitulo(titulo);
    }
    const cancelar = () => {
        // Fechar modal e redefinir variaveis
        setModalEdit(false);
        setModalDel(false);
        setReset();
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
                    <button type='button' onClick={salvar} className="btnSave" disabled={disabled}>Salvar</button>
                    <button type='button' onClick={cancelar} className="btnCancel">Cancelar</button>
                </Modal> : null
            }
            {showModalDel ?
                <Modal>
                    <img src={delIcon} alt="delete" />
                    <h1 className='del'>Remover categoria <ins>{getTitulo}</ins> ?</h1>
                    <h2>Todos os itens serão apagados juntos!</h2>
                    <button type='button' onClick={excluir} className="btnSave del">Excluir</button>
                    <button type='button' onClick={cancelar} className="btnCancel">Cancelar</button>
                </Modal> : null
            }
        </div>
    )
}