import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

    const [cookies, setCookies] = useCookies(["access_token"]);
    
    const navigate = useNavigate();

    function logout() {
        setCookies("access_token", "");
        window.localStorage.removeItem("userId");
        navigate("/login");
    }

    return(
        <div className="navbar">
            <Link to="/">Home</Link>&nbsp;
            <Link to="/cadastroAdmin">Cadastrar administrador</Link>&nbsp;
            <Link to="/cadastroCategoria">Criar Categoria</Link>&nbsp;
            <Link to="/cadastroProduto">Cadastrar Produto</Link>&nbsp;
            <Link to="/cadastroEmpresa">Cadastrar Empresa</Link>&nbsp;
            <Link to="/cadastroUser">Cadastrar Cliente</Link>&nbsp;
            <Link to="/venda">Venda</Link>&nbsp;
            
            {!cookies.access_token? <Link to="/login">Login</Link> :
                <a href="" onClick={logout}>Logout</a>
            }
        </div>
    );
}

export default Navbar;