import addIcon from '../assets/icons/add.png'

import '../styles/components/btnAddItem.scss'

export function BtnAddItem() {
    return (
        <div className="btnAddItem">
            <button>
                <img src={addIcon} alt="" />
                ADD PRODUTO
            </button>
        </div>
    )
}