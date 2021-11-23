import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

// Databse do Firestore
const db = getFirestore();
const dbCollection = 'cardapios' // Nome da coleção que escolher
const userId = localStorage.getItem('@cardapio-facil/userid');

// Montar componentes do Cardapio
const montarCardapio = (querySnapshot) => {
    querySnapshot.forEach((doc) => {

        // COLOCAR AQUI COMO RETORNAR COMPONENTES DO CARDÁPIO

        console.log(doc.id, " => ", doc.data());
    });
}


// Procurar doc no firestore
export async function procurarDoc() {
    const colecao = doc(db, dbCollection, userId);
    const docSnap = await getDoc(colecao);

    if (docSnap.exists()) {
        // Doc encotrado
        const q = query(collection(db, dbCollection), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        carregarDoc(querySnapshot);
    }
    else {
        // Doc não encontrado
        criarNovoDoc();
    }
}


// Carregar dados do Doc
export async function carregarDoc(querySnapshot) {
    montarCardapio(querySnapshot);
    // console.log(searchName.value)
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