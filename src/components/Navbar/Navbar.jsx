import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Popup from "../Popup/Popup";
import './navbar.css';

const Navbar = () => {

    const [cookies, setCookies] = useCookies(["access_token"]);
    const [produtosPopup, setProdutosPopup] = useState(false);
    const [clientesPopup, setClientesPopup] = useState(false);
    const [adminPopup, setAdminPopup] = useState(false);


    const navigate = useNavigate();
    let username = "";
    

    useEffect(()=>{
        async function fetchData(){
            const response = await axios.get('http://localhost:3001/auth/username', {
            userId: window.localStorage.getItem("userId")
            }, 
            {
                headers: {
                    authorization: cookies.access_token
                }
            });

            username = response.data.username;
        }

        fetchData();
    }, [cookies.access_token]);

    function logout() {
        setCookies("access_token", "");
        window.localStorage.removeItem("userId");
        navigate("/login");
    }

    function toggleAdminPopupMenu() {
        setAdminPopup(!adminPopup);
        setClientesPopup(false);
        setProdutosPopup(false);
    }
    
    function toggleProdutosPopupMenu() {
        setAdminPopup(false);
        setClientesPopup(false);
        setProdutosPopup(!produtosPopup);
    }
    
    function toggleClientesPopupMenu() {
        setAdminPopup(false);
        setClientesPopup(!clientesPopup);
        setProdutosPopup(false);
    }

    function closeAllPopups() {
        setAdminPopup(false);
        setClientesPopup(false);
        setProdutosPopup(false);
    }
    return(
        <div className="navbar">
                <div className="commonLinks">
                    <Link to="/">Home</Link>&nbsp;
                     <div className="menu"   onMouseEnter={toggleAdminPopupMenu}>
                         Administradores
                        {adminPopup && 
                        <div className="popup" onMouseLeave={closeAllPopups}>
                             <Link to="/cadastroAdmin">Administradores</Link>
                             <Link to="/cadastroAdmin">Cadastrar Administrador</Link>
                        </div>}
                    </div>&nbsp;
                </div>
            {!cookies.access_token? <Link to="/login">Login</Link> :
                <div className="authLinks">
                    <Link to="/cadastroCategoria">Criar Categoria</Link>&nbsp;
                    <div className="menu"   onMouseEnter={toggleProdutosPopupMenu}>
                         Produtos
                        {produtosPopup && 
                        <div className="popup" onMouseLeave={closeAllPopups}>
                            <Link to="/produtos">Produtos</Link>
                            <Link to="/cadastroProduto">Cadastrar Produto</Link>

                        </div>}
                    </div>&nbsp;
                    <div className="menu"   onMouseEnter={toggleClientesPopupMenu}>
                         Clientes
                        {clientesPopup && 
                        <div className="popup" onMouseLeave={closeAllPopups}>
                             <Link to="/cadastroCliente">Clientes</Link>
                             <Link to="/cadastroCliente">Cadastrar Cliente</Link>

                        </div>}
                    </div>&nbsp;
                   
                  
                   
                    <Link to="/venda">Venda</Link>&nbsp;
                    
                    <span>{username}</span>
                    <a href="" onClick={logout}>Logout</a>
                </div>
            }
        </div>
    );
}

export default Navbar;