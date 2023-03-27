import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


export const CadastroCategoria = () => {

    const [categoriaData, setCategoriaData] = useState({
        nome: ""
    });

    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;

        setCategoriaData({ ...categoriaData, [name]: value });
    }

    async function submit(event) {
        event.preventDefault();
        try {

            let url = 'http://localhost:3001/categorias/create';

            const response = await axios.post(url, categoriaData, {
                headers: {
                    authorization: cookies.access_token
                }
            });

            alert(response.data.message);
            navigate("/categorias");
        }
        catch (err) {
            alert(err.response.data.message);
        }
    }

    return (
        <div className="cadastro">
            <h2>Criar Categoria</h2>
            <form action="" method='post' onSubmit={submit}>
                <label htmlFor="nome">Nome da Categoria:</label>
                <input type="text" id="nome" name="nome" onChange={handleChange} />

                <span>
                    <button type="submit">Criar</button>
                </span>
            </form>
        </div>
    );
}