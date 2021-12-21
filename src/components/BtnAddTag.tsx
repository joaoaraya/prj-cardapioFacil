/* Importar dependencias */
import { useEffect, useState } from 'react';
import { criarCategoria } from '../functions/realtimeFirebase';

/* Estilo da página */
import '../styles/components/btnAddTag.scss'

/* Imagens */
import addIcon from '../assets/icons/add.png'

/* Componentes */
import { Modal } from '../components/Modal'

type ItemProps = {
    user?: string;
    categoriaId?: number;
    titulo?: string;
}

export function BtnAddTag({ user }: ItemProps) {
    // Estados das variaveis
    const [showModal, setModal] = useState(false);
    const [getTitulo, setTitulo] = useState('');
    const [btnSaveOff, setBtnSaveOff] = useState(true);
    const [btnSaveTxt, setBtnSaveTxt] = useState('Salvar');

    // Checar se as inputs estão vazias (caso não, liberar o botão salvar)
    useEffect(() => {
        if (getTitulo != '') {
            setBtnSaveOff(false);
        } else {
            setBtnSaveOff(true);
        }
    });

    // Funções
    const salvar = async () => {
        setBtnSaveTxt('Salvando...');

        const resposta: any = await criarCategoria(user, getTitulo);
        try {
            if (resposta == 'sucess') {
                setBtnSaveTxt('Salvo!');
                setBtnSaveOff(false);
                fechar();
            } else {
                setBtnSaveTxt('Não salvo!');
            }
        }
        catch (e) {
            setBtnSaveTxt('Não salvo!');
            console.error(e);
        }
    }
    const setDefault = () => {
        setTitulo('');
        setBtnSaveTxt('Salvar');
    }
    const fechar = () => {
        setModal(false);
        setDefault();
    }

    // Virtual DOM
    return (
        <div className="btnAddTag">
            <br />
            <button onClick={() => setModal(true)}>
                <img src={addIcon} alt="" />
                NOVA CATEGORIA
            </button>
            <br />
            {showModal ?
                <Modal>
                    <input type="text" placeholder="Categoria" value={getTitulo} onInput={txt => setTitulo((txt.target as HTMLTextAreaElement).value)} />
                    <button type='button' onClick={salvar} className="btnSave" disabled={btnSaveOff}>{btnSaveTxt}</button>
                    <button type='button' onClick={fechar} className="btnClose">Voltar</button>
                </Modal> : null
            }
        </div>
    )
}