/* Importar dependencias */
import { useState } from 'react';

/* Importar Imagens */
import editIcon from '../assets/icons/edit.png';

/* Importar estilo */
import '../styles/components/itemTagEditor.scss';

/* Componentes */
import { Modal } from '../components/Modal'

export function ItemTagEditor() {
    const [showModal, setModal] = useState(false);

    return (
        <div className='itemTagEditor'>
            <span>Categoria</span>
            <button onClick={() => setModal(true)} title="Editar categoria">
                <img src={editIcon} alt="editar" />
            </button>
            {showModal ?
                <Modal>
                    <input type="text" placeholder="Categoria" />
                    <button type='submit' className="btnSave">Salvar</button>
                    <button className="btnCancel">Cancelar</button>
                </Modal> : null}
        </div>
    )
}