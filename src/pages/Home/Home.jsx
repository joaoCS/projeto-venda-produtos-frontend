import React from 'react';
import './home.css';
import { useCookies } from 'react-cookie';

export const Home = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    return (
        <div className="vendas">
            Vendas
            {!cookies.access_token && <h3>Cadastre-se para usar</h3>}
        </div>
    );
}