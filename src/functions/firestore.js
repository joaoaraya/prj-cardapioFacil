import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

// Databse do Firestore
const db = getFirestore();
const dbCollection = 'cardapios' // Nome da coleção que escolher
const userId = localStorage.getItem('@cardapio-facil/userid');
let cardapioDados = {};

// Procurar doc no firestore
export async function procurarDoc() {
    const colecao = doc(db, dbCollection, userId);
    const docSnap = await getDoc(colecao);

    if (docSnap.exists()) {
        // Doc encotrado
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
    else {
        // Doc não encontrado
        criarNovoDoc();
    }
}

// Criar novo Doc
export async function criarNovoDoc() {
    // Qual database e grupo?
    const colecao = doc(db, dbCollection, userId);
    // Dados que deseja incluir
    const dados = await setDoc(colecao, {
        createId: Date.now(),
        userId: userId,
        cardapio: [{
            categoria: [{
                titulo: 'categoria',
                imgURL: '',
                itens: [
                    { titulo: '', desc: '', valor: '' }, { titulo: '', desc: '', valor: '' }
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