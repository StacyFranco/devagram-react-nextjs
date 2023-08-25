import { useEffect } from "react";
import { useState } from "react";
import Postagem from './Postagem';
import FeedService from '../../services/FeedService'
import UsuarioService from "@/services/UsuarioService";

const feedService = new FeedService();

export default function feed({ usuarioLogado, usuario }) {
    const [listaDePostagens, setListaDePostagens] = useState([]);
    
    // Para conseguir pegar as postagens que são async no useEffect tive que criar a função enquanto antes podia colocar o async direto no useEffct
    const pegarPostagens = async () => {
        setListaDePostagens([]);

        const { data } = await feedService.carregarPostagens(usuario?._id);
        // inicialmente o feed por id não tem informação do usuario então tenho que fazer o if para pegar... 
        //mas esta com problemas nem sempre funciona.. acho que é quando ele demora para pegar o valor do id e dai carrega o outro feed

        if (data.length>0){
            const postagensFormatadas = data.map((postagem) => (
                {
                    id: postagem._id,
                    usuario: {
                        id: postagem.idUsuario,
                        avatar: postagem?.usuario?.avatar || usuario?.avatar,
                        nome: postagem?.usuario?.nome || usuario?.nome,
                    },
                    fotoDoPost: postagem.foto,
                    descricao: postagem.descricao,
                    curtidas: postagem.likes,
                    comentarios: postagem.comentarios.map(c => ({
                        nome: c.nome,
                        mensagem: c.comentario
                    }))
                }
            ));
            setListaDePostagens(postagensFormatadas);
        }else{setListaDePostagens([])}
       
       
    }


    useEffect(() => {
        
        console.log('chegou no feed, comid?',usuario?._id);
        pegarPostagens();
        console.log('qual postagem chegou?', listaDePostagens);

    }, [usuarioLogado, usuario]);//, teste]);
    if (!listaDePostagens.length) {
        return null;
    }
    return (

        <div className="feedContainer largura30pctDescktop">

            {listaDePostagens.map(dadosPostagem => (
                <Postagem
                    key={dadosPostagem.id}
                    {...dadosPostagem}
                    usuarioLogado={usuarioLogado}
                />
            ))}

        </div>
    )
}