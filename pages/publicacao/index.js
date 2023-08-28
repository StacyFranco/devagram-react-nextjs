import { useState } from "react"
import { useRouter } from "next/router"

import comAutorizacao from "../../hoc/comAutorizacao"
import CabecalhoComAcoes from "../../componentes/cabecalhoComAcoes"
import Botao from '../../componentes/botao'
import UploadImagem from '../../componentes/uploadImagem'
import FeedService from '../../services/FeedService'

import imagemPublicacao from '../../public/imagens/imagemPublicacao.svg'
import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg'

const limiteDaDescricao = 255;
const descricaoMinima = 3;
const feedService = new FeedService();

function Publicacao() {
    const [imagem, setImagem] = useState();
    const [inputImagem, setInputImagem] = useState();
    const [etapaAtual, setEtapaAtual] = useState(1);
    const [descricao, setDescricao] = useState('');
    const router = useRouter();

    const estaNaEtapaUm = () => etapaAtual === 1;

    const obterTextoEsquerdoCabecalho = () => {

        if (estaNaEtapaUm && imagem) {
            return "Cancelar"
        }
        return "";
    }
    const obterTextoDireitaCabecalho = () => {
        if (!imagem) {
            return '';
        }

        if (estaNaEtapaUm()) {
            return "Avançar";
        }
        return "Compartilhar";
    }

    const aoClicarAcaoEsquerdaCabecalho = () => {
        if (estaNaEtapaUm()) {
            setImagem(null);
            inputImagem.value = null;
            return;
        }
        setEtapaAtual(1);
    }
    const aoClicarAcaoDireitaCabecalho = () => {
        if (estaNaEtapaUm()) {
            setEtapaAtual(2);
            return;
        }
        publicar();
    }

    const obterClassNameCabecalho = () => {
        if (estaNaEtapaUm()) {
            return "primeiraEtapa";
        }
        return "segundaEtapa";
    }

    const validarFormulario = () => {
        return (
            descricao.length >= descricaoMinima
            && imagem?.arquivo)
            ;
    }

    const publicar = async () => {
        try {
            if (!validarFormulario()) {
                alert('A descrição precisa de no mínimo 3 caracteres, e a imagem precisa estar selecionada!');
                return;
            }

            const corpoPublicacao = new FormData();
            corpoPublicacao.append('descricao', descricao);
            corpoPublicacao.append('file', imagem.arquivo)

            await feedService.fazerPublicacao(corpoPublicacao);

            router.push('/');
        } catch (error) {
            alert('Erro ao salvar publicação')
        }
    }

    return (
        <div className="paginaPublicacao largura30pctDescktop">
            <CabecalhoComAcoes
                className={obterClassNameCabecalho()}
                titulo={"Nova Publicação"}
                iconeEsquerda={estaNaEtapaUm() ? null : imgSetaEsquerda}
                textoEsquerda={obterTextoEsquerdoCabecalho()}
                aoClicarAcaoEsquerda={aoClicarAcaoEsquerdaCabecalho}
                elementoDireita={obterTextoDireitaCabecalho()}
                aoClicarAcaoDireita={aoClicarAcaoDireitaCabecalho}
            />
            <hr className="linhaDivisoria" />

            <div className="conteudoPaginaPublicacao">
                {estaNaEtapaUm()
                    ? (
                        <div className="primeiraEtapa">
                            <UploadImagem
                                setImagem={setImagem}
                                imagemPreview={imagem?.preview || imagemPublicacao.src}
                                imagemPreviewClassName={imagem ? 'previewImagemSelecionada' : 'previewImagemPublicacao'}
                                aoSetarAReferencia={setInputImagem}
                            />
                            <span className="desktop textoDragAndDrop">
                                Arraste sua foto aqui!
                            </span>
                            <Botao
                                texto={'Selecionar uma Imagem'}
                                manipularClick={() => inputImagem?.click()}
                            />

                        </div>
                    ) : (
                        <>
                            <div className="segundaEtapa">
                                <UploadImagem
                                    setImagem={setImagem}
                                    imagemPreview={imagem?.preview}
                                    imagemPreviewClassName={'previewImagemSelecionada'}
                                />
                                <textarea
                                    rows={4}
                                    value={descricao}
                                    placeholder="Escreva uma legenda..."
                                    onChange={e => setDescricao(e.target.value)}
                                >

                                </textarea>
                            </div>
                            <hr className="linhaDivisoria" />

                        </>
                    )
                }
            </div>



        </div>
    );
};

export default comAutorizacao(Publicacao);