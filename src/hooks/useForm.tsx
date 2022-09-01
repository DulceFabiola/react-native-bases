
import { useState } from 'react'
//Custom hook generico, es decir no importa el argumento que reciba, 
//el tipo interno va a ser igual al tipo que se reciba
// es un standar que el primer génerico se llame T
export const useForm = <T extends Object>(formulario: T) => {
    const [state, setState] = useState(formulario)

    //cambio de un input
    //validar que campo sea de tipo T
    const onChange = (value: string, campo: keyof T) => {
        setState({
            //desestructurando el formulario,
            ...state,
            //cambiar el estado
            //computando el valor de la propiedad, sobre la propiedad que ya existe
            [campo]: value,

            //de lo contrario estarías declarando como una prop nueva
            //campo: value,
        })
    }
    return {
        //Operador spread
        //desustructuración del formulario, el resto de campos
        ...state,
        formulario: state,
        onChange,
    }
}
