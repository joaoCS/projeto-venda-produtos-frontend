import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';

export default function CadastroCliente() {

    let [clienteData, setClienteData] = useState({
        nome: "",
        cpf: "",
        endereco: "",
        telefone: ""
    });

    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const validaTelefone = /^(\d{2})\s*(\d)?\s*(\d{4})\-?(\d{4})$/;
    const validaCpf = /^(\d{3})(\d{3})(\d{3})(\d{2})$/; 

    function removeChars(valor) {
        valor = valor.replace(/[a-zA-Z\u\'\"\`\s+\-+\(+\.+\)+,+]/g, "");// substitui tudo o que não for número

        return valor;
    }


    function handleChange(event) {

        const { name, value } = event.target;

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
    /* 
     Expressão regular que valida telefone
      return celular.match(/^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])9[0-9]{8}$/);
    
    */
    async function submit(event) {
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
            const response = await api.post('/clientes/create',
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
                <input type="text" name="cpf" maxLength={14} id="cpf" value={clienteData.cpf} onChange={handleChange} />

                <label htmlFor="endereco">Endereço:</label>
                <input type="text" name="endereco" id="endereco" onChange={handleChange} />

                <label htmlFor="telefone">Telefone:</label>
                <input type="text" name="telefone" maxLength={16} id="telefone" value={clienteData.telefone} onChange={handleChange} />

                <span>
                    <button type='submit'>Cadastrar</button>
                </span>
            </form>
        </div>
    );

};