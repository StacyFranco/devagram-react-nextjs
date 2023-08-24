import { useEffect } from "react";
import { useState } from "react";
import Postagem from './Postagem';

export default function feed({ usuarioLogado }) {
    const [listaDePostagens, setListaDePostagens] = useState([]);

    useEffect(() => {
        console.log('carregar o feed')
        setListaDePostagens([
            {
                id: '1',
                usuario: {
                    id: '2',
                    avatar: null,
                    nome: "teste bastante",
                },
                fotoDoPost: "data:image/jpeg;base64,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",
                descricao: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ',
                Curtidas: [],
                comentarios: [{
                    nome: 'Fulano',
                    mensagem: 'Muito Legal!'
                }],
            },
            {
                id: '2',
                usuario: {
                    id: '3',
                    avatar: null,
                    nome: "teste2",
                },
                fotoDoPost: "https://i.pinimg.com/236x/73/9f/84/739f84b67cdd22dac888a3fc5c6192d1.jpg",
                descricao: 'mulher lua magic what a beuriful picture!',
                Curtidas: [],
                comentarios: [
                    {
                        nome: 'Ciclano',
                        mensagem: 'Muito bom!'
                    },
                    {
                        nome: 'Mano z',
                        mensagem: 'Muito top!'
                    },
                    {
                        nome: 'Juliano',
                        mensagem: 'Muito bom mesmo!'
                    },
                ],
            },
        ])
    }, [usuarioLogado])
    return (

        <div className="feedContainer largura30pctDescktop">
            {listaDePostagens.map(dadosPostagem => (
                <Postagem key={dadosPostagem.id} {...dadosPostagem} />
            ))}
        </div>
    )
}