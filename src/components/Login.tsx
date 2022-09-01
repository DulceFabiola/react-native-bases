import { useEffect, useReducer } from 'react';

interface AuthState {
    validando: boolean;
    token: string | null;
    username: string;
    nombre: string;
}


const initialState: AuthState = {
    validando: true,
    token: null,
    username: '',
    nombre: ''
}

type LoginPayload = {
    username: string;
    nombre: string;
}

// la accion es la que modificará el state, regularmente tiene dos tipos, el nombre y el payload
type AuthAction =
    | { type: 'logout' }
    | { type: 'login', payload: LoginPayload };

//Un reducer esta compuesto de un state y un action
// EL estado será del mismo tipo que el estado inicial, en este caso la interfaz AuthState
//la action es la que modificará el state, regularmente tiene dos tipos, el nombre y el payload
const authReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'logout':
            return {
                validando: false,
                token: null,
                nombre: '',
                username: ''
            }

        case 'login':
            const { nombre, username } = action.payload;
            return {
                validando: false,
                token: 'ABC123',
                nombre,
                username
            }

        default:
            return state;
    }

}



export const Login = () => {
    //useReducer es hook compuesto por un 
    //state: Estado
    // dispatch: Función para dispara acciones
    //Reducer: Función para retornar un nuevo estado
    //InitialState: EStado iniciarl
    const [{ validando, token, nombre }, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: 'logout' });
        }, 1500);
    }, []);

    const login = () => {
        dispatch({
            type: 'login',
            payload: {
                nombre: 'Fabiola',
                username: 'Fa'
            }
        })
    }

    const logout = () => {
        dispatch({ type: 'logout' });
    }


    if (validando) {
        return (
            <>
                <h3>Login</h3>
                <div className="alert alert-info">
                    Validando...
                </div>
            </>
        )
    }



    return (
        <>
            <h3>Login</h3>

            {
                (token)
                    ? <div className="alert alert-success"> Autenticado como: {nombre} </div>
                    : <div className="alert alert-danger"> No autenticado </div>
            }


            {
                (token)
                    ?
                    (
                        <button
                            className="btn btn-danger"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    )
                    :
                    (
                        <button
                            className="btn btn-primary"
                            onClick={login}
                        >
                            Login
                        </button>
                    )
            }

        </>
    )
}