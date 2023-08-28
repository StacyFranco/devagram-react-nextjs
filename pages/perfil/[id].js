import comAutenticacao from '../../hoc/comAutorizacao'
import Feed from '../../componentes/feed'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CabecalhoPerfil from '../../componentes/cabecalhoPerfil';
import UsuarioService from '../../services/UsuarioService';

const usuarioService = new UsuarioService();


function Perfil({ usuarioLogado, }) {
    const [usuario, setUsuario] = useState({});
    const router = useRouter();


    const obterPerfil = async () => {
        try {
            
            if (!router.query.id) {
                
                return;
            }
            /* Realizando com if else comum
            if(router.query.id === 'eu'){
                const dadosPerfil = await usuarioService.obterPerfil(usuarioLogado.id);
                setUsuario(dadosPerfil.data);
            }else{
                const dadosPerfil = await usuarioService.obterPerfil(router.query.id);
                setUsuario(dadosPerfil.data);
            }
             */   
            // logica if else com operadores ternarios
            const dadosPerfil = await usuarioService.obterPerfil(
                router.query.id === 'eu'
                ? usuarioLogado.id
                : router.query.id
                );
         
            setUsuario(dadosPerfil.data);
            
        } catch (e) {
            alert('Erro ao obter perfil do usuario')
        }
    }

    const estaNoPerfilPessoal =() =>{
        
        return (
            (router.query.id === usuarioLogado.id) 
            || (router.query.id ==='eu')
        );
    }

    useEffect(() => {
        
        
        obterPerfil();
        
        
    }, [router.query.id]);//,teste]);

    
    return (
        <div className='paginaPerfil'>
            <CabecalhoPerfil
                usuarioLogado={usuarioLogado}
                usuario={usuario}
                estaNoPerfilPessoal={estaNoPerfilPessoal()}
            />
            <Feed
                usuarioLogado={usuarioLogado}
                usuario={usuario}
            />
        </div>
    );
}

export default comAutenticacao(Perfil);