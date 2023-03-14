import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Venda = () => {
    
    const [ produtos, setProdutos ] = useState([]);
   
    async function buscaProdutos(nome) {
        try{
            
            const response = await axios.get('http://localhost:3000/buscaProdutos', { nome });
            
            setProdutos(response.data);
            console.log(produtos);

        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(()=>{

        buscaProdutos("");

    }, []);

    return (
        <div>
            <ul>
                {produtos.map((produto, idx)=>{
                    return (<li key={idx}>
                                <strong>Nome:</strong>
                                <span>{produto.nome}</span>
                                <strong>Preço:</strong>
                                <span>{produto.valorVenda}</span>
                                <strong>Categoria:</strong>
                                <span>{produto.categoria}</span>   
                            </li>);
                })}
            </ul>
        </div>
    );
}