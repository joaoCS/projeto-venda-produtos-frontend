import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const CadastroEmpresa = () => {

    const [companyData, setCompanyData] = useState({
        razaoSocial: "",
        cnpj: "",
        endereco: "",
        telefone: ""
    });

    const [cookies, setCookies] = useCookies(["access_token"]);

    function handleChange(event) {
        const {name, value} = event.target;

        setCompanyData({...companyData, [name]: value});
    }

    async function submit(event){
        event.preventDefault();
        console.log(companyData);
        try{

            let url = 'http://localhost:3001/empresas/cadastrar';
            
            const response = await axios.post(url, {
                    razaoSocial: companyData.razaoSocial,
                    cnpj: companyData.cnpj,
                    endereco: companyData.endereco,
                    telefone: companyData.telefone
            }, { headers: { authorization: cookies.access_token } });
            
            alert(response.data.message);
        }
        catch(err){
            console.log(err);
        }
    }


    return (
        <div>
            <h2>Cadastrar Empresa</h2>
            <form action="" method='post' onSubmit={submit}>
               <div>
                    <label htmlFor="razaoSocial">Razão Social:</label>
                    <input type="text" id="razaoSocial" name="razaoSocial" onChange={handleChange}/>
               </div> 
                <div>
                    <label htmlFor="cnpj">CNPJ:</label>
                    <input type="text" id="cnpj" name="cnpj" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="endereco">Endereço:</label>
                    <input type="text" id="endereco" name="endereco" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="telefone">Telefone:</label>
                    <input type="text" id="telefone" name="telefone" onChange={handleChange}/>
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}