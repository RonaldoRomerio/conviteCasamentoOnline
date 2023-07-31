import{createContext} from 'react';
import Swal from 'sweetalert2'
//APIContext
export const SwalContext = createContext({});

function SwalProviderContext({children}){
    
    function swalToast(situacao, mensagem){
        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        }).fire({
            icon: situacao,
            title: mensagem
        })
    }
    async function swalConfirm(texto){
        return await new Promise((resolve, reject) => {
            Swal.fire({
                title: 'Deseja realmente fazer isso?',
                text: texto,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: "Continuar",
                cancelButtonText: "Cancelar",
            }).then((result => {
                    resolve(
                        result
                    )
                })
            )})
    }
    function swalAlert(titulo, texto, icone){
        Swal.fire({title: titulo, 
            text: texto, 
            icon: icone,             
        })
    }
    return(
        <SwalContext.Provider 
        value={{
            swalConfirm,
            swalToast,
            swalAlert
        }}>
            {children}
        </SwalContext.Provider>
    )
}

export default SwalProviderContext;