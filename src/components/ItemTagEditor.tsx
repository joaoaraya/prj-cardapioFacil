/* Importar Imagens */
import editIcon from '../assets/icons/edit.png';

/* Importar estilo */
import '../styles/components/itemTagEditor.scss';

export function ItemTagEditor() {
    return (
        <div className='itemTagEditor'>
            <span>Categoria</span>
            <button>
                <img src={editIcon} alt="editar" />
            </button>
        </div>
    )
}