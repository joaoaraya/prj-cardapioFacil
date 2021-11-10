import { ReactNode } from "react"

/* importar estilo */
import '../styles/components/item.scss'

type ItemProps = {
    children?: ReactNode; // (? = opcional) Elementos dentro do componente
}

export function Item({ children }: ItemProps) {
    return (
        <div className='item'>
            <h1>Clássico</h1>
            <h2>hamburguer, picles e tomate</h2>
            <span>R$ 29,00</span>
            <div>
                {children /* Inclui-los aqui */}
            </div>
        </div>
    )
}

export function ItemButtons() {
    return (
        <div className='itemBtn'>
            <button>Editar</button>
            <button className="btnDel">Excluir</button>
        </div>
    )
}