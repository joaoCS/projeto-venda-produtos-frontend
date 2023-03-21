import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import EditarProdutoModal from '../../components/Modal/EditarProdutoModal';
import DeleteProdutoModal from '../../components/Modal/DeleteProdutoModal';

export default function Produtos() {

    const [cookies, setCookies] = useCookies(["access_token"]);
    const [produtos, setProdutos] = useState([]);
    const [isOpenEditarModal, setIsOpenEditarModal] = useState(false);
    const [modalProduto, setModalProduto] = useState({});
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);


    async function buscaProdutos() {
        try{
            
            const response = await axios.get('http://localhost:3001/produtos', {headers:{
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
        console.log(modalProduto);
    }
    
    function closeEditarModal () {
        setIsOpenEditarModal(false);
        buscaProdutos();
    }
    
    function openDeleteModal () {
        setIsOpenDeleteModal(true);
        console.log(modalProduto);
    }
    
    function closeDeleteModal () {
        setIsOpenDeleteModal(false);
        buscaProdutos();
    }
    return (
        <div>
            <ul>
                {produtos.map((produto, idx)=>{
                    return (
                        <li key={produto._id}>
                            <span>Nome: </span> <strong>{produto.nome}</strong>
                            <span>Preço: </span> <strong>{produto.valorVenda}</strong>
                            <span>Categoria: </span> <strong>{produto.categoria.nome}</strong>
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

