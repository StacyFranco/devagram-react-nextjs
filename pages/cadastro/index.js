import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import InputPublico from '../../componentes/inputPublico';
import Botao from '../../componentes/botao';
import UploadImagem from '../../componentes/uploadImagem';
import {validarSenha,validarEmail,validarNome,validarConfirmacaoSenha} from '../../utils/validadores';

import imagemLogo from '../../public/imagens/logo.svg';
import imagemUsuarioAtivo from '../../public/imagens/usuarioAtivo.svg';
import imagemEnvelope from '../../public/imagens/envelope.svg';
import imagemChave from '../../public/imagens/chave.svg';
import imagemAvatar from '../../public/imagens/avatar.svg';


export default function Cadastro() {
    const [imagem,setImagem] = useState(null);
    const [nome,setNome] = useState("");
    const [email,setEmail] = useState("");
    const [senha,setSenha] = useState("");
    const [confirmacaoSenha,setConfirmacaoSenha] = useState("");
    
    const validarFormulario = () =>{
        return(
            validarNome(nome) &&
            validarEmail(email) && 
            validarSenha(senha) &&
            validarConfirmacaoSenha(senha,confirmacaoSenha)

        );
    }

    return (
        <section className={"paginaCadastro paginaPublica"}>
            <div className="logoContainer desktop">
                <Image
                    src={imagemLogo}
                    alt='Logotipo'
                    layout='fill'
                    className='logo'
                />
            </div>


            <div className="conteudoPaginaPublica">
                <form>
                    <UploadImagem
                        imagemPreviewClassName = 'avatar avatarPreview'
                        setImagem={setImagem} 
                        imagemPreview= {imagem?.preview || imagemAvatar.src}
                        
                    />
                    <InputPublico
                        imagem={imagemUsuarioAtivo}
                        texto="Nome Completo"
                        tipo="text"
                        aoAlterarValor={e => setNome(e.target.value)}
                        valor={nome}
                        mensagemValidacao='O nome precisa de pelo menos 2 caracteres!'
                        exibirMensagemValidacao={nome && !validarNome(nome)}
                        
                    />
                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                        mensagemValidacao='O e-mail informado é inválido!'
                        exibirMensagemValidacao={email && !validarEmail(email)}

                    />
                    <InputPublico
                        imagem={imagemChave}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={e => setSenha(e.target.value)}
                        valor={senha}
                        mensagemValidacao='Precisa ter pelo menos 3 caracteres!'
                        exibirMensagemValidacao={senha && !validarSenha(senha)}
                    />
                    <InputPublico
                        imagem={imagemChave}
                        texto="Confirmar Senha"
                        tipo="password"
                        aoAlterarValor={e => setConfirmacaoSenha(e.target.value)}
                        valor={confirmacaoSenha}
                        mensagemValidacao='As senhas precisam ser iguais!'
                        exibirMensagemValidacao={confirmacaoSenha && !validarConfirmacaoSenha(senha,confirmacaoSenha)}
                    />
                    <Botao
                        texto="Cadastrar"
                        tipo="submit"
                        desabilitado={!validarFormulario()}
                    />
                </form>
                <div className='rodapePaginaPublica'>
                    <p>Já possui uma conta?</p>
                    <Link href="/" >Faça seu login agora!</Link>
                </div>
            </div>

        </section>
    )
}