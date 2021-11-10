/* Importar Componetes da pagina */
import { Item, ItemButtons } from '../components/Item';
import { ItemTagEditor } from '../components/ItemTagEditor';
import { ItemImgEditor } from '../components/ItemImgEditor';
import { BtnAddItem } from '../components/BtnAddItem';

/* Importar imagens */
import editIcon from '../assets/icons/edit.png'
import viewIcon from '../assets/icons/view.png'

/* Importar estilo da página */
import '../styles/pages/editor.scss'

export function Editor() {
    return (
        <div className="editor">
            <div className="headerNav">
                <button><img src={editIcon} alt="" />Editar</button>
                <button><img src={viewIcon} alt="" />Prévia</button>
            </div>

            <div className="pageEdit">
                <div className="tag">
                    <ItemTagEditor />
                    <ItemImgEditor />
                    <Item>
                        <ItemButtons />
                    </Item>
                    <BtnAddItem />
                </div>
            </div>

            {/*<div className="pagePreview">
                <span>UAG72T3V<button>Copy</button></span>
                <input type="text" placeholder="Categoria" />
                <img src="x" alt="" />
                <Item />
    </div>*/}
            <button>+</button>
        </div>
    )
}