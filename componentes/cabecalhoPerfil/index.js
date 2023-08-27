import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import UsuarioService from '../../services/UsuarioService'
import CabecalhoComAcoes from '../cabecalhoComAcoes';
import Botao from '../botao'
import Avatar from '../avatar';

import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg'
import imgLogout from '../../public/imagens/logout.svg'
import Image from 'next/image';

const usuarioService = new UsuarioService();

export default function CabecalhoPerfil({
    usuario,
    estaNoPerfilPessoal
}) {
    const [estaSeguindoUsuario, setEstaSeguindoUsuario] = useState(false);
    const [quantidadeSeguidores, setQuantidadeSeguidores] = useState(0);
    const router = useRouter();

    useEffect(() => {


        if (!usuario) {
            return;
        }
        setEstaSeguindoUsuario(usuario.segueEsseUsuario);
        setQuantidadeSeguidores(usuario.seguidores);
    }, [usuario]);

    const obterTextoBotaoPrincipal = () => {
        if (estaNoPerfilPessoal) {
            return 'Editar Perfil';
        }

        if (estaSeguindoUsuario) {
            return 'Deixar de seguir';
        }
        return "seguir";
    }

    const obterCorBotaoPrincipal = () => {
        if (estaSeguindoUsuario || estaNoPerfilPessoal) {
            return 'invertido';
        }
        return "primaria";
    }
    const manipularClickBotaoPrincipal = async () => {
        if (estaNoPerfilPessoal) {
            return router.push('/perfil/editar');
        }

        try {
            await usuarioService.alternarSeguir(usuario._id);
            setQuantidadeSeguidores(
                estaSeguindoUsuario
                    ? (quantidadeSeguidores - 1)
                    : (quantidadeSeguidores + 1)
            )
            setEstaSeguindoUsuario(!estaSeguindoUsuario)
        } catch (e) {
            alert('Erro ao Seguir/Deixar de Seguir!')
        }
    }

    const aoClicarSetaEsquerda = () => {
        router.back();
    }

    const logout = () => {
        usuarioService.logout();
        router.replace('/');
    }

    const obterElementoDireitaCabecalho = () => {
        if (estaNoPerfilPessoal) {
            return (
                <Image
                    src={imgLogout}
                    alt='ícone logout'
                    onClick={logout}
                    width={25}
                    height={25}
                />
            )
        }
        return null;
    }

    return (
        <div className='cabecalhoPerfil largura30pctDescktop'>

            <CabecalhoComAcoes
                iconeEsquerda={estaNoPerfilPessoal ? null : imgSetaEsquerda}
                aoClicarAcaoEsquerda={aoClicarSetaEsquerda}
                titulo={usuario.nome}
                elementoDireita={obterElementoDireitaCabecalho()}
            />

            <hr className='bordaCabecalhoPerfil' />

            <div className='statusPerfil'>
                <Avatar src={usuario.avatar} />
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
                        texto={obterTextoBotaoPrincipal()}
                        cor={obterCorBotaoPrincipal()}
                        manipularClick={manipularClickBotaoPrincipal}
                    />
                </div>
            </div>
        </div>
    )
}