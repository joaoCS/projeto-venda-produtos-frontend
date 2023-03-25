import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const CadastroEmpresa = () => {

    const [companyData, setCompanyData] = useState({
        razaoSocial: "",
        cnpj: "",
        endereco: "",
        telefone: ""
    });

    const [cookies, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();
    
    function handleChange(event) {
        const { name, value } = event.target;

        setCompanyData({ ...companyData, [name]: value });
    }

    async function submit(event) {
        event.preventDefault();
        console.log(companyData);
        try {

            let url = 'http://localhost:3001/empresas/cadastrar';

            const response = await axios.post(url, {
                razaoSocial: companyData.razaoSocial,
                cnpj: companyData.cnpj,
                endereco: companyData.endereco,
                telefone: companyData.telefone
            }, { headers: { authorization: cookies.access_token } });

            alert(response.data.message);
            navigate('/empresas');
        }
        catch (err) {
            alert(err.response.data.message);
        }
    }


    return (
        <div className='cadastro'>
            <h2>Cadastrar Empresa</h2>
            <form action="" method='post' onSubmit={submit}>

                <label htmlFor="razaoSocial">Razão Social:</label>
                <input type="text" id="razaoSocial" name="razaoSocial" onChange={handleChange} />

                <label htmlFor="cnpj">CNPJ:</label>
                <input type="text" id="cnpj" name="cnpj" onChange={handleChange} />

                <label htmlFor="endereco">Endereço:</label>
                <input type="text" id="endereco" name="endereco" onChange={handleChange} />

                <label htmlFor="telefone">Telefone:</label>
                <input type="text" id="telefone" name="telefone" onChange={handleChange} />
                <span>
                    <button type="submit">Cadastrar</button>
                </span>
            </form>
        </div>
    );
}