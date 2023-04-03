import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './editarClienteModal.css';


export default function EditarClienteModal({ cliente, closeModal }) {

    let [clienteData, setClienteData] = useState(cliente);
    const [cookies, setCookies] = useCookies(["access_token"]);
    
    const validaTelefone = /^(\d{2})\s*(\d)?\s*(\d{4})\-?(\d{4})$/;
    const validaCpf = /^(\d{3})(\d{3})(\d{3})(\d{2})$/; 

    function removeChars(valor) {
        valor = valor.replace(/[a-zA-Z\u\'\"\`\s+\-+\(+\.+\)+,+]/g, "");// substitui tudo o que não for número

        return valor;
    }


    function handleChange(event) {
        let { name, value } = event.target;

        let valor = value;

        if (name === "telefone") {
            valor = removeChars(valor);

            valor = valor.replace(validaTelefone, "($1) $2 $3-$4");
        }

        if (name === "cpf") {
            valor = removeChars(valor);

            valor = valor.replace(validaCpf, "$1.$2.$3-$4");
        }

        setClienteData({ ...clienteData, [name]: valor });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        const cpTelefone = removeChars(clienteData.telefone);
        const cpCpf = removeChars(clienteData.cpf);

        const telefoneValido = cpTelefone.match(validaTelefone);
        const cpfValido = cpCpf.match(validaCpf);

        if(!telefoneValido) {
            alert("Número de telefone inválido!");
            return;
        }
        if(!cpfValido) {
            alert("Número de CPF inválido!");
            return;
        }


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
                    <input type="text" name="cpf" id="cpf" maxLength={14} value={clienteData.cpf} onChange={handleChange} />

                    <label htmlFor="telefone">Telefone:</label>
                    <input type="text" name="telefone" id="telefone" maxLength={16}  value={clienteData.telefone} onChange={handleChange} />

                    <span>
                        <button type="submit">Salvar</button>
                        <button onClick={closeModal}>Fechar</button>
                    </span>
                </form>
            </div>
        </div>
    );
};