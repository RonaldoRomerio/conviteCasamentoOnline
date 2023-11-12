import { useRef, useState, useEffect, useContext, useMemo } from 'react';
import PaginaBase from '../PaginaBase';
import './style.css';
import { BsFillPlusCircleFill, BsWhatsapp, BsXCircle } from "react-icons/bs";
import { Table, Button } from 'reactstrap';
import Input from '../../components/Input'
import { Form } from '@unform/web';
import { AuthContext } from '../../Context/AuthContext';
import { Currency } from '../../util/Mascaras';
import useFirestoreHook from '../../util/FirestoreHook';

export default function Financeiro() {
    const { user } = useContext(AuthContext);
    const formRef = useRef(null);
    const [lstFinanceiro, carregaDados, addDocumento, removeDocumento, qtdDados] = useFirestoreHook(`usuarios/${user.uid}/financeiro`, 'Dado financeiro');
    
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
                                <option value='D'>Á pagar</option>
                                <option value='P'>Pago</option>
                            </Input>
                        </div>
                        <div className='inputForm cl1'>
                            <Button color="light" className='buttonForm'>
                                Salvar
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className='relatorioFinanceiro'>
                    <span>Valor Pago: {valorPago} </span> <span>Valor à pagar: {valorPago >= valorDevido ? 0 :  valorDevido - valorPago } </span>
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
                                lstFinanceiro.map((convidado, index) => (
                                    <tr key={convidado.id} className={convidado.data.tipo === "P" ? 'table-success' : 'table-danger'}>
                                        <th data-label="#" scope="row">
                                            {index}
                                        </th>
                                        <td data-label="Movimentação">
                                            {convidado.data.movimentacao}
                                        </td>
                                        <td data-label="Valor">
                                            R$ {convidado.data.valor.toString().replace(".",",")}
                                        </td>
                                        <td data-label="tipo" >
                                            {convidado.data.tipo === "P" ? 'Pago' : 'À pagar'}
                                        </td>
                                        <td data-label="Ações">
                                            <div className='botaoLista'>
                                                <button onClick={() => removerMovimentacao(convidado.id)}><BsXCircle color={"red"} size={28} /></button>
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