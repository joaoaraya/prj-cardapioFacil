import app from '../services/firebase';
import { getDatabase, child, ref, set, get, update } from "firebase/database";

const db = getDatabase(app);
const dataAtual = new Date().toISOString();
let cardapioDados = {};

/* ------------------- CARDÁPIOS ------------------- */

// Procurar objeto (cardapio) no firebase
export const procurarCardapio = async (getUserId, getEditor = false) => {
    const userId = getUserId; //UUID do user será o titulo do documento
    const editor = getEditor; //Editor = true -> é o autor / Editor = false -> É quem está visitando o cardápio pelo link
    const dbRef = ref(db);
    const docSnap = await get(child(dbRef, `users/${userId}`));

    // Objeto (cardápio) encontrado
    if (docSnap.exists()) {

        cardapioDados = docSnap.val();

        try {
            return cardapioDados;
        } catch (e) {
            return e;
        }
    }
    // Objeto (cardápio) não encontrado
    else {
        if (editor) {
            novoCardapio(userId);
        } else {
            return 404;
        }
    }
}

// Criar objeto (cardapio) no firebase
export const novoCardapio = async (userId) => {
    const dbRef = ref(db, 'users/' + userId);

    const dados = await set(dbRef, {
        createAt: dataAtual,
        cardapio: [{
            categoria: [{
                show: true,
                titulo: 'nome da categoria',
                imgURL: '',
                itens: [{
                    show: true,
                    titulo: 'produto de exemplo',
                    desc: 'descrição, detalhes ou ingredientes',
                    valor: '0,00'
                }]
            }]
        }]
    });

    try {
        // Dados enviado com sucesso
        const inserirDados = dados;
        console.log("ID do objeto adicionado: ", inserirDados.id);

    } catch (e) {
        // Erro ao enviar os dados
        console.error("Erro ao adicionar objeto: ", e);

    }
}

/* ------------------- CATEGORIAS ------------------- */

// Procurar e Criar categoria (no cardapio) no firebase
export const criarCategoria = async (userId, getTitulo) => {
    const dbRef = ref(db);
    const docSnap = await get(child(dbRef, `users/${userId}/cardapio/0/`));

    // Objeto (cardápio) encontrado
    if (docSnap.exists()) {

        const result = docSnap.val();

        try {
            const categoriaId = result.categoria.length; // conta quantos arrays existem (e atribui o valor parao atual (ex: de 0-3 são 4 valores))
            const newCategoria = {
                show: true,
                titulo: getTitulo,
                imgURL: '',
                itens: [{
                    show: true,
                    titulo: 'produto de exemplo',
                    desc: 'descrição, detalhes ou ingredientes',
                    valor: '0,00'
                }]
            }
            const create = {};

            create[`users/${userId}/cardapio/0/categoria/${categoriaId}`] = newCategoria;
            update(dbRef, create);

            return 'sucess';

        } catch (e) {
            console.error("Erro ao adicionar: ", e);
            return 'error';
        }
    }
    else {
        console.error("Objeto (cardápio) não encontrado");
        return 'error';
    }
}

// Atualizar categoria (no cardapio) no firebase
export const atualizarCategoria = async (userId, categoriaId, getTitulo) => {

    const caminho = ref(db, `users/${userId}/cardapio/0/categoria/${categoriaId}`);
    const dados = { titulo: getTitulo }; // Dado que será atualizado

    await update(caminho, dados);
    try {
        return 'sucess';
    }
    catch (e) {
        console.error("Erro ao atualizar: ", e);
        return 'error';
    }
}

// Exluir categoria (no cardapio) no firebase
export const excluirCategoria = async (userId, categoriaId) => {

    const caminho = ref(db, `users/${userId}/cardapio/0/categoria/${categoriaId}`);
    const dados = { show: false }; // Desabilitar

    await update(caminho, dados);
    try {
        return 'sucess';
    }
    catch (e) {
        console.error("Erro ao desabilitar: ", e);
        return 'error';
    }
}

/* ------------------- ITENS ------------------- */

// Procurar e Criar item (na categoria) no firebase
export const criarItem = async (userId, categoriaId, getTitulo, getDesc, getValor) => {
    const dbRef = ref(db);
    const docSnap = await get(child(dbRef, `users/${userId}/cardapio/0/categoria/${categoriaId}`));

    // Objeto (cardápio) encontrado
    if (docSnap.exists()) {

        const result = docSnap.val();
        try {
            const itemId = result.itens.length; // conta quantos arrays existem (e atribui o valor parao atual (ex: de 0-3 são 4 valores))
            const newItem = { show: true, titulo: getTitulo, desc: getDesc, valor: getValor };
            const create = {};

            create[`users/${userId}/cardapio/0/categoria/${categoriaId}/itens/${itemId}`] = newItem;
            update(dbRef, create);

            return 'sucess';
        }
        catch (e) {
            console.error("Erro ao adicionar item: ", e);
            return 'error';
        }
    }
    else {
        console.error("Objeto (cardápio) não encontrado");
        return 'error';
    }
}

// Atualizar item (na categoria) no firebase
export const atualizarItem = async (userId, categoriaId, itemId, getTitulo, getDesc, getValor) => {

    const caminho = ref(db, `users/${userId}/cardapio/0/categoria/${categoriaId}/itens/${itemId}`); // Local que será atualizado
    const dados = { titulo: getTitulo, desc: getDesc, valor: getValor }; // Dados que serão atualizado

    await update(caminho, dados);
    try {
        return 'sucess';
    }
    catch (e) {
        console.error("Erro ao atualizar: ", e);
        return 'error';
    }
}

// Exluir item (na categoria) no firebase
export const excluirItem = async (userId, categoriaId, itemId) => {

    const caminho = ref(db, `users/${userId}/cardapio/0/categoria/${categoriaId}/itens/${itemId}`);
    const dados = { show: false }; // Desabilitar

    await update(caminho, dados);
    try {
        return 'sucess';
    }
    catch (e) {
        console.error("Erro ao desabilitar: ", e);
        return 'error';
    }
}