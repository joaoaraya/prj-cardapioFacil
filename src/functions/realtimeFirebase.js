import app from '../services/firebase';
import { getDatabase, child, ref, set, get } from "firebase/database";

const db = getDatabase(app);
const dataAtual = new Date().toISOString();
let cardapioDados = {};

// Procurar objeto no firebase
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

// Criar objeto no firebase
export const novoCardapio = async (userId) => {
    const dbRef = ref(db, 'users/' + userId);

    const dados = await set(dbRef, {
        createAt: dataAtual,
        cardapio: [{
            categoria: [{
                titulo: 'nome da categoria',
                imgURL: '',
                itens: [{
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