/* importar imagens */
import cameraIcon from '../assets/icons/camera.png';

/* importar estilo */
import '../styles/components/itemImgEditor.scss';

type ImgProps = {
    imgURL?: string;
}

export function ItemImgEditor({ imgURL = "" }: ImgProps) {
    return (
        <div className="itemImgEditor" style={{ backgroundImage: `url("${imgURL}")` }}>
            <button>
                <img src={cameraIcon} alt="" />
            </button>
        </div>
    )
}