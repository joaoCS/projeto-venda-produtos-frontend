import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function CadastroCliente() {

    const [clienteData, setClienteData] = useState({
        nome: "",
        cpf: "",
        endereco: "",
        telefone: ""
    });

    const [cookies, setCookies] = useCookies(["access_token"]);

    function handleChange(event){

        const {name, value} = event.target;
        setClienteData({ ...clienteData, [name]: value });
    }

    async function submit(event){
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/clientes/create',
             clienteData, 
             {
                headers: {
                    authorization: cookies.access_token
                }
            });
            console.log(response.data);
            
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div>
            <form action="" onSubmit={submit}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" name="nome" id="nome" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="cpf">CPF:</label>
                    <input type="text" name="cpf" id="cpf" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="endereco">Endereço:</label>
                    <input type="text" name="endereco" id="endereco" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="telefone">Telefone:</label>
                    <input type="text" name="telefone" id="telefone" onChange={handleChange}/>
                </div>
                <button type='submit'>Cadastrar</button>
            </form>
        </div>
    );

};