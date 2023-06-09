import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';

import './editarProdutoModal.css';
import api from "../../../config/api";

export default function EditarProdutoModal({ closeModal, produto }) {

    const [categorias, setCategorias] = useState([]);

    const [cookies, setCookies] = useCookies(["access_token"]);

    const [productData, setProductData] = useState({
        _id: "",
        nome: "",
        valorCompra: 0.0,
        valorVenda: 0.0,
        categoria: ""
    });

    async function handleSubmit(event) {
        event.preventDefault();

        console.log(productData);

        if (!productData.categoria) {
            alert("Selecione uma categoria!");
            return;
        }
        try{ 
            const response = await api.put("/produtos/edit", productData, {
                headers: {
                    authorization: cookies.access_token
                }
            });

            alert(response.data.message);
            closeModal();
        }
        catch (err) {
            alert(err.response.data.message);
        }
    }

    function removeChars(valor) {
        valor = valor.replace(/[a-zA-Z\'\"\`\s+\-+\(+\)+]/g, "");// substitui tudo o que não for número
        valor = valor.replace(/\,/g, ".");// onde tiver uma vírgula coloca um ponto
        
        return valor;
    }

    function handleChange(event) {
        let { name, value } = event.target;

        if (name == "valorCompra" || name == "valorVenda") {
            
            value = removeChars(value);
            
            setProductData({ ...productData, [name]: parseFloat(value) });
        
        }
        setProductData({ ...productData, [name]: value });
    }

    useEffect(() => {
        async function fetchCategorias() {
            try {
                const response = await api.get('/categorias/');

                setCategorias(response.data);

            }
            catch (err) {
                console.log(err);
            }
        }

        fetchCategorias();

        setProductData({
            _id: produto._id,
            nome: produto.nome,
            valorCompra: produto.valorCompra,
            valorVenda: produto.valorVenda,
        });

    }, []);


    return (
        <div className="editModal">
            <div>
                <h3>Editar Produto</h3>

                <form action="" method="post" onSubmit={handleSubmit}>
                    <input type="hidden" name="_id" id="_id" onChange={handleChange} defaultValue={produto._id} />

                    <label htmlFor="nome">Nome:</label>
                    <input type="text" name="nome" id="nome" onChange={handleChange} defaultValue={produto.nome} />

                    <label htmlFor="valorCompra">Valor de Compra:</label>
                    <input type="text" id="valorCompra" name="valorCompra" onChange={handleChange} defaultValue={produto.valorCompra} />

                    <label htmlFor="valorVenda">Valor de venda:</label>
                    <input type="text" name="valorVenda" id="valorVenda" onChange={handleChange} defaultValue={produto.valorVenda} />
                    <br />
                    <label htmlFor="categoria">Categoria:</label>
                    <select name="categoria" id="categoria" onChange={handleChange} defaultValue={produto.categoria._id}>
                        <option>Selecionar categoria:</option>
                        {categorias.map((categoria) => {
                            return <option key={categoria._id} value={categoria._id}>{categoria.nome}</option>
                        })}
                    </select>
                    <span>
                        <button type="submit">Alterar</button>
                        <button onClick={closeModal}>Fechar</button>
                    </span>
                </form>



            </div>
        </div>
    );
};