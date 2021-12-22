/* Importar Funções */
import { logInGoogle } from '../functions/googleAuth'

/* Importar Imagens */
import homeImg from '../assets/images/home.svg';
import googleIcon from '../assets/icons/google.svg';

/* Importar estilo da página */
import '../styles/pages/home.scss';

export function Home() {
    const user = localStorage.getItem('@cardapio-facil/userid'); //Obeter informações do usuário no localstorage (cookie)
    const goTo = window.location;

    /* Funções */
    const entrar = async () => {
        if (!user) {
            await logInGoogle();
            try {
                goTo.href = "/menu/edit";
            }
            catch (e) {
                console.error(e);
            }
        }
        else {
            goTo.href = "/menu/edit";
        }
    }

    return (
        <div className='home'>
            <aside>
                <img src={homeImg} alt="" />
            </aside>
            <main>
                <div>
                    <h1>Monte e compartilhe seu cardápio</h1>
                    <h2>fácil, rápido e de graça!</h2>
                    <button onClick={entrar} >
                        <img src={googleIcon} alt="" />
                        Entrar com o Google
                    </button>
                </div>
            </main>
        </div>
    )
}