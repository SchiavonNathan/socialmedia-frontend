import Login from './Login';
import Cadastro from './Cadastro';
import Home from './Home'; // Importe o componente Home
import Postagem from './Postagem';
import 'bootstrap/dist/css/bootstrap.min.css';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} /> {/* Adicionando a rota para Home */}
        <Route path="/postagem/:id" element={<Postagem />} />
      </Routes>
    </Router>
  );
}

export default App;
