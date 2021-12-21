/* Importar dependencias */
import app from '../services/firebase'
import { signInWithPopup, signOut, GoogleAuthProvider, getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(app);
const google = new GoogleAuthProvider();

// Entrar com Google
export const logInGoogle = async () => {
    const result = await signInWithPopup(auth, google);
    try {
        // Isso dá a você um Token de acesso do Google. 
        // Você pode usá-lo para acessar a API do Google.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // Salvar informações do usuário no local (cookie)
        // (KEY ou nome do APP-SITE '/' dado da variavel)
        const user = result.user;
        localStorage.setItem('@cardapio-facil/username', user.displayName);
        localStorage.setItem('@cardapio-facil/userid', user.uid);

        // setLoginStatus(); // Mostrar se logou

    } catch (error) {
        // Tratar os erros aqui:
        const errorCode = error.code;
        const errorMessage = error.message;
        // E-mail da conta do usuário já usada:
        const email = error.email;
        // O tipo AuthCredential já foi usado:
        const credential = GoogleAuthProvider.credentialFromError(error);
    }
}

// Sair da conta atual
export const logOut = async () => {
    const sair = await signOut(auth);
    try {
        // Desconectado da conta e apagar variaveis locais
        localStorage.removeItem('@cardapio-facil/username');
        localStorage.removeItem('@cardapio-facil/userid');

        //setLoginStatus(); // Mostrar se deslogou
    } catch (error) {
        // ocorreu um erro ao sair
    }
}

/* TESTES
const setLoginStatus = () => onAuthStateChanged(auth, (user) => {
    user != null ? console.log('logado!') : console.log('não loagado!');
})
*/