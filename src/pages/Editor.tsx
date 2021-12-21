import { useEffect, useState } from 'react';
import { procurarCardapio } from '../functions/realtimeFirebase';

/* Importar Componetes da pagina */
import { Item, ItemButtons } from '../components/Item';
import { ItemTagEditor } from '../components/ItemTagEditor';
import { ItemImgEditor } from '../components/ItemImgEditor';
import { BtnAddItem } from '../components/BtnAddItem';
import { BtnAddTag } from '../components/BtnAddTag';

/* Importar imagens */
import linkIcon from '../assets/icons/link.svg'

/* Importar estilo da página */
import '../styles/pages/editor.scss'

/* Types  */
type cardapioDadosTypes = {
    cardapio: {
        categoria: {
            show: boolean;
            titulo: string;
            imgURL: string;
            itens: {
                show: boolean;
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

    if (!userId) {
        window.location.href = "/";
    }

    useEffect(() => {
        (async () => {
            const dadosDoFirebase: any = await procurarCardapio(userId, true); // , true   Executa a função para procurar os dados no firebase, + envia o uuid e diz q é o editor
            const dados = []; // Cria um array
            dados.push(dadosDoFirebase); // Insere o Objeto com os dados do firebase no Array
            setCardapioDados(dados); // Atualiza o estado do componente com os dados
        })()
    });
    // OBS: executar o useEffect 1x = []); constante = basta remver o []

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
                        <>
                            {b.categoria.map((c, cIndex) =>
                                <>
                                    {c.show ?
                                        <>
                                            <ItemImgEditor imgURL={c.imgURL} />
                                            <ItemTagEditor user={userId as string} id={cIndex} titulo={c.titulo} />
                                            {c.itens.map((d, dIndex) =>
                                                <>
                                                    {d.show ?
                                                        <>
                                                            <Item titulo={d.titulo} desc={d.desc} valor={`R$ ${d.valor}`}>
                                                                <ItemButtons user={userId as string} categoriaId={cIndex} id={dIndex} titulo={d.titulo} desc={d.desc} valor={d.valor} />
                                                            </Item>
                                                        </>
                                                        : <></>
                                                    }
                                                </>
                                            )}
                                            <BtnAddItem user={userId as string} categoriaId={cIndex} />
                                        </>
                                        : <></>
                                    }
                                </>
                            )}< BtnAddTag user={userId as string} />
                        </>
                    )
                )}
            </div>

        </div>
    )
}
