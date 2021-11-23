/* Importar dependencias */
import { useState } from 'react';
import { ReactNode } from "react"

/* importar estilo */
import '../styles/components/item.scss'

/* Componentes */
import { Modal } from '../components/Modal'

type ItemProps = {
    titulo?: string;
    desc?: string;
    valor?: string;
    children?: ReactNode; // (? = opcional) Elementos dentro do componente
}

export function Item({ titulo = "titulo", desc = "desc", valor = "R$ 0,00", children }: ItemProps) {
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

export function ItemButtons() {
    const [showModal, setModal] = useState(false);

    return (
        <div className='itemBtn'>
            <button onClick={() => setModal(true)}>Editar</button>
            <button className="btnDel">Excluir</button>
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