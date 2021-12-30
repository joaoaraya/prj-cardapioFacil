/* imagens */
import logoLargeImg from '../assets/images/logo.svg'
import logoSmallImg from '../assets/images/logo-small.svg'

/* style */
import '../styles/components/logoEditor.scss'

export function LogoEditor() {
    return (
        <div className='logoEditor'>
            <img id="large" src={logoLargeImg} alt="Logo" title="Cardápio Fácil" />
            <img id="small" src={logoSmallImg} alt="Logo" title="Cardápio Fácil" />
        </div>
    )
}