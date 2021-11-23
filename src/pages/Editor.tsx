import { useEffect } from 'react';
import { procurarDoc } from '../functions/firestore'

/* Importar Componetes da pagina */
import { Item, ItemButtons } from '../components/Item';
import { ItemTagEditor } from '../components/ItemTagEditor';
import { ItemImgEditor } from '../components/ItemImgEditor';
import { BtnAddItem } from '../components/BtnAddItem';

/* Importar imagens */
import copyIcon from '../assets/icons/copy.svg'
import addIcon from '../assets/icons/add.png'

/* Importar estilo da página */
import '../styles/pages/editor.scss'


const userId = localStorage.getItem('@cardapio-facil/userid');

export function Editor() {
    useEffect(() => {
        procurarDoc();
    });

    return (
        <div className="editor">
            <div className="headerNav">
                <button>
                    <span>Cardápio url: /{userId}</span>
                    <img src={copyIcon} alt="" />
                </button>
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

            <div className="floatButton">
                <button title="Add categoria">
                    <img src={addIcon} alt="" />
                </button>
            </div>
        </div>
    )
}