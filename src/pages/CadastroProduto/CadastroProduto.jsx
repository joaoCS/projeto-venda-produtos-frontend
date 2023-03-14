import React, { useState } from 'react';
import axios from 'axios';

export const CadastroProduto = () => {

    const [productData, setProductData] = useState({
        nome: "",
        valorCompra: 0.0,
        valorVenda: 0.0,
        categoria: ""
    });

    function handleChange(event) {
        const {name, value} = event.target;

        if (name=="valorCompra" || name=="valorVenda") 
            setProductData({...productData, [name]: parseFloat(value)});

        else
            setProductData({...productData, [name]: value});
    }

    async function submit(event){
        event.preventDefault();
        try{

            console.log(productData);

            let url = 'http://localhost:3001/cadastrarProduto/';
            
            const response = await axios.post(url, {
                    nome: productData.nome,
                    valorCompra: productData.valorCompra,
                    valorVenda: productData.valorVenda,
                    categoria: productData.categoria
            });
        }
        catch(err){
            console.log(err);


        }
    }


    return (
        <div>
            <h2>Cadastrar Produto</h2>
            <form action="" method='post' onSubmit={submit}>
               <div>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" onChange={handleChange}/>
               </div> 
                <div>
                    <label htmlFor="valorCompra">Valor de Compra:</label>
                    <input type="text" id="valorCompra" name="valorCompra" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="valorVenda">Valor de Venda:</label>
                    <input type="text" id="valorVenda" name="valorVenda" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="categoria">Categoria:</label>
                    <select name="categoria" id="categoria" onChange={handleChange}>Selecionar categoria:</select>
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}