import { initializeApp } from 'firebase/app';

// Config. do Projeto no Firebase
/* (Aviso para novos projetos/clones): crie uma pasta token e inclua os 
arquivos apiKey.. do firebase nese arquivo.js e exporte como default */
import firebaseConfig from '../token/firebase';

// Iniciar Firebase
const app = initializeApp(firebaseConfig);

export default app;