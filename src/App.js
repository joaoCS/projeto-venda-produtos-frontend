import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login/Login';

import { CadastroCategoria } from './pages/CadastroCategoria/CadastroCategoria';
import { CadastroEmpresa } from './pages/CadastroEmpresa/CadastroEmpresa';

import CadastroAdmin from './pages/CadastroAdmin/CadastroAdmin';
import CadastroCliente from './pages/CadastroCliente/CadastroCliente';

import { Home } from './pages/Home/Home';
import { Venda } from './pages/Venda/Venda';
import Navbar from './components/Navbar/Navbar';
import { CadastroProduto } from './pages/CadastroProduto/CadastroProduto';
import Produtos from './pages/Produtos/Produtos';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />}/> 
        <Route path="/cadastroAdmin" element={<CadastroAdmin/>}/>
        <Route path="/cadastroCategoria" element={<CadastroCategoria/>}/>
        <Route path="/cadastroProduto" element={<CadastroProduto/>}/>
        <Route path="/cadastroEmpresa" element={<CadastroEmpresa/>}/>
        <Route path="/cadastroCliente" element={<CadastroCliente/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/venda" element={<Venda/>}/>
        <Route path="/produtos" element={<Produtos/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
