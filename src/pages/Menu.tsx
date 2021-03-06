import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { procurarCardapio } from '../functions/realtimeFirebase'

/* Importar Componetes da pagina */
import { Item } from '../components/Item';
import { ItemTag } from '../components/ItemTag';
import { ItemImg } from '../components/ItemImg';
import { LogoMenu } from '../components/LogoMenu';

/* Importar imagens */
import shareIcon from '../assets/icons/share.svg'
import addIcon from '../assets/icons/add.svg'
import editIcon from '../assets/icons/edit.svg'

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
    const myUserId = localStorage.getItem('@cardapio-facil/userid'); // Se for o meu cardápio
    const navigate = useNavigate(); // Usar navigate
    const [cardapioDados, setCardapioDados] = useState([] as cardapioDadosTypes); // Inicia com um Array vazio, mas dizendo quais os Types dos dados

    useEffect(() => {
        (async () => {
            const dadosDoFirebase: any = await procurarCardapio(userId); // Executa a função para procurar os dados no firebase, + envia o uuid
            try {
                if (dadosDoFirebase === 404) {
                    navigate('/'); // Página de 'CARDAPIO NÃO ENCONTRADO'
                } else {
                    const dados = []; // Cria um array
                    dados.push(dadosDoFirebase); // Insere o Objeto com os dados do firebase no Array
                    setCardapioDados(dados); // Atualiza o estado do componente com os dados
                }
            }
            catch (e) {
                console.error(e);
            }
        })()
    }, []);
    // OBS: executar o useEffect: 1x = []); constante = basta remver o []

    /* Compartilhar URL */
    const compartilharCardapio = () => {
        const shareData = {
            title: 'Cardápio Fácil',
            text: 'Monte e compartilhe seu cardápio fácil, rápido e de graça!',
            url: getUrl
        }
        navigator.share(shareData);
    }

    /* Voltar para o início */
    const criarNovoCardapio = () => {
        navigate('/');
    }

    /* Editar meu cardápio */
    const editarCardapio = () => {
        navigate('/menu/edit');
    }

    return (
        <div className="menu">
            <div className="header">
                <LogoMenu />
            </div>
            <div className="menu-items">
                {cardapioDados.map(a =>
                    a.cardapio.map(b =>
                        b.categoria.map(c =>
                            <>
                                {c.show ?
                                    <>
                                        {c.imgURL !== "" ? <ItemImg imgURL={c.imgURL} /> : <></>}
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
                {userId === myUserId ?
                    <button onClick={editarCardapio} className="btnNew" title="Editar cardápio">
                        <img src={editIcon} alt="edit" />
                    </button>
                    :
                    <button onClick={criarNovoCardapio} className="btnNew" title="Crie seu cardápio">
                        <img src={addIcon} alt="add" />
                    </button>
                }
            </div>
        </div>
    )
}