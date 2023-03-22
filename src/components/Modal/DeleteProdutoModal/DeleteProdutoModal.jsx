import React from "react";
import './deleteProdutoModal.css';
import axios from "axios";
import { useCookies } from "react-cookie";

export default function DeleteProdutoModal({ produto, closeModal }) {

    const [cookies, setCookies] = useCookies(["access_token"]);

    async function deleteProduct(event) {
        try {
            const response = await axios.delete("http://localhost:3001/produtos/delete",
                {
                    headers: {
                        authorization: cookies.access_token
                    },
                    data: {
                        produto,
                    }
                });
            alert(response.data.message);
        }
        catch (err) {
            alert("Erro ao excluir produto!", err);

        }
        closeModal();
    }

    return (
        <div className="delete">
            <div>

                <h4>Apagar {produto.nome}?</h4>
                <span>
                    <button onClick={deleteProduct}>Sim</button>
                    <button onClick={closeModal}>Não</button>
                </span>
            </div>
        </div>
    );
}