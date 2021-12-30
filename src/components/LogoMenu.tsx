/* imagens */
import ornamentoLeftImg from '../assets/images/ornamento-left.svg'
import ornamentoRightImg from '../assets/images/ornamento-right.svg'
import logoImg from '../assets/images/logo.svg'

/* style */
import '../styles/components/logoMenu.scss'

export function LogoMenu() {
    return (
        <div className='logoMenu'>
            <img id="ol" src={ornamentoLeftImg} alt="" />
            <img id="logo" src={logoImg} alt="Cardápio Fácil" />
            <img id="or" src={ornamentoRightImg} alt="" />
        </div>
    )
}