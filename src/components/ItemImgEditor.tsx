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
    const [tags, setTags] = useState([] as Array<string>);
    const [btnSaveOff, setBtnSaveOff] = useState(true);
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
        setTags([]);
        setImgURL(imgURL);
        setBtnSaveOff(true);
        setBtnSaveTxt('Salvar');
    }
    const fechar = () => {
        // Fechar modal e redefinir variaveis
        setModal(false);
        setDefault();
    }
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            buscar();
        }
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
            // Separar tags após a virgula e incluir dentro de um array
            const separar = tag.split(",");
            setTags(separar);
            // Liberar botão salvar
            setBtnSaveOff(false);
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
                <div className="itemImgEditorModal">
                    <Modal>
                        <input type="search" placeholder="Procure imagens por tags" value={tag} onInput={txt => setTag((txt.target as HTMLTextAreaElement).value)} onKeyDown={handleKeyDown} />

                        <div className='txtTag'>
                            {tags.map(arrayContent => <h1>{arrayContent}</h1>)}
                        </div>

                        <div className='imgTag' style={{ backgroundImage: `url("${getImgURL}")` }} />
                        <button type='button' onClick={buscar} className="btnSearch" title="Imagem aleatória">
                            <img src={refreshIcon} alt="" />
                        </button>

                        <button type='button' onClick={salvar} className="btnSave" disabled={btnSaveOff}>{btnSaveTxt}</button>
                        <button type='button' onClick={fechar} className="btnClose">Voltar</button>
                    </Modal>
                </div> : null
            }
        </>
    )
}