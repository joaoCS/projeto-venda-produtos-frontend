import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import EditarProdutoModal from '../../components/Modal/EditarProdutoModal/EditarProdutoModal';
import DeleteProdutoModal from '../../components/Modal/DeleteProdutoModal/DeleteProdutoModal';
import api from '../../config/api';

export default function Produtos() {

    const [cookies, setCookies] = useCookies(["access_token"]);
    const [produtos, setProdutos] = useState([]);
    const [isOpenEditarModal, setIsOpenEditarModal] = useState(false);
    const [modalProduto, setModalProduto] = useState({});
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);


    async function buscaProdutos() {
        try{
            
            const response = await api.get('/produtos', {headers:{
                authorization: cookies.access_token
            }});
            setProdutos(response.data);
        }
        catch(err) {
            console.log(err);
            alert(err);
        }
    }



    useEffect(()=>{
        async function fetchProds() {
            await buscaProdutos();
        }

        fetchProds();

    }, []);

    function openEditarModal () {
        setIsOpenEditarModal(true);
    }
    
    function closeEditarModal () {
        setIsOpenEditarModal(false);
        buscaProdutos();
    }
    
    function openDeleteModal () {
        setIsOpenDeleteModal(true);
    }
    
    function closeDeleteModal () {
        setIsOpenDeleteModal(false);
        buscaProdutos();
    }
    return (
        <div className='content'>
            <h3>Produtos</h3>
            <ul>
                {produtos.map((produto, idx)=>{
                    return (
                        <li key={produto._id}>
                            <span>
                                <strong>Nome: </strong>{produto.nome}
                            </span>
                            &nbsp;
                            <span> 
                                <strong>Preço: </strong> R$ {produto.valorVenda}
                            </span> 
                            &nbsp;
                            <span>
                               <strong> Categoria: </strong>{produto.categoria?.nome}
                            </span>
                            &nbsp;
                            <button onClick={(e)=>{ openEditarModal(); setModalProduto(produto) }}>Editar <AiFillEdit/></button>
                            &nbsp;
                            <button onClick={(e) => { openDeleteModal(); setModalProduto(produto) }}>Deletar <AiOutlineDelete/></button>
                        </li>
                        );
                })}
            </ul>
           {isOpenEditarModal && <EditarProdutoModal 
                            produto={modalProduto}
                            closeModal={closeEditarModal}/>}
           
           {isOpenDeleteModal && <DeleteProdutoModal 
                            produto={modalProduto}
                            closeModal={closeDeleteModal}/>}
        </div>
    );
};

