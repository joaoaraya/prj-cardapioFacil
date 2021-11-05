/* Importar Imagens */
import homeImg from '../assets/images/home.svg';
import googleIconImg from '../assets/images/google.svg';

/* Importar estilo da página */
import '../styles/home.scss';

export function Home() {
    return (
        <div className='home'>
            <aside>
                <img src={homeImg} alt="" />
            </aside>
            <main>
                <div>
                    <h1>Monte e compartilhe seu cardápio</h1>
                    <h2>fácil, rápido e de graça!</h2>
                    <button>
                        <img src={googleIconImg} alt="" />
                        Entrar com o Google
                    </button>
                </div>
            </main>
        </div>
    )
}