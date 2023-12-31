import Image from "next/image";



export default function CabecalhoComAcoes ({
    className,
    iconeEsquerda,
    textoEsquerda =null,
    aoClicarAcaoEsquerda,
    titulo,
    elementoDireita,
    aoClicarAcaoDireita
}){
    return(
        <div className={`cabecalhoComAcoes ${className}`}>
            {iconeEsquerda ? (
                <Image
                    src = {iconeEsquerda}
                    alt = 'ícone esquerda cabeçalho ações'
                    onClick={aoClicarAcaoEsquerda}
                    width={25}
                    height={25}
                />
            ):(
                textoEsquerda!==null && (
                <span 
                onClick={aoClicarAcaoEsquerda}
                className="cabecalhoComAcoesTextoEsquerda"
                >
                    {textoEsquerda}
                    </span>
                )
            )}
             <h3>{titulo}</h3>
            {elementoDireita && (
            <button 
             type="button"
             className="btnAcaoDireita"
             onClick={aoClicarAcaoDireita}
             >
                {elementoDireita}
             </button>)}
        </div>
    )
}