import Image from 'next/image';
import Navegacao from '../layout/Navegacao'
import ResultadoPesquisa from '../layout/ResultadoPesquisa'
import logoHorizontalImg from '../../public/imagens/logoHorizontal.svg'
import imagemLupa from '../../public/imagens/lupa.svg'
import { useState } from 'react';

export default function Cabecalho() {
    const [resultadoPesquisa, setResultoPesquisa] = useState([]);
    const [termoPesquisado, setTermoPesquisado] = useState('');

    const aoPesquisar = (e) => {
        setTermoPesquisado(e.target.value);
        setResultoPesquisa([]);
        if (termoPesquisado.length < 3) {
            return
        }
        setResultoPesquisa([
            {
                avatar: '',
                nome: 'teste',
                email: 'teste@t.com',
                _id: 123,
            },
            {
                avatar: '',
                nome: 'teste2',
                email: 'teste2@t.com',
                _id: 1232,
            },
            {
                avatar: '',
                nome: 'teste3',
                email: 'teste3@t.com',
                _id: 1233,
            }
        ])
    }

    const aoClicarResultadoPesquisa = (id) => {
        console.log('aoClicarResultadoPesquisa', { id })
    }

    return (
        <header className='cabecalhoPrincipal'>
            <div className='conteudoCabecalhoPrincipal'>
                <div className='logoCabecalhoPrincipal'>
                    <Image
                        src={logoHorizontalImg}
                        alt='Logo devagram'
                        layout='fill'
                    />
                </div>

                <div className='barraPesquisa'>
                    <div className='containerImagemLupa'>
                        <Image
                            src={imagemLupa}
                            alt='Ícone lupa'
                            layout='fill'
                        />
                    </div>
                    <input
                        type='text'
                        placeholder='Pesquisar'
                        value={termoPesquisado}
                        onChange={aoPesquisar}
                    />


                </div>
                <Navegacao className='desktop' />
            </div>
            {resultadoPesquisa.length > 0 && (
                <div className='resultadoPesquisaContainer'>
                    {resultadoPesquisa.map(r => (
                        <ResultadoPesquisa
                            avatar={r.avatar}
                            nome={r.nome}
                            email={r.email}
                            key={r._id}
                            id={r._id}
                            onClick={aoClicarResultadoPesquisa}
                        />
                    ))}
                </div>
            )}
        </header>
    );

}