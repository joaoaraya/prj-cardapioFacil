import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

// Databse do Firestore
const db = getFirestore();
const dbCollection = 'cardapios' // Nome da coleção que escolher
//const userId = localStorage.getItem('@cardapio-facil/userid');
let cardapioDados = {};

// Procurar doc no firestore
export const procurarCardapio = async (getUserId, getEditor = false) => {
    const userId = getUserId; //UUID do user será o titulo do documento
    const editor = getEditor; //Editor = true -> é o autor / Editor = false -> É quem está visitando o cardápio pelo link
    const colecao = doc(db, dbCollection, userId);
    const docSnap = await getDoc(colecao);

    // Doc (cardápio) encontrado
    if (docSnap.exists()) {

        const q = query(collection(db, dbCollection), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            cardapioDados = doc.data()
        });

        try {
            return cardapioDados;
        } catch (e) {
            return e;
        }
    }
    // Doc (cardápio) não encontrado
    else {
        if (editor) {
            novoCardapio(userId);
        } else {
            return 404;
        }
    }
}

// Criar novo Doc
const novoCardapio = async (userId) => {
    // Qual database e grupo?
    const colecao = doc(db, dbCollection, userId);
    // Dados que deseja incluir
    const dados = await setDoc(colecao, {
        createId: Date.now(),
        userId: userId,
        cardapio: [{
            categoria: [{
                titulo: 'nome da categoria',
                imgURL: '',
                itens: [
                    { titulo: 'produto de exemplo', desc: 'descrição, detalhes ou ingredientes', valor: '0,00' }
                ]
            }]
        }]
    });

    try {
        // Dados enviado com sucesso
        const inserirDados = dados;
        console.log("ID do doc adicionado: ", inserirDados.id);

    } catch (e) {
        // Erro ao enviar os dados
        console.error("Erro ao adicionar doc: ", e);

    }
}