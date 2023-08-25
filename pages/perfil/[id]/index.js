import comAutenticacao from '../../../hoc/comAutorizacao'
import Feed from '../../../componentes/feed'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CabecalhoPerfil from '../../../componentes/cabecalhoPerfil';
import UsuarioService from '../../../services/UsuarioService';

const usuarioService = new UsuarioService();


function Perfil({ usuarioLogado }) {
    const [usuario, setUsuario] = useState({});
    const router = useRouter();


    const obterPerfil = async () => {
        try {
            
            if (!router.query.id) {
                console.log('sem router.query.id... faz nada')
                return;
            }
            
            const dadosPerfil = await usuarioService.obterPerfil(router.query.id);
            //console.log('chegou router... dados coletados:',dadosPerfil.data);
            setUsuario(dadosPerfil.data);
            //setTeste(true);
            //console.log('setei usuario...mas ainda não atualizou',usuario);
        } catch (e) {
            alert('Erro ao obter perfil do usuario')
        }
    }
    useEffect(() => {
        
        //console.log("Vou atualizar a Pagina Perfil com o que? :");
        obterPerfil();
        //console.log('deveria atualizar agora?',usuario);
        
    }, [router.query.id]);//,teste]);

    
    return (
        <div className='paginaPerfil'>
            <CabecalhoPerfil
                usuarioLogado={usuarioLogado}
                usuario={usuario}
            />
            <Feed
                usuarioLogado={usuarioLogado}
                usuario={usuario}
            />
        </div>
    );
}

export default comAutenticacao(Perfil);