import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { procurarCardapio } from '../functions/realtimeFirebase'

/* Importar Componetes da pagina */
import { Item } from '../components/Item';
import { ItemTag } from '../components/ItemTag';
import { ItemImg } from '../components/ItemImg';
import { BarSearch } from '../components/BarSearch';

/* Importar imagens */
import shareIcon from '../assets/icons/share.png'
import addIcon from '../assets/icons/add.png'

/* Importar estilo da página */
import '../styles/pages/menu.scss'

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

export function Menu() {
    const getUrl = window.location.pathname; // Ler Url atual
    const userId = getUrl.replace('/menu/', ''); // Obter somente o ID e apagar o restante da Url
    const navigate = useNavigate(); // Usar navigate
    const [cardapioDados, setCardapioDados] = useState([] as cardapioDadosTypes); // Inicia com um Array vazio, mas dizendo quais os Types dos dados

    useEffect(() => {
        (async () => {
            const dadosDoFirebase: any = await procurarCardapio(userId); // Executa a função para procurar os dados no firebase, + envia o uuid
            try {
                if (dadosDoFirebase == 404) {
                    navigate('/'); // MUDAR PARA UMA PAGINA "CARDAPIO NAO ENCONTRADO"
                } else {
                    const dados = []; // Cria um array
                    dados.push(dadosDoFirebase); // Insere o Objeto com os dados do firebase no Array
                    setCardapioDados(dados); // Atualiza o estado do componente com os dados
                }
            } catch (e) {
                console.log(e); // Ocorreu um erro;
            }
        })()
    }, []);
    // OBS: executar o useEffect: 1x = []); constante = basta remver o []

    // Compartilhar URL
    const shareData = {
        title: 'Cardápio Fácil',
        text: 'Monte e compartilhe seu cardápio fácil, rápido e de graça!',
        url: getUrl
    }
    const compartilharCardapio = () => {
        navigator.share(shareData);
    }

    // Voltar para o início
    const criarNovoCardapio = () => {
        navigate('/');
    }

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
                                {c.show ?
                                    <>
                                        {c.imgURL != "" ? <ItemImg imgURL={c.imgURL} /> : <></>}
                                        <ItemTag titulo={c.titulo} />
                                        {c.itens.map(d =>
                                            <>
                                                {d.show ?
                                                    <>
                                                        <Item titulo={d.titulo} desc={d.desc} valor={`R$ ${d.valor}`} />
                                                    </>
                                                    : <></>
                                                }
                                            </>
                                        )}
                                        <br />
                                    </>
                                    : <></>
                                }
                            </>
                        )
                    )
                )}
            </div>

            <div className="btnFloatMini">
                <button onClick={compartilharCardapio} className="btnShare" title="Compartilhar">
                    <img src={shareIcon} alt="share" />
                </button>
            </div>

            <div className="btnFloatBig">
                <button onClick={criarNovoCardapio} className="btnNew" title="Crie seu cardápio">
                    <img src={addIcon} alt="add" />
                </button>
            </div>
        </div>
    )
}