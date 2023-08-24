import { useEffect } from "react";
import { useState } from "react";
import Postagem from './Postagem';
import FeedService from '../../services/FeedService'

const feedService = new FeedService();

export default function feed({ usuarioLogado }) {
    const [listaDePostagens, setListaDePostagens] = useState([]);

    // Para conseguir pegar as postagens que são async no useEffect tive que criar a função enquanto antes podia colocar o async direto no useEffct
    const pegarPostagens= async()=>{
             const {data} = await feedService.carregarPostagens();
             console.log("data:",data)
             
             const postagensFormatadas = data.map((postagem)=>(
                 {
                     id: postagem._id,
                     usuario: {
                         id: postagem.userId,
                         avatar: postagem.usuario.avatar,
                         nome:postagem.usuario.nome,
                     },
                     fotoDoPost:postagem.foto,
                     descricao: postagem.descricao,
                     Curtidas: postagem.likes,
                     comentarios:postagem.comentarios.map(c=>({
                         nome: c.nome,
                         mensagem: c.comentario
                     })) 
                 }
             ));
             setListaDePostagens(postagensFormatadas)
        }
        
   
    useEffect( () => {
        pegarPostagens();
        
        
       }, [usuarioLogado])
    return (

        <div className="feedContainer largura30pctDescktop">
            {listaDePostagens.map(dadosPostagem => (
                <Postagem key={dadosPostagem.id} {...dadosPostagem}
                usuarioLogado={usuarioLogado} />
            ))}
        </div>
    )
}