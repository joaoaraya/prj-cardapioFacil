/* Importar Funções */
import { logInGoogle } from '../functions/googleAuth'
import { AuthRedirect } from '../hooks/authRedirect'

/* Importar Imagens */
import homeImg from '../assets/images/home.svg';
import googleIcon from '../assets/icons/google.svg';

/* Importar estilo da página */
import '../styles/pages/home.scss';

export function Home() {

    AuthRedirect('/menu/edit');

    return (
        <div className='home'>
            <aside>
                <img src={homeImg} alt="" />
            </aside>
            <main>
                <div>
                    <h1>Monte e compartilhe seu cardápio</h1>
                    <h2>fácil, rápido e de graça!</h2>
                    <button onClick={logInGoogle} >
                        <img src={googleIcon} alt="" />
                        Entrar com o Google
                    </button>
                </div>
            </main>
        </div>
    )
}