import Link from "next/link";
import Avatar from "../avatar";
import Image from "next/image";
import { use, useState } from "react";
import FazerComentario from './FazerComentario'

import imgCurtir from '../../public/imagens/curtir.svg';
import imgCurtido from '../../public/imagens/curtido.svg';
import imgComentarioAtivo from '../../public/imagens/comentarioAtivo.svg';
import imgComentarioCinza from '../../public/imagens/comentarioCinza.svg';
import FeedService from "@/services/FeedService";


const tamanhoLimiteDescricao = 93;
const feedService = new FeedService();

export default function Postagem({
    id,
    usuario,
    fotoDoPost,
    descricao,
    comentarios,
    usuarioLogado,
    curtidas,
}) {
    const [curtidasPostagem,setCurtidasPostagem] = useState(curtidas);
    const [comentariosPostagem,setComentariosPostagem] = useState(comentarios);
    const [deveExibirSecaoParaComentar,setDeveExibirSecaoParaComentar]= useState(false);
    const [tamanhoAtualDescricao, setTamanhoAtualDescricao] = useState(
        tamanhoLimiteDescricao);

    const exibirDescricaoCompleta =() =>{
        setTamanhoAtualDescricao(Number.MAX_SAFE_INTEGER)
    }
    
        const descricaoMaiorQueLimite = () => {
        return descricao.length > tamanhoAtualDescricao;
    }

    const obterDescricao = () => {
        let mensagem = descricao.substring(0, tamanhoAtualDescricao);
        if (descricaoMaiorQueLimite()) {
            mensagem += "..."
        }
        return mensagem;
    }

    const obterImagemComentario=()=>{
        return deveExibirSecaoParaComentar 
        ? imgComentarioAtivo 
        : imgComentarioCinza;
    }

    const comentar = async (comentario) =>{
       
       try{
        await feedService.adicionarComentario(id,comentario);
        setDeveExibirSecaoParaComentar(false);
        setComentariosPostagem([
            ...comentariosPostagem,
            {
                nome:usuarioLogado.nome,
                mensagem: comentario
            }
        ])
       
       }catch(e){
        alert('erro ao fazer comentario'+(e?.response?.data?.erro || ''));
       }
    }
    const usuarioLogadoCurtiuPostagem = () =>{
        return curtidasPostagem.includes(usuarioLogado.id);
    }

    const alterarCurtida = async() => {
        try{
            await feedService.alterarCurtida(id);
            
            if(usuarioLogadoCurtiuPostagem()){
                //se curtiu tiro da lista de curtidas
                setCurtidasPostagem(
                    curtidasPostagem.filter(idUsuarioQueCurtiu => idUsuarioQueCurtiu !== usuarioLogado.id )
                );
            }else{
                // adiciona na lista de curtidas
                setCurtidasPostagem([
                    ...curtidasPostagem,
                    usuarioLogado.id
                ]);
            }
        }catch(e){
            alert('erro ao curtir/descurtir'+(e?.response?.data?.erro || ''));
        }
    }
    const obterImagemCurtida = () =>{
       return usuarioLogadoCurtiuPostagem() 
       ? imgCurtido
       : imgCurtir
    }


    //console.log('postagem dados usuario:',usuario)
    return (
        <div className="postagem">
            <Link href={`/perfil/${usuario.id}`}>
                <section className="cabecalhoPostagem">
                    <Avatar src={usuario.avatar} />
                    <strong>{usuario.nome}</strong>
                </section>

            </Link>
            <div className="fotoPostagem">
                <img src={fotoDoPost} alt="foto da Postagem" />
            </div>
            <div className="rodapePostagem">
                <div className="acoesPostagem">
                    <Image
                        src={obterImagemCurtida()}
                        alt='icone curtir'
                        width={20}
                        height={20}
                        onClick={alterarCurtida}
                    />
                    <Image
                        src={obterImagemComentario()}
                        alt='icone comentar'
                        width={20}
                        height={20}
                        onClick={() => setDeveExibirSecaoParaComentar(!deveExibirSecaoParaComentar)}
                    />
                    <span className="quantidadeCurtidas">
                        Curtido por <strong> {curtidasPostagem.length} pessoas</strong>
                    </span>

                </div>
                <div className="descricaoPostagem">
                    <strong className="nomeUsuario">{usuario.nome}</strong>
                    <p className="descricao">
                        {obterDescricao()}
                        {descricaoMaiorQueLimite() && (
                            <span
                                onClick={exibirDescricaoCompleta}
                                className="exibirDescricaoCompleta">
                                mais
                            </span>
                        )}
                    </p>
                </div>
                <div className="comentariosPublicacao">
                    {comentariosPostagem.map((comentario, i) => (
                        <div className="comentario" key={i} >
                            <strong className="nomeUsuario">{comentario.nome}</strong>
                            <p className="descricao">{comentario.mensagem}</p>
                        </div>

                    ))}
                </div>

            </div>
            {deveExibirSecaoParaComentar &&
            <FazerComentario
            comentar={comentar} 
            usuarioLogado={usuarioLogado}
            />

            }
        </div>

    )
}