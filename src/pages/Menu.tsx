/* Importar Componetes da pagina */
import { Item } from '../components/Item';
import { ItemTag } from '../components/ItemTag';
import { ItemImg } from '../components/ItemImg';
import { BarSearch } from '../components/BarSearch';

/* Importar imagens */
import addIcon from '../assets/icons/add.png'

/* Importar estilo da página */
import '../styles/pages/menu.scss'

export function Menu() {
    return (
        <div className="menu">
            <div className="header">
                <BarSearch />
            </div>
            <div className="menu-items">
                <ItemTag />
                <ItemImg />
                <Item />
                <Item />
                <Item />
                <ItemTag />
                <Item />
                <Item />
                <Item />
            </div>

            <div className="floatButton">
                <button title="Crie seu cardápio">
                    <img src={addIcon} alt="" />
                </button>
            </div>
        </div>
    )
}