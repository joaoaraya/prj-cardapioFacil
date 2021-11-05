/* Importar dependências */
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Importar páginas */
import { Home } from "./pages/Home";

/*OBS: Nessa versão 6.0 usar Routes no lugar de Swicth,
element no lugar de content,
incluir <Nome /> dentro do element */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;