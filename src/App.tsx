/* Importar dependências */
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Importar páginas */
import { Home } from "./pages/Home";
import { Editor } from "./pages/Editor";
import { Menu } from "./pages/Menu"

/* OBS1: Nessa versão 6.0 usar Routes no lugar de Swicth, element no lugar de content, incluir <Nome /> dentro do element = {...}
OBS 2: ao usar :id vc pode usar qualquer coisa escrita após '/menu/....' */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu/edit' element={<Editor />} />
        <Route path='/menu/:id' element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;