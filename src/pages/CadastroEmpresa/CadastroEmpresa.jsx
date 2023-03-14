import React, { useState } from 'react';
import axios from 'axios';

export const CadastroEmpresa = () => {

    const [companyData, setCompanyData] = useState({
        razaoSocial: "",
        cnpj: "",
        endereco: "",
        telefone: ""
    });

    function handleChange(event) {
        const {name, value} = event.target;

        setCompanyData({...companyData, [name]: value});
    }

    async function submit(event){
        event.preventDefault();
        try{

            let url = 'http://localhost:3001/cadastrarEmpresa/';
            
            const response = await axios.post(url, {
                    razaoSocial: companyData.razaoSocial,
                    cnpj: companyData.cnpj,
                    endereco: companyData.endereco,
                    telefone: companyData.telefone
            });
            
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
                    <label htmlFor="razao">Razão Social:</label>
                    <input type="text" id="razao" name="razao" onChange={handleChange}/>
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