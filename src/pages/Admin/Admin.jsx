import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


export default function Admin() {
    
    const [cookies, setCookies] = useCookies(["access_token"]);
    let [userData, setUserData] = useState({});
    const navigate = useNavigate();
    
    async function buscaAdmin() {
        try {
            const userId = window.localStorage.getItem("userId");
            const response = await axios.get('http://localhost:3001/auth/user/' + userId, {
                headers: {
                    authorization: cookies.access_token
                }
            });

            setUserData(response.data);

        }
        catch (err) {
            alert("Erro ao buscar dados do usuário!");
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.put('http://localhost:3001/auth/edit', userData, {
                headers: {
                    authorization: cookies.access_token
                }
            });

            alert(response.data.message);
            navigate("/home");
        }
        catch (err) {
            alert("Erro ao atualizar cadastro!");
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        
        setUserData({...userData, [name]: value});
    }

    useEffect(() => {

        buscaAdmin();
    }, []);

    function gotoHome () {
        navigate("/home");
    }

    return (
        <div className="editar">
            <div>
                <h2>Alterar dados do usuário</h2>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="username">Nome de usuário:</label>
                    <input type="text" name="username" id="username" value={userData.username} onChange={handleChange}/>

                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" value={userData.email} onChange={handleChange}/>

                    <span>
                        <button type="submit">Alterar</button>
                        <button onClick={gotoHome}>Home</button>
                    </span>
                </form>
            </div>
        </div>
    );
};