import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function CadastroCliente() {

    const [clienteData, setClienteData] = useState({
        nome: "",
        cpf: "",
        endereco: "",
        telefone: ""
    });

    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();


    function handleChange(event) {

        const { name, value } = event.target;
        setClienteData({ ...clienteData, [name]: value });
    }

    async function submit(event) {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/clientes/create',
                clienteData,
                {
                    headers: {
                        authorization: cookies.access_token
                    }
                });
            alert(response.data.message);
            navigate('/clientes');
            
        } catch (err) {
            alert("Erro ao cadastrar cliente!");
        }

    }

    return (
        <div className='cadastro'>
            <h2>Cadastrar Cliente</h2>
            <form action="" onSubmit={submit}>
                <label htmlFor="nome">Nome:</label>
                <input type="text" name="nome" id="nome" onChange={handleChange} />

                <label htmlFor="cpf">CPF:</label>
                <input type="text" name="cpf" id="cpf" onChange={handleChange} />

                <label htmlFor="endereco">Endereço:</label>
                <input type="text" name="endereco" id="endereco" onChange={handleChange} />

                <label htmlFor="telefone">Telefone:</label>
                <input type="text" name="telefone" id="telefone" onChange={handleChange} />

                <span>
                    <button type='submit'>Cadastrar</button>
                </span>
            </form>
        </div>
    );

};