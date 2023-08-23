import comAutenticacao from '../../../hoc/comAutorizacao'

function Perfil(){
    return (
        <h1>
            Perfil
        </h1>
    );
}

export default comAutenticacao(Perfil);