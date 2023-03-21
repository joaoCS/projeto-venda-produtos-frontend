import React from "react";
import './deleteProdutoModal.css';
import axios from "axios";
import { useCookies } from "react-cookie";

export default function DeleteProdutoModal ({ produto, closeModal }){
    
    const [cookies, setCookies] = useCookies(["access_token"]);

    async function deleteProduct(event) {
           try {
                const response = await  axios.delete("http://localhost:3001/produtos/delete", 
                                                produto, 
                                                {
                                                    headers: {
                                                        authorization: cookies.access_token
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
            <h3>Apagar {produto.nome}?</h3>
            <button onClick={deleteProduct}>Sim</button>
            <button onClick={closeModal}>Não</button>
        </div>
    );
}