/* Importar dependencias */
import { useState } from 'react';

/* Importar Imagens */
import editIcon from '../assets/icons/edit.png';

/* Importar estilo */
import '../styles/components/itemTagEditor.scss';

/* Componentes */
import { Modal } from '../components/Modal'

type ItemProps = {
    titulo?: string;
}

export function ItemTagEditor({ titulo }: ItemProps) {
    const [showModal, setModal] = useState(false);

    return (
        <div className='itemTagEditor'>
            <span>{titulo}</span>
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