import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const CadastroProduto = () => {

    const [categorias, setCategorias] = useState([]);

    const [cookies, setCookies] = useCookies(["access_token"]);

    let [productData, setProductData] = useState({
        nome: "",
        valorCompra: 0.0,
        valorVenda: 0.0,
        categoria: ""
    });

    const navigate = useNavigate();


    async function fetchCategorias() {
        try {
            const response = await axios.get('http://localhost:3001/categorias/');

            setCategorias(response.data);

        }
        catch (err) {
            console.log(err);
        }
    }

    function removeChars(valor) {
        valor = valor.replace(/[a-zA-Z\'\"\`\s+\-+\(+\)+]/g, "");// substitui tudo o que não for número
        valor = valor.replace(/\,/g, ".");// onde tiver uma vírgula coloca um ponto
        
        return valor;
    }

    function handleChange(event) {
        let { name, value } = event.target;

        if (name === "valorCompra" || name === "valorVenda"){
            
            value = removeChars(value);

            console.log(value);
            
            setProductData({ ...productData, [name]: parseFloat(value) });
        }
        else
            setProductData({ ...productData, [name]: value });
    }

    async function submit(event) {
        event.preventDefault();

        try {

            let url = 'http://localhost:3001/produtos/create';

            const response = await axios.post(url, productData, { headers: { authorization: cookies.access_token } });
            alert(response.data.message);

            if(window.confirm("Cadastrar novo produto?")) {
                setProductData({
                    nome: "",
                    valorCompra: 0.0,
                    valorVenda: 0.0,
                    categoria: ""
                });

                setCategorias([]);

                fetchCategorias();
                document.getElementById("cadastroForm").reset();
            }
            else
                navigate("/produtos");
               
        }
        catch (err) {
            alert(err.response.data.message);

        }
    }

    useEffect(() => {

        
        fetchCategorias();

    }, []);

    return (
        <div className='cadastro'>
            <h2>Cadastrar Produto</h2>
            <form action="" method='post' onSubmit={submit} id="cadastroForm">

                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" name="nome" onChange={handleChange} />


                <label htmlFor="valorCompra">Valor de Compra:</label>
                <input type="text" id="valorCompra" name="valorCompra"  onChange={handleChange} />


                <label htmlFor="valorVenda">Valor de Venda:</label>
                <input type="text" id="valorVenda" name="valorVenda" onChange={handleChange} />


                <label htmlFor="categoria">Categoria:</label>
                <select name="categoria" id="categoria" onChange={handleChange}>
                    <option>Selecionar categoria:</option>
                    {categorias.map((categoria, idx) => {
                        return (
                            <option key={idx} value={categoria._id}>{categoria.nome}</option>
                        );
                    })}
                </select>
                <span>
                    <button type="submit">Cadastrar</button>
                </span>
            </form>
        </div>
    );
}