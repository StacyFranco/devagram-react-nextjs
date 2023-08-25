import Image from 'next/image';
import Navegacao from '../layout/Navegacao'
import ResultadoPesquisa from '../layout/ResultadoPesquisa'
import logoHorizontalImg from '../../public/imagens/logoHorizontal.svg'
import imagemLupa from '../../public/imagens/lupa.svg'
import { useState } from 'react';
import UsuarioService from '../../services/UsuarioService';
import { useRouter } from 'next/router';

const usuarioService = new UsuarioService();

export default function Cabecalho() {
    const [resultadoPesquisa, setResultoPesquisa] = useState([]);
    const [termoPesquisado, setTermoPesquisado] = useState('');
    const router = useRouter();

    let cabecalhoClassName = '';
    if(window && window.location.pathname !== '/'){
        cabecalhoClassName= 'desktop';
    }

    const aoPesquisar = async (e) => {
        setTermoPesquisado(e.target.value);
        setResultoPesquisa([]);
        if (termoPesquisado.length < 2) {
            return
        }

        try{
            const {data} = await usuarioService.pesquisar(termoPesquisado)
            setResultoPesquisa(data);
            
        }catch(error){
            alert("Erro ao pesquisar usuario" + error?.response?.data?.erro)
        }
    }

    const aoClicarResultadoPesquisa = (id) => {
        setResultoPesquisa([]);
        setTermoPesquisado('');
        router.push(`/perfil/${id}`);
    }

    const redirecionarParaHome = () =>{
      router.push('/');  
    }

    return (
        <header className={`cabecalhoPrincipal ${cabecalhoClassName}`}>
            <div className='conteudoCabecalhoPrincipal'>
                <div className='logoCabecalhoPrincipal'>
                    <Image
                    onClick={redirecionarParaHome}
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