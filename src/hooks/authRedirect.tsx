import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function AuthRedirect(getUrl: any) {
    const username = localStorage.getItem('@cardapio-facil/username'); //Obeter informações do usuário no localstorage (cookie)
    let navigate = useNavigate();

    return (
        useEffect(() => {
            // Se tiver informações do nome de usuário, me redirecionar para a página de editar
            if (username !== null) {
                navigate(getUrl); // A Url é definina na função ex: AuthRedirect('/menu')
            }
            else {
                navigate('/');
            }
        }, [])
    )
}
