import { useEffect, useState } from 'react';
import { procurarCardapio } from '../functions/firestore'

/* Importar Componetes da pagina */
import { Item, ItemButtons } from '../components/Item';
import { ItemTagEditor } from '../components/ItemTagEditor';
import { ItemImgEditor } from '../components/ItemImgEditor';
import { BtnAddItem } from '../components/BtnAddItem';

/* Importar imagens */
import linkIcon from '../assets/icons/link.svg'

/* Importar estilo da página */
import '../styles/pages/editor.scss'

/* Types  */
type cardapioDadosTypes = {
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
}[];

export function Editor() {
    const userId = localStorage.getItem('@cardapio-facil/userid');
    const [cardapioDados, setCardapioDados] = useState([] as cardapioDadosTypes); // Inicia com um Array vazio, mas dizendo quais os Types dos dados

    useEffect(() => {
        (async () => {
            const dadosDoFirebase: any = await procurarCardapio(userId, true); // Executa a função para procurar os dados no firebase, + envia o uuid e diz q é o editor
            const dados = []; // Cria um array
            dados.push(dadosDoFirebase); // Insere o Objeto com os dados do firebase no Array
            setCardapioDados(dados); // Atualiza o estado do componente com os dados
        })()
    }, []);
    // Obs: para executar o useEfect constante basta remover [] no final do evento

    const openUrl = () => {
        window.open(`/menu/${userId}`);
    }

    return (
        <div className="editor">
            <div className="headerNav">
                <button onClick={openUrl}>
                    <span>Cardápio url: /{userId}</span>
                    <img src={linkIcon} alt="Copiar" />
                </button>
            </div>

            <div className="pageEdit">
                {cardapioDados.map(a =>
                    a.cardapio.map(b =>
                        b.categoria.map(c =>
                            <>
                                <ItemImgEditor imgURL={c.imgURL} />
                                <ItemTagEditor titulo={c.titulo} />
                                {c.itens.map(d =>
                                    <>
                                        <Item titulo={d.titulo} desc={d.desc} valor={`R$ ${d.valor}`}>
                                            <ItemButtons titulo={d.titulo} desc={d.desc} valor={`R$ ${d.valor}`} />
                                        </Item>
                                    </>
                                )}
                                <BtnAddItem />
                            </>
                        )
                    )
                )}
            </div>

        </div>
    )
}
