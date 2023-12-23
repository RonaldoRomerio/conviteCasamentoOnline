import { useRef, useState, useEffect, useContext, useMemo } from 'react';
import PaginaBase from '../PaginaBase';
import './style.css';
import { BsFillPlusCircleFill, BsXCircle, BsCheckCircle } from "react-icons/bs";
import { Table, Button } from 'reactstrap';
import Input from '../../components/Input'
import { Form } from '@unform/web';
import { AuthContext } from '../../Context/AuthContext';
import { Currency } from '../../util/Mascaras';
import useFirestoreHook from '../../customHooks/FirestoreHook';
import { SwalContext } from '../../Context/SwalContext';

export default function Financeiro() {
    const { user } = useContext(AuthContext);
    const formRef = useRef(null);
    const [lstFinanceiro, carregaDados, addDocumento, removeDocumento, editaDocumento, editaValor, qtdDados] = useFirestoreHook(`usuarios/${user.uid}/financeiro`, 'Dado financeiro');
    const { swalConfirm} = useContext(SwalContext);

    async function inserirFinanceiro(data, { reset }) {
        let dataAtual = new Date();
        let infoFinanceiro = {'movimentacao' : data.movimentacao,
                    'data': dataAtual.toLocaleDateString(),
                    'valor': Number(data.valor.replace(",",".").replace("R$", "")),
                    'tipo': data.tipo}
        addDocumento(infoFinanceiro,reset);
    }

    useEffect(() => {
        carregaDados();
    }, [])

    function removerMovimentacao(id) {
        removeDocumento(id);
    }
    function alteraParaPago(id){
        editaValor(id, {'tipo': 'P'})
    }

    const valorPago = useMemo(() => calculaValor('P') , [lstFinanceiro])

    const valorDevido = useMemo(() => calculaValor('D') , [lstFinanceiro])
    

    function calculaValor(tipo){
        let ValoresPagos = lstFinanceiro.filter(e => e.data.tipo === tipo);
        let valorTotal = 0;
        console.log(ValoresPagos);
        console.log(lstFinanceiro);
        ValoresPagos.forEach(valor => {
            valorTotal += valor.data.valor;
        });

        return valorTotal;
    }
    return (
        <PaginaBase>
                <div className='form'>
                    <div className='tituloForm'><span><BsFillPlusCircleFill size={15} color={'#fff'} /> Adicionar Financeiro</span></div>
                    <Form ref={formRef} onSubmit={inserirFinanceiro}>
                        <div className='inputForm cl7' >
                            <Input type="text" nome="movimentacao" required></Input>
                            <label>Nome da movimentação</label>
                        </div>
                        <div className='inputForm cl2'>
                            <Input type="text" nome="valor" onInput={(e) => Currency(e.target)} required></Input>
                            <label>Valor</label>
                        </div>
                        <div className='inputFormSelect cl2'>
                            <Input nome="tipo" tipo={'select'} required>
                                <option value=''>Transação</option>
                                <option value='D'>Á pagar</option>
                                <option value='P'>Pago</option>
                            </Input>
                        </div>
                        <div className='inputForm cl1'>
                            <Button outline color="success" className='buttonForm'>
                                Salvar
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className='relatorioFinanceiro'>
                    <span>Valor Pago: {valorPago} </span> <span>Valor à pagar: {valorDevido} </span>
                </div>
                <div className='list'>
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    movimentações
                                </th>
                                <th>
                                    Valor
                                </th>
                                <th>
                                    tipo
                                </th>
                                <th>
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {lstFinanceiro != null && lstFinanceiro.length > 0 ?
                                lstFinanceiro.map((financeiro, index) => (
                                    <tr key={financeiro.id} className={financeiro.data.tipo === "P" ? 'table-success' : 'table-danger'}>
                                        <th data-label="#" scope="row">
                                            {index}
                                        </th>
                                        <td data-label="Movimentação">
                                            {financeiro.data.movimentacao}
                                        </td>
                                        <td data-label="Valor">
                                            R$ {financeiro.data.valor.toString().replace(".",",")}
                                        </td>
                                        <td data-label="tipo" >
                                            {financeiro.data.tipo === "P" ? 'Pago' : 'À pagar'}
                                        </td>
                                        <td data-label="Ações">
                                            <div className='botaoLista'>
                                                {financeiro.data.tipo === "P" ? 
                                                    '' 
                                                    :
                                                    <button onClick={() => alteraParaPago(financeiro.id)}><BsCheckCircle color={"green"} size={28} /></button>
                                                }
                                                <button onClick={() => removerMovimentacao(financeiro.id)}><BsXCircle color={"red"} size={28} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5}> Não há Financeiro inseridos </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </PaginaBase>
    );
}