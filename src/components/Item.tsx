/* Importar dependencias */
import { useState, ReactNode } from 'react';

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

export function Item({ titulo = "titulo", desc = "desc", valor = "0.00", children }: ItemProps) {
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

export function ItemButtons({ titulo, desc, valor }: ItemProps) {
    const [showModal, setModal] = useState(false);
    const [getTitulo, setTitulo] = useState(titulo);
    const [getDesc, setDesc] = useState(desc);
    const [getValor, setValor] = useState(valor);

    return (
        <div className='itemBtn'>
            <button onClick={() => setModal(true)}>Editar</button>
            <button className="btnDel">Excluir</button>
            {showModal ?
                <Modal>
                    <form>
                        <input type="text" placeholder="Produto" value={getTitulo} onInput={e => setTitulo((e.target as HTMLTextAreaElement).value)} />
                        <input type="text" placeholder="Descrição" value={getDesc} onInput={e => setDesc((e.target as HTMLTextAreaElement).value)} />
                        <input type="text" placeholder="R$ 0,00" value={getValor} onInput={e => setValor((e.target as HTMLTextAreaElement).value)} />
                        <button type='submit' className="btnSave">Salvar</button>
                        <button className="btnCancel">Cancelar</button>
                    </form>
                </Modal> : null}
        </div>
    )
}