import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg'
import CabecalhoComAcoes from '../cabecalhoComAcoes';
import Botao from '../botao'
import Avatar from '../avatar';
import { useEffect, useState } from 'react';
import UsuarioService from '../../services/UsuarioService'
import { useRouter } from 'next/router';

const usuarioService = new UsuarioService();

export default function CabecalhoPerfil({
    usuario
}) {
    const [estaSeguindoUsuario,setEstaSeguindoUsuario] = useState(false);
    const [quantidadeSeguidores,setQuantidadeSeguidores] = useState(0);
    const router = useRouter();

    useEffect(()=>{
        

        if(!usuario){
            return;
        }
        setEstaSeguindoUsuario(usuario.segueEsseUsuario);
        setQuantidadeSeguidores(usuario.seguidores);
    },[usuario]);

    const obterTextoBotaoSeguir =() =>{
        
        if(estaSeguindoUsuario){
            return 'Deixar de seguir';
        }
        return "seguir";
    }

    const obterCorBotaoSeguir = ()=>{
        if(estaSeguindoUsuario){
            return 'invertido';
        }
        return "primaria";
    }
    const manipularClickBotaoSeguir = async()=>{
        try{
            await usuarioService.alternarSeguir(usuario._id);
            setQuantidadeSeguidores(
                estaSeguindoUsuario 
                ? (quantidadeSeguidores - 1 )
                : (quantidadeSeguidores + 1 )
                )
            setEstaSeguindoUsuario(!estaSeguindoUsuario)
        }catch(e){
            alert('Erro ao Seguir/Deixar de Seguir!')
        }
    }

    const aoClicarSetaEsquerda =()=>{
        router.back();
    }

    return (
        <div className='cabecalhoPerfil largura30pctDescktop'>
            <CabecalhoComAcoes
                iconeEsquerda={imgSetaEsquerda}
                titulo={usuario.nome}
                aoClicarAcaoEsquerda={aoClicarSetaEsquerda}
            />

            <hr className='bordaCabecalhoPerfil'/>

            <div className='statusPerfil'>
                <Avatar src={usuario.avatar}/>
                <div className='informacoesPerfil'>
                    <div className='statusContainer'>
                        <div className='status'>
                            <strong>{usuario.publicacoes}</strong>
                            <span>publicações</span>
                        </div>
                        <div className='status'>
                            <strong>{quantidadeSeguidores}</strong>
                            <span>seguidores</span>
                        </div>
                        <div className='status'>
                            <strong>{usuario.seguindo}</strong>
                            <span>seguindo</span>
                        </div>
                    </div>
                    <Botao 
                        texto={obterTextoBotaoSeguir()}
                        cor={obterCorBotaoSeguir()}
                        manipularClick={manipularClickBotaoSeguir}
                    />
                </div>
            </div>
        </div>
    )
}