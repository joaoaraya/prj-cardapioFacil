/* Importar dependencias */
import app from '../services/firebase'
import { signInWithPopup, signOut, GoogleAuthProvider, getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// LogIn (Google)
export function logInGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // Isso dá a você um Token de acesso do Google. 
            // Você pode usá-lo para acessar a API do Google.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            // Salvar informações do usuário no local (cookie)
            // (KEY ou nome do APP-SITE '/' dado da variavel)
            localStorage.setItem('@cardapio-facil/username', result.user.displayName);
            localStorage.setItem('@cardapio-facil/userid', result.user.uid);

            // setLoginStatus(); // Mostrar se logou
            // console.log(result.user); // Mostrar informações do usuário
        }).catch((error) => {
            // Tratar os erros aqui:
            const errorCode = error.code;
            const errorMessage = error.message;
            // E-mail da conta do usuário já usada:
            const email = error.email;
            // O tipo AuthCredential já foi usado:
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
}

// LogOut (Google)
export function logOutGoogle() {
    signOut(auth).then(() => {
        // Desconectado da sua conta

        localStorage.removeItem('@cardapio-facil/username'); // Apagar essa variavel local

        //setLoginStatus(); // Mostrar se deslogou
    }).catch((error) => {
        // ocorreu um erro ao sair
    });
}

/* TESTES
// Informar se está logado
const setLoginStatus = () => onAuthStateChanged(auth, (user) => {
    user != null ? console.log('logado!') : console.log('não loagado!');
})
 */