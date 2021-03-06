/* Importar dependências */
import React from 'react';
import ReactDOM from 'react-dom';

/* Banco de dados */
import './services/firebase';

/* Importar páginas */
import App from './App';

/* Importar estilo geral */
import './styles/global.scss';

/* Rendezir rotas no Index */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);