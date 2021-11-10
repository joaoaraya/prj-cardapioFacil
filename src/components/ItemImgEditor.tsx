/* importar imagens */
import cameraIcon from '../assets/icons/camera.png';

/* importar estilo */
import '../styles/components/itemImgEditor.scss';

export function ItemImgEditor() {
    return (
        <div className="itemImgEditor">
            <button>
                <img src={cameraIcon} alt="" />
            </button>
        </div>
    )
}