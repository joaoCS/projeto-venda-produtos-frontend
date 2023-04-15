import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import api from "../../../config/api";

export default function DeleteCategoriaModal ({ categoria, closeModal }) {
    
    const [cookies, setCookies] = useCookies(["access_token"]);
 
   async function removeCategoria() {
      try {
         const response = await api.delete('/categorias/delete', {
            headers: {
               authorization: cookies.access_token
            },
            data: {
               categoria
            }
         });

         alert(response.data.message);
         closeModal();
      }
      catch (err) {
         alert("Erro ao remover categoria!");
         console.log(err);
      }
   }
    
     
    return (
        <div className="delete">
         <div>
            <h4>Remover categoria {categoria.nome}?</h4>
            <span>
               <button onClick={removeCategoria}>Sim</button>
               <button onClick={closeModal}>Não</button>
            </span>
         </div>
      </div>
    );
}