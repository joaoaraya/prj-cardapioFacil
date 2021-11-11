/* Importar dependencias */
import { useState } from 'react';

/* Imagens */
import addIcon from '../assets/icons/add.png'

/* Estilo da página */
import '../styles/components/btnAddItem.scss'

/* Componentes */
import { Modal } from '../components/Modal'

export function BtnAddItem() {
    const [showModal, setModal] = useState(false);

    return (
        <div className="btnAddItem">
            <button onClick={() => setModal(true)}>
                <img src={addIcon} alt="" />
                ADD PRODUTO
            </button>
            {showModal ?
                <Modal>
                    <input type="text" placeholder="Produto" />
                    <input type="text" placeholder="Descrição" />
                    <input type="text" placeholder="R$ 0,00" />
                    <button type='submit' className="btnSave">Salvar</button>
                    <button className="btnCancel">Cancelar</button>
                </Modal> : null}
        </div>
    )
}