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
    const [empresasPopup, setEmpresasPopup] = useState(false);
    const [categoriasPopup, setCategoriasPopup] = useState(false);
    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchData() {


            try {
    
                console.log(cookies.access_token);
                const response = await axios.get('http://localhost:3001/auth/username', {
                        headers: {
                            authorization: cookies.access_token,
                            userId: window.localStorage.getItem("userId")
                        },
                    });
    
                setUsername(response.data.username);
                console.log(response.data);
            }
            catch (err) {
                console.log(err);
            }
        }
    
        fetchData();
    }, []);


    function logout() {
        setCookies("access_token", "");
        window.localStorage.removeItem("userId");
        navigate("/login");
    }

    function toggleEmpresasPopupMenu() {
        setEmpresasPopup(!empresasPopup);
        setAdminPopup(false);
        setClientesPopup(false);
        setProdutosPopup(false);
        setCategoriasPopup(false);

    }
    function toggleAdminPopupMenu() {
        setAdminPopup(!adminPopup);
        setClientesPopup(false);
        setProdutosPopup(false);
        setCategoriasPopup(false);
        setEmpresasPopup(false);

    }

    function toggleProdutosPopupMenu() {
        setAdminPopup(false);
        setClientesPopup(false);
        setProdutosPopup(!produtosPopup);
        setCategoriasPopup(false);
        setEmpresasPopup(false);

    }

    function toggleCategoriasPopupMenu() {
        setAdminPopup(false);
        setClientesPopup(false);
        setProdutosPopup(false);
        setCategoriasPopup(!categoriasPopup);
        setEmpresasPopup(false);

    }

    function toggleClientesPopupMenu() {
        setAdminPopup(false);
        setClientesPopup(!clientesPopup);
        setProdutosPopup(false);
        setCategoriasPopup(false);
        setEmpresasPopup(false);

    }

    function closeAllPopups() {
        setAdminPopup(false);
        setClientesPopup(false);
        setProdutosPopup(false);
        setEmpresasPopup(false);
        setCategoriasPopup(false);
    }
    return (
        <div className="navbar">
            <div className="commonLinks">
                <Link to="/">Home</Link>&nbsp;
                <div className="menu" onMouseEnter={toggleAdminPopupMenu}>
                    Administrador <span>{username}</span>
                    {adminPopup &&
                        <div className="popup" onMouseLeave={closeAllPopups}>
                            <Link to="/administrador">Editar dados do administrador</Link>
                            <Link to="/cadastroAdmin">Cadastrar Administrador</Link>
                        </div>}
                </div>&nbsp;
            </div>
            {!cookies.access_token ? <Link to="/login">Login</Link> :
                <div className="authLinks">
                    <div className="menu" onMouseEnter={toggleCategoriasPopupMenu}>
                        Categorias
                        {categoriasPopup &&
                            <div className="popup" onMouseLeave={closeAllPopups}>
                                <Link to="/categorias">Categorias</Link>
                                <Link to="/cadastroCategoria">Criar Categoria</Link>

                            </div>}
                    </div>&nbsp;
                    <div className="menu" onMouseEnter={toggleProdutosPopupMenu}>
                        Produtos
                        {produtosPopup &&
                            <div className="popup" onMouseLeave={closeAllPopups}>
                                <Link to="/produtos">Produtos</Link>
                                <Link to="/cadastroProduto">Cadastrar Produto</Link>

                            </div>}
                    </div>&nbsp;
                    <div className="menu" onMouseEnter={toggleEmpresasPopupMenu}>
                        Empresas
                        {empresasPopup &&
                            <div className="popup" onMouseLeave={closeAllPopups}>
                                <Link to="/empresas">Empresas</Link>
                                <Link to="/cadastroEmpresa">Cadastrar Empresa</Link>

                            </div>}
                    </div>&nbsp;
                    <div className="menu" onMouseEnter={toggleClientesPopupMenu}>
                        Clientes
                        {clientesPopup &&
                            <div className="popup" onMouseLeave={closeAllPopups}>
                                <Link to="/clientes">Clientes</Link>
                                <Link to="/cadastroCliente">Cadastrar Cliente</Link>

                            </div>}
                    </div>&nbsp;



                    <Link to="/venda">Venda</Link>&nbsp;

                    
                    <a href="" onClick={logout}>Logout</a>
                </div>
            }
        </div>
    );
}

export default Navbar;