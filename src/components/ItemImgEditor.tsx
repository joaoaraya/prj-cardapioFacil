/* Importar dependencias */
import { useEffect, useState } from 'react';
import { atualizarImagem } from '../functions/realtimeFirebase';

/* importar imagens */
import cameraIcon from '../assets/icons/camera.png';
import refreshIcon from '../assets/icons/refresh.png'

/* Componentes */
import { Modal } from '../components/Modal'

/* importar estilo */
import '../styles/components/itemImgEditor.scss';

type ImgProps = {
    user?: string;
    id?: number;
    imgURL?: string;
}

export function ItemImgEditor({ user, id, imgURL }: ImgProps) {
    // Estados das variaveis
    const [showModal, setModal] = useState(false);
    const [getImgURL, setImgURL] = useState(imgURL);
    const [tag, setTag] = useState('');
    const [btnSaveTxt, setBtnSaveTxt] = useState('Salvar');

    // Funções
    const salvar = async () => {
        setBtnSaveTxt('Salvando...');

        const resposta: any = await atualizarImagem(user, id, getImgURL);
        try {
            resposta == 'sucess' ? setBtnSaveTxt('Salvo!') : setBtnSaveTxt('Não salvo!');
        }
        catch (e) {
            setBtnSaveTxt('Não salvo!');
            console.error(e);
        }
    }
    const setDefault = () => {
        setTag('');
        setImgURL(imgURL);
        setBtnSaveTxt('Salvar');
    }
    const fechar = () => {
        // Fechar modal e redefinir variaveis
        setModal(false);
        setDefault();
    }
    const buscar = async () => {
        const url = `https://source.unsplash.com/480x480/?${tag}`;

        const options = {
            method: 'GET', // metodo de acesso (get,post,put..)
            mode: 'cors' as RequestMode, // pedir para entrar na porta (origem/servidor diferente)
            cache: 'default' as RequestCache // o dado so é atualizado se for difente do salvo
        }

        const res = await fetch(url, options)
        try {
            setImgURL(res.url);
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <div className="itemImgEditor" style={{ backgroundImage: `url("${imgURL}")` }}>
                <button onClick={() => setModal(true)} title="Editar imagem">
                    <img src={cameraIcon} alt="" />
                </button>
            </div>

            {showModal ?
                <Modal>
                    <input type="search" placeholder="Procure imagens por tags" value={tag} onInput={txt => setTag((txt.target as HTMLTextAreaElement).value)} />
                    <button type='button' onClick={buscar} className="btnSearch">
                        <img src={refreshIcon} alt="" />
                    </button>
                    <span>
                        <h1 className='tag'>{tag}</h1>
                        <img src={getImgURL} alt="" />
                    </span>
                    <button type='button' onClick={salvar} className="btnSave">{btnSaveTxt}</button>
                    <button type='button' onClick={fechar} className="btnClose">Voltar</button>
                </Modal> : null
            }
        </>
    )
}