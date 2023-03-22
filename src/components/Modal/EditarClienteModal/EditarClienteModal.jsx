import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './editarClienteModal.css';


export default function EditarClienteModal({ cliente, closeModal }) {

    let [clienteData, setClienteData] = useState(cliente);
    const [cookies, setCookies] = useCookies(["access_token"]);


    useEffect(() => {
        console.log(cliente);
    }, []);

    function handleChange(event) {
        let { name, value } = event.target;

        setClienteData({ ...clienteData, [name]: value });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.put('http://localhost:3001/clientes/edit', clienteData, {
                headers: {
                    authorization: cookies.access_token
                }
            });

            alert(response.data.message);
        }
        catch (err) {
            alert("Erro ao editar informações do cliente!");
        }

        closeModal();
    }

    return (
        <div className="editar">
            <div>
                <h2>Editar Cliente</h2>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" name="nome" id="nome" value={clienteData.nome} onChange={handleChange} />

                    <label htmlFor="endereco">Endereço:</label>
                    <input type="text" name="endereco" id="endereco" value={clienteData.endereco} onChange={handleChange} />

                    <label htmlFor="cpf">CPF:</label>
                    <input type="text" name="cpf" id="cpf" value={clienteData.cpf} onChange={handleChange} />

                    <label htmlFor="telefone">Telefone:</label>
                    <input type="text" name="telefone" id="telefone" value={clienteData.telefone} onChange={handleChange} />

                    <span>
                        <button type="submit">Salvar</button>
                        <button onClick={closeModal}>Fechar</button>
                    </span>
                </form>
            </div>
        </div>
    );
};