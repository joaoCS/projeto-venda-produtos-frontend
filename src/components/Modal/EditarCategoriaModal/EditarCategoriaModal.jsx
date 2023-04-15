import React, { useState } from 'react';

import axios from 'axios';
import { useCookies } from 'react-cookie';

import api from '../../../config/api';

export default function EditarCategoriaModal({ categoria, closeModal }) {

    let [categoriaData, setCategoriaData] = useState(categoria);
    const [cookies, setCookies] = useCookies(["access_token"]);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await api.put('/categorias/edit', categoriaData, {
                headers: {
                    authorization: cookies.access_token
                }
            });

            alert(response.data.message);
        }
        catch (err) {
            alert("Erro ao editar categoria!");
        }

        closeModal();
    }

    function handleChange(event) {

        let { name, value } = event.target;
        setCategoriaData({ ...categoriaData, [name]: value });

    }

    return (
        <div className='editar'>
            <div>
                <h2>Editar Categoria</h2>

                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="nome">Nome: </label>
                    <input type="text" name="nome" id="nome" value={categoriaData.nome} onChange={handleChange} />

                    <span>
                        <button type="submit">Editar</button>
                        <button onClick={closeModal}>Fechar</button>
                    </span>
                </form>
            </div>

        </div>
    );
}