/* importar estilo */
import '../styles/components/itemImg.scss';

type ImgProps = {
    imgURL?: string;
}

export function ItemImg({ imgURL = "" }: ImgProps) {
    return (
        <div className="itemImg" style={{ backgroundImage: `url("${imgURL}")` }}>
        </div>
    )
}