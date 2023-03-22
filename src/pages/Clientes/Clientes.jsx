import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import EditarClienteModal from '../../components/Modal/EditarClienteModal/EditarClienteModal';
import DeleteClienteModal from '../../components/Modal/DeleteClienteModal/DeleteClienteModal';

export default function Clientes() {

    const [clientes, setClientes] = useState([]);
    const [isOpenEditarModal, setIsOpenEditarModal] = useState(false);
    const [modalCliente, setModalCliente] = useState({});
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    async function buscaClientes() {
        try {
            const response = await axios.get('http://localhost:3001/clientes');

            console.log(response.data);
            setClientes(response.data);
        } 
        catch (err) {
            alert("Erro ao buscar clientes!", err);    
        }
    }

    useEffect(()=> {
        buscaClientes();
    }, []);

    function openEditarModal(){
        setIsOpenEditarModal(true);
    }
    
    function closeEditarModal () {
        setIsOpenEditarModal(false);
        buscaClientes();
    }

    function openDeleteModal() {
        setIsOpenDeleteModal(true);
    }

    function closeDeleteModal () {
        setIsOpenDeleteModal(false);
        buscaClientes();
    }

    return (
        <div>
            Clientes

            <ul>
                {clientes.map((cliente, idx) => {
                    return (<li key={idx}>
                                <strong>Nome: &nbsp;</strong>{cliente.nome}&nbsp;
                                <strong>CPF: &nbsp;</strong>{cliente.cpf}&nbsp;
                                <strong>Endereço: &nbsp;</strong>{cliente.endereco}&nbsp;
                                <strong>Telefone: &nbsp;</strong>{cliente.telefone}&nbsp;
                                <button onClick={(e)=>{ openEditarModal(); setModalCliente(cliente) }}>Editar <AiFillEdit/> </button>&nbsp;
                                <button onClick={(e) => { openDeleteModal(); setModalCliente(cliente) }}>Deletar  <AiOutlineDelete/> </button>
                            </li>);
                })}
            </ul>

            {isOpenEditarModal && <EditarClienteModal
                                    cliente={modalCliente}
                                    closeModal={closeEditarModal}/>}
            
            {isOpenDeleteModal && <DeleteClienteModal
                                    cliente={modalCliente}
                                    closeModal={closeDeleteModal}/>}
        </div>
    );
};