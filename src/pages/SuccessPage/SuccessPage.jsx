import styled from "styled-components"
import { Link, useParams } from "react-router-dom"

export default function SuccessPage(props) {

    const {sucess} = props;
    console.log(sucess);

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <strong><p>Filme e sessão</p></strong>
                <p>{sucess.nomeDoFilme}</p>
                <p>{sucess.data} - {sucess.horario}</p>
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>
                {sucess.nomes && sucess.nomes.map((nome)=>(
                    <p>Assento {nome}</p>
                ))}
            </TextContainer>

            <TextContainer>
                <strong><p>Comprador</p></strong>
                <p>Nome: {sucess.name}</p>
                <p>CPF: {sucess.cpf}</p>
            </TextContainer>

            <Link to={`/`}><button>Voltar para Home</button></Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
        width: 225px;
        height: 42px;
        left: 74px;
        top: 622px;
        background: #E8833A;
        border-radius: 3px;
        border: none;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        letter-spacing: 0.04em;
        color: #FFFFFF;
    }
    h1 {
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    line-height: 26px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`