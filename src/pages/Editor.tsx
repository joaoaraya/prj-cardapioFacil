import { useEffect } from 'react';
import { procurarDoc } from '../functions/firestore'
import { cardapioDados } from '../functions/firestoreTemp'

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

/*
type componentsCardapioTypes = {
    cardapioDados: {
        cardapio: {
            categoria: {
                titulo: string;
                imgURL: string;
                itens: {
                    titulo: string;
                    desc: string;
                    valor: string;
                }[];
            }[];
        }[];
    }
}*/

export function Editor(/*{ cardapioDados }: componentsCardapioTypes*/) {
    const userId = localStorage.getItem('@cardapio-facil/userid');

    useEffect(() => {
        let cardapioDados = procurarDoc();
        console.log(cardapioDados);
    });

    // Incluir dados aos componentes pelo objeto do Firebase
    // Organizar os componentes em ordem
    const componentsCardapio = () => {
        let montarCardapio = [];


        for (let ia = 0; ia < cardapioDados.cardapio.length; ia++) {
            /// Quantos cardápios? (mudar esse código quando hover mais de 1 cardapio para não carregar todos de uma vez)

            for (let ib = 0; ib < cardapioDados.cardapio[ia].categoria.length; ib++) {
                /// Quantas categorias?

                const dataCategoria = cardapioDados.cardapio[ia].categoria[ib];
                // Imagem da categoria
                if (dataCategoria.imgURL != null) {
                    montarCardapio.push(<ItemImgEditor />);
                }
                // Nome da categoria
                montarCardapio.push(<ItemTagEditor titulo={dataCategoria.titulo} />);

                for (let ic = 0; ic < cardapioDados.cardapio[ia].categoria[ib].itens.length; ic++) {
                    /// Quantos itens?

                    const dataItens = cardapioDados.cardapio[ia].categoria[ib].itens[ic];
                    // Itens
                    montarCardapio.push(
                        <Item titulo={dataItens.titulo} desc={dataItens.desc} valor={`R$ ${dataItens.valor}`}>
                            <ItemButtons titulo={dataItens.titulo} desc={dataItens.desc} valor={`R$ ${dataItens.valor}`} />
                        </Item>
                    );

                }
                // Botão adicionar item (no final de todos itens)
                montarCardapio.push(<BtnAddItem />);
            }
        }

        return montarCardapio;
    }

    return (
        <div className="editor">
            <div className="headerNav">
                <button>
                    <span>Cardápio url: /{userId}</span>
                    <img src={copyIcon} alt="" />
                </button>
            </div>

            <div className="pageEdit">
                {componentsCardapio()}
            </div>

            <div className="floatButton">
                <button title="Add categoria">
                    <img src={addIcon} alt="" />
                </button>
            </div>
        </div>
    )
}
