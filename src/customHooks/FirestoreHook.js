import { useState, useContext, useMemo } from 'react';
import { db } from '../service/firebase';
import { addDoc, getDocs, deleteDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { SwalContext } from '../Context/SwalContext';
export default function FirestoreHook(referencia, entidade) {
    const { swalConfirm, swalToast } = useContext(SwalContext);
    const [dados, setDados] = useState([]);
    const qtdDados = useMemo(() => dados.length, [dados])
    
    const carregaDados = async () => {
        let arrayDoc = [];
        try{
            const enderecos = await getDocs(collection(db, referencia.toString()));
            enderecos.forEach((doc) => {
                arrayDoc.push({
                    "id" : doc.id,
                    data: doc.data()
                })
            });
            setDados(arrayDoc);
        } catch(e){
            swalToast('error', e);
        }
    }

const addDocumento = async (object, reset) => {
    try {
        const docRef = await addDoc(collection(db, referencia), object);
        setDados([{ "id": docRef.id,
                    "data": object}, 
                    ...dados]);
        swalToast('success', `${entidade} Inserido(a) com Sucesso`);
        reset();
    } catch (e) {
        swalToast('error', e);
    }
}
const removeDocumento = (id) => {
    try {
        swalConfirm(`Deseja realmente excluir esse(a) ${entidade}? Essa ação não é reversível`)
            .then(async (result) => {
                if (result.isConfirmed) {
                    await deleteDoc(doc(db,referencia, id));
                    setDados(dados.filter(c => c.id != id))
                } else {
                    return;
                }
            })
    } catch (e) {
        swalToast('error', e);
    }
}
const editaDocumento = async(id, object, reset) => {
    try {
        await setDoc(doc(db, referencia, id), object);
        swalToast('success', `${entidade} alterado(a) com Sucesso`);
        reset();
    } catch (e) {
        swalToast('error', e);
    }
}
const editaValor = async(id, object) => {
    try {
        await updateDoc(doc(db, referencia, id), object);
        carregaDados();
        swalToast('success', `${entidade} alterado(a) com Sucesso`);
    } catch (e) {
        swalToast('error', e);
    }
}
return [dados, carregaDados, addDocumento, removeDocumento, editaDocumento,editaValor, qtdDados];
}