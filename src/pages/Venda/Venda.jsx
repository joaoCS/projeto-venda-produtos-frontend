import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const Venda = () => {
    
    const [ produtos, setProdutos ] = useState(()=>[]);
    const [ venda, setVenda ] = useState([]);
    const [ clientes, setClientes ]  = useState([]);
    const [ vendaData, setVendaData] = useState({ cliente: { }, venda, totalPagar: 0 });

    let vendas = [];

    const [cookies, setCookies] = useCookies(["access_token"]);

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

    function atualizaTotalPagar(){
        let total = 0 ;

        for (let index = 0; index < vendas.length; index++) {
            total += vendas[index].quantidade * vendas[index].valorVenda;
            
        }

        setVendaData({ ...vendaData, totalPagar: total });
    }

    function adicionaProduto(event) {
        event.preventDefault();

        const index = event.target.index.value;

        let v = [...venda];

        let prod = produtos;

        prod[index].quantidade = 1;
        v.push(prod[index]);
        
        
        setVenda([...v]);
        vendas = [...v];
        
        prod.splice(index, 1);

        setProdutos([...prod]);

        atualizaTotalPagar();
      

    }
    
    function removeProduto(event) {
        event.preventDefault();

        const index = event.target.name;
        
        let prod = [...produtos];
        let v = [...venda];

        prod.push(v[index]);
        setProdutos(prod);

        v.splice(index, 1);
        setVenda(v);

        vendas = v;

        atualizaTotalPagar();
    }

    async function fetchClientes(){
                
        try {
            const response = await axios.get("http://localhost:3001/clientes/");

            setClientes(response.data);
        } catch (err) {
            alert("Erro ao buscar clientes!", err)
        }

    }

    function selecionaCliente(event){
        const index = event.target.value;

        vendaData.cliente = clientes[index];


        console.log(vendaData);
        
    }
    function setQtd(event){
        const quantidade = event.target.value;
        const index = event.target.name;

        let v = [...venda];
        v[index].quantidade = quantidade;
        setVenda(v);
        vendas = v;

        console.log(venda[index]);

        atualizaTotalPagar();
    }

    async function confirmaVenda () {
        
        if(venda.length === 0) {
            alert("Selecione produtos!");
            return;
        }
        vendaData.venda = [...venda];

        if(Object.keys(vendaData.cliente).length === 0) {
            alert("Selecione um cliente!");
            return;
        }

        try {
        
            const response = await axios.post('http://localhost:3001/vendas/efetuarVenda', vendaData, {
                headers: { authorization: cookies.access_token}});

            alert(response.data.message);
            
        } catch (err) {
            alert("Erro ao efetuar venda!", err);
        }
    }

    useEffect(()=>{

        buscaProdutos();
        fetchClientes();
    }, []);

    return (
        <div>
            <h2>Escolher produtos</h2>
            <div>
                {produtos.map((produto, idx)=>{
                    return (<form key={idx} onSubmit={adicionaProduto} method="post">
                                
                                <strong>Nome:</strong> &nbsp;
                                <span>{produto.nome}</span>&nbsp;
                                <strong>Preço:</strong> &nbsp;
                                <span>{produto.valorVenda}</span>&nbsp;
                                <strong>Categoria:</strong> &nbsp;
                                <span>{produto.categoria.nome}</span>  &nbsp; 
                                <input type="hidden" id="index" name="index" value={idx} />
                                <button type="submit">Adicionar</button>
                            </form>);
                })}
            </div>
            <hr />
            <h2>Venda</h2>
            <div>
            {venda.map((v, idx)=>{
                    return (<div key={idx}>
                                <strong>Nome:</strong> &nbsp;
                                <span>{v.nome}</span>&nbsp;
                                <strong>Preço:</strong> &nbsp;
                                <span>{v.valorVenda}</span>&nbsp;
                                <strong>Categoria:</strong> &nbsp;
                                <span>{v.categoria.nome}</span>  &nbsp; 
                                <input type="hidden" id="index" name="index" value={idx} />
                                <strong>Quantidade:</strong>
                                <input type="number" id="quantidade" name={idx} onChange={setQtd} value={v.quantidade}/>

                                <button onClick={removeProduto} name={idx}>Remover</button>
                            </div>);
                })}
            </div>
            <div>
                <hr />
                <h2>Cliente</h2>
                <form action="" method="post">
                    <select name="cliente" id="" onChange={selecionaCliente}>
                    <option id="nulo" key={-1} value={null}>Selecionar cliente</option>
                        {clientes.map((cliente, idx) => {
                            return (
                                <option id={cliente._id} key={idx} value={idx}>{cliente.nome}</option>
                            );
                        })}
                    </select>
                </form>
                <h2>Total a pagar: </h2>
                <span>{vendaData.totalPagar}</span>
            </div>

            <button onClick={confirmaVenda}>Confirmar venda</button>
        </div>
    );
}