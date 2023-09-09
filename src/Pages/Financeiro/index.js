import { useRef, useState, useEffect, useContext, useMemo } from 'react';
import NavBar from '../../components/NavBar';
import { BsFillPlusCircleFill, BsWhatsapp, BsXCircle } from "react-icons/bs";
import { Table, Button } from 'reactstrap';
import { db } from '../../service/firebase';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Input from '../../components/Input'
import { Form } from '@unform/web';
import { AuthContext } from '../../Context/AuthContext';
import { SwalContext } from '../../Context/SwalContext';
import { Currency } from '../../util/Mascaras';
export default function Financeiro() {
    const { user } = useContext(AuthContext);
    const { swalConfirm, swalToast } = useContext(SwalContext);

    const [lstFinanceiro, setLstFinanceiro] = useState([]);

    async function inserirFinanceiro(data, { reset }) {
        let dataAtual = new Date();
        console.log(data.valor.replace(",","."));
        let dado = {'movimentacao' : data.movimentacao,
                    'data': dataAtual.toLocaleDateString(),
                    'valor': Number(data.valor.replace(",",".").replace("R$", "")),
                    'tipo': data.tipo}
        try {
            const docRef = await addDoc(collection(db, "usuarios", user.uid, "financeiro"), dado);
            dado.id = docRef.id
            console.log(dado)
            setLstFinanceiro([dado, ...lstFinanceiro])
            reset();
            swalToast('success', 'Financeiro Inseridos com Sucesso');
        } catch (e) {
            swalToast('error', e);
            console.error("Error adding document: ", e);
        }
    }

    useEffect(() => {
        async function recuperarFinanceiro() {

            let arrayDoc = [];

            const enderecos = await getDocs(collection(db, "usuarios", user.uid, "financeiro"));
            enderecos.forEach((doc) => {
                console.log(doc);
                arrayDoc.push({
                    'id': doc.id,
                    'movimentacao' : doc.data().movimentacao,
                    'data': doc.data().data,
                    'valor':doc.data().valor,
                    'tipo': doc.data().tipo
                })
            });
            setLstFinanceiro(arrayDoc)
        }
        recuperarFinanceiro();
    }, [])

    function removerMovimentacao(id) {
        try {
            swalConfirm("Deseja realmente excluir esses Financeiro? Essa ação não é reversível")
                .then(async (result) => {
                    if (result.isConfirmed) {
                        await deleteDoc(doc(db, "usuarios", user.uid, "financeiro", id));
                        setLstFinanceiro(lstFinanceiro.filter(c => c.id != id))
                    } else {
                        return;
                    }
                })
        } catch (e) {
            console.error("Error adding document: ", e)
        }
    }

    const valoresMovimentacoes = useMemo(() => calculaValores())

    const formRef = useRef(null);
    return (
        <div>
            <NavBar />
            <div className="content">
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
                <div className='list'>
                    <Table>
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
                                    <tr key={convidado.id} className='teste'>
                                        <th data-label="#" scope="row">
                                            {index}
                                        </th>
                                        <td data-label="Movimentação">
                                            {convidado.movimentacao}
                                        </td>
                                        <td data-label="Valor">
                                            {convidado.valor.toString().replace(".",",")}
                                        </td>
                                        <td data-label="tipo">
                                            {convidado.tipo === "P" ? 'Pago' : 'À pagar'}
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
            </div>
        </div>
    );
}