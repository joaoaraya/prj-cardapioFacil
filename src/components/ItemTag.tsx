/* Importar estilo */
import '../styles/components/itemTag.scss';

type ItemProps = {
    titulo?: string;
}

export function ItemTag({ titulo }: ItemProps) {
    return (
        <div className='itemTag'>
            <h1>{titulo}</h1>
        </div>
    )
}