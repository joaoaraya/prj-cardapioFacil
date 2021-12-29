import { ReactNode } from "react"

import '../styles/components/modal.scss'

type ItemProps = {
    children?: ReactNode; // (? = opcional) Elementos dentro do componente
}

export const Modal = ({ children }: ItemProps) => {
    return (
        <div className="modal">
            <div className="container">
                <div className="form">
                    {children}
                </div>
            </div>
        </div>
    )
}