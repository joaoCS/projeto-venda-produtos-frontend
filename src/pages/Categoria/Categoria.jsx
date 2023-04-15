import React, { useEffect, useState } from 'react';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import EditarCategoriaModal from '../../components/Modal/EditarCategoriaModal/EditarCategoriaModal';
import DeleteCategoriaModal from '../../components/Modal/DeleteCategoriaModal/DeleteCategoriaModal';
import api from '../../config/api';

export default function Categoria() {
    const [categorias, setCategorias] = useState([]);
    const [isOpenEditarModal, setIsOpenEditarModal] = useState(false);
    const [modalCategoria, setModalCategoria] = useState({});
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [cookies, setCookies] = useCookies(["access_token"]);

    async function buscaCategorias() {
        try {
            const response = await api.get('/categorias');

            setCategorias(response.data);

        }
        catch (err) {
            alert("Erro ao buscar categorias!");
        }
    }

    useEffect(() => {

        buscaCategorias();
    }, []);

    function openEditarModal() {
        setIsOpenEditarModal(true);
    }

    function closeEditarModal() {
        setIsOpenEditarModal(false);
        buscaCategorias();
    }

    function openDeleteModal() {
        setIsOpenDeleteModal(true);
    }

    function closeDeleteModal() {
        setIsOpenDeleteModal(false);
        buscaCategorias();
    }

    return (
        <div className='content'>
            <h3>Categorias de Produtos</h3>
            <ul>
                {categorias.map((categoria, idx) => {
                    return (
                        <li key={idx}>
                            <span>
                                <strong>Nome: </strong>{categoria.nome}
                            </span>
                            &nbsp;
                            <button onClick={(e) => { openEditarModal(); setModalCategoria(categoria) }}>Editar <AiFillEdit /></button>
                            &nbsp;
                            <button onClick={(e) => { openDeleteModal(); setModalCategoria(categoria) }}>Deletar <AiOutlineDelete /></button>
                        </li>
                    );
                })}
            </ul>

            {isOpenEditarModal && <EditarCategoriaModal
                categoria={modalCategoria}
                closeModal={closeEditarModal} />}

            {isOpenDeleteModal && <DeleteCategoriaModal
                categoria={modalCategoria}
                closeModal={closeDeleteModal} />}


        </div>
    );
}