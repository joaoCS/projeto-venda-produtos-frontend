import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import './deleteClienteModal.css';

export default function DeleteClienteModal({ cliente, closeModal }) {

   const [cookies, setCookies] = useCookies(["access_token"]);

   async function removeCliente() {
      try {
         const response = await axios.delete('http://localhost:3001/clientes/delete', {
            headers: {
               authorization: cookies.access_token
            },
            data: {
               cliente
            }
         });

         alert(response.data.message);
         closeModal();
      }
      catch (err) {
         alert("Erro ao remover cliente!");
         console.log(err);
      }
   }
 
   return (
      <div className="delete">
         <div>
            <h4>Remover cliente {cliente.nome}?</h4>
            <span>
               <button onClick={removeCliente}>Sim</button>
               <button onClick={closeModal}>Não</button>
            </span>
         </div>
      </div> 
   );
};