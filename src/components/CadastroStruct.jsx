import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './cadastroStruct.css';

export const CadastroStruct = (props) => {

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const [__, setCookies] = useCookies(["access_token"]);

    function handleChange(event) {
        const { name, value } = event.target;

        setUserData({ ...userData, [name]: value });
    }

    async function submit(event) {
        event.preventDefault();
        try {

            let url = 'http://localhost:3001/auth/';
            if (props.useType === "login") {
                url = url + "login";

                try {
                    const response = await axios.post(url, {
                        email: userData.email,
                        password: userData.password
                    });

                    setCookies("access_token", response.data.token);
                    window.localStorage.setItem("userId", response.data.userId);
                    navigate("/");
                }
                catch (err) {
                    alert("Erro ao fazer login!", err);
                }
            }
            else if (props.useType === "createUser")
                url = url + "createUser";
            else {
                url = url + "createAdmin";

                const response = await axios.post(url, {
                    username: userData.username,
                    email: userData.email,
                    password: userData.password
                });
                console.log(response.data);
                if (response.status === 403) {
                    alert("Usuário já existe!");
                    return;
                }

                alert("Administrador criado com sucesso! Faça login!");
                navigate("/");
            }

        }
        catch (err) {
            console.log(err);
            alert("Erro ao criar administrador!");
        }
    }


    return (
        <div className='cadastroStruct'>
            
                <h2>{props.useType === "login" && "Login"}</h2>
                <h2>{props.useType === "createUser" && "Cadastrar Cliente"}</h2>
                <h2>{props.useType === "createAdmin" && "Cadastrar Administrador"}</h2>

                <form action="" method='post' onSubmit={submit}>
                    {props.useType !== "login" && <>
                        <label htmlFor="username">Nome de usuário:</label>
                        <input type="text" id="username" name="username" onChange={handleChange} />
                    </>}
                    
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" onChange={handleChange} />
                    
                    
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" name="password" onChange={handleChange} />
                    <span>
                        <button type="submit">Entrar</button>
                    </span>
                </form>
            
        </div>
    );
}