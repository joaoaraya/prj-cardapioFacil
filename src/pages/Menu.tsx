import { useEffect, useState } from 'react';
import { procurarCardapio } from '../functions/firestore'

/* Importar Componetes da pagina */
import { Item } from '../components/Item';
import { ItemTag } from '../components/ItemTag';
import { ItemImg } from '../components/ItemImg';
import { BarSearch } from '../components/BarSearch';

/* Importar imagens */
import addIcon from '../assets/icons/add.png'

/* Importar estilo da página */
import '../styles/pages/menu.scss'

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

export function Menu() {

    /// Ler HTTP get para gerar o objeto do cardapio pelo firebase
    // caso nao for encontrado redirecionar para cardapio nao encontrado

    //userId = pegar da url

    const [cardapioDados, setCardapioDados] = useState([] as cardapioDadosTypes); // Inicia com um Array vazio, mas dizendo quais os Types dos dados

    useEffect(() => {
        (async () => {
            const dadosDoFirebase: any = await procurarCardapio(userId); // Executa a função para procurar os dados no firebase
            const dados = []; // Cria um array
            dados.push(dadosDoFirebase); // Insere o Objeto com os dados do firebase no Array
            setCardapioDados(dados); // Atualiza o estado do componente com os dados
        })()
    }, []);
    // Obs: para executar o useEfect constante basta remover [] no final do evento

    return (
        <div className="menu">
            <div className="header">
                <BarSearch />
            </div>
            <div className="menu-items">
                {cardapioDados.map(a =>
                    a.cardapio.map(b =>
                        b.categoria.map(c =>
                            <>
                                <ItemImg />
                                <ItemTag titulo={c.titulo} />
                                {c.itens.map(d =>
                                    <>
                                        <Item titulo={d.titulo} desc={d.desc} valor={`R$ ${d.valor}`} />
                                    </>
                                )}
                            </>
                        )
                    )
                )}
            </div>

            <div className="floatButton">
                <button title="Crie seu cardápio">
                    <img src={addIcon} alt="" />
                </button>
            </div>
        </div>
    )
}