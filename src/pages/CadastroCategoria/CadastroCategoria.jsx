import React, { useState } from 'react';
import axios from 'axios';

export const CadastroCategoria = () => {

    const [categoriaData, setCategoriaData] = useState({
        nome: ""
    });

    function handleChange(event) {
        const {name, value} = event.target;

        setCategoriaData({...categoriaData, [name]: value});
    }

    async function submit(event){
        event.preventDefault();
        try{

            let url = 'http://localhost:3001/criarCategoria/';
            
            const response = await axios.post(url, {
                nome: categoriaData.nome
            });
            
        }
        catch(err){
            console.log(err);
        }
    }


    return (
        <div>
            <h2>Criar Categoria</h2>
            <form action="" method='post' onSubmit={submit}>
               <div>
                    <label htmlFor="nome">Nome da Categoria:</label>
                    <input type="text" id="nome" name="nome" onChange={handleChange}/>
               </div> 
                
                <button type="submit">Criar</button>
            </form>
        </div>
    );
}