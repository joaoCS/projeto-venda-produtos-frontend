import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './cadastroStruct.css';
import { useDispatch } from "react-redux";
import { addUser } from "./Navbar/userSlice";

export const CadastroStruct = (props) => {

    const dispatch = useDispatch();

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
                    
                    console.log(response.data.username);

                    const { username } = response.data;
                    dispatch(addUser(username));

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

                let email = userData.email;

                const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

                if (!emailRegex.test(email)) {
                    alert("Email inválido!");
                    return;
                }
                
                console.log(email.match(emailRegex));
                console.log(email);
                console.log(emailRegex.test(email));
                
                const response = await axios.post(url, userData);
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
                        <button type="submit">{props.useType === "login" ? "Entrar" : "Cadastrar"}</button>
                    </span>
                </form>
            
        </div>
    );
}