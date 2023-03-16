import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const CadastroProduto = () => {

    const [categorias, setCategorias] = useState([]);
    
    const [cookies, setCookies] = useCookies(["access_token"]);

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
            
            let url = 'http://localhost:3001/produtos/create';
            
            const response = await axios.post(url, productData, { headers: { authorization: cookies.access_token } });
        }
        catch(err){
            console.log(err);
        }
    }
    
    useEffect(()=>{

        async function fetchCategorias() {
            try {
                const response = await axios.get('http://localhost:3001/categorias/');
                
                console.log(response.data);

                setCategorias(response.data);

            } 
            catch (err) {
                console.log(err);
            }
        }

        fetchCategorias();

    }, []);
    
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
                    <select name="categoria" id="categoria" onChange={handleChange}>
                       <option>Selecionar categoria:</option>
                       {categorias.map((categoria, idx) => {
                            return (
                                <option key={idx} value={categoria._id}>{categoria.nome}</option>
                            );
                       })}
                    </select>
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}