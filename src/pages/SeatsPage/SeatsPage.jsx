import styled, { css } from "styled-components";
import axios from "axios";
import { useState } from "react"
import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";


export default function SeatsPage(props) {

    const {SetSucess} = props;

    const [seats, SetSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [nome, SetNome] = useState("");
    const [cpf, SetCpf] = useState("");
    const [nomeAssento, SetNomeAssento] = useState([]);
    const parametros = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const url = (`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametros.idSessao}/seats`);
        const promise = axios.get(url);
        promise.then(resposta => SetSeats(resposta.data));
        promise.catch(error => console.log(error.response.data));
    }, []);

    const handleSeatClick = (seatId, isAvailable, seatName) => {
        if (!isAvailable) {
            alert('Esse assento não está disponível');
            return;
        }

        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seatId)) {
                const updatedSeats = prevSelectedSeats.filter((id) => id !== seatId);
                console.log("IDs dos assentos selecionados:", updatedSeats);
                return updatedSeats;
            } else {
                const updatedSeats = [...prevSelectedSeats, seatId];
                console.log("IDs dos assentos selecionados:", updatedSeats);
                return updatedSeats;
            }
        });

        SetNomeAssento((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seatName)) {
                const updatedSeats = prevSelectedSeats.filter((name) => name !== seatName);
                console.log("Nome dos assentos selecionados:", updatedSeats);
                return updatedSeats;
            } else {
                const updatedSeats = [...prevSelectedSeats, seatName];
                console.log("Nome dos assentos selecionados:", updatedSeats);
                return updatedSeats;
            }
        });
    };
    function enviarpedido(e) {
        e.preventDefault();

        const url = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";

        const data = {
            ids: selectedSeats,
            name: nome,
            cpf: cpf,
        };

        const info={
            nomes: nomeAssento,
            name: nome,
            cpf: cpf,
            nomeDoFilme: seats.movie.title,
            horario:  seats.name,
            data: seats.day.date
        }

        console.log(data);
        axios.post(url, data)
            .then((response) => {
                console.log("Reserva realizada com sucesso:", response.data);
                SetSucess({...info});
                navigate(`/sucesso`);
            })
            .catch((error) => {
                console.log("Erro ao fazer reserva:", error);
            });
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.seats &&
                    seats.seats.map((seat) => (
                        <SeatItem
                            key={seat.id}
                            isAvailable={seat.isAvailable}
                            isSelected={selectedSeats.includes(seat.id)}
                            onClick={() => handleSeatClick(seat.id, seat.isAvailable, seat.name)}
                            data-test="seat"
                        >
                            {seat.name}
                        </SeatItem>
                    ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle1 />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle2 />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle3 />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={enviarpedido}>
                <label htmlFor="nome">Nome do Comprador:</label>
                <input data-test="client-name" type="text" required id="nome" value={nome} onChange={e => SetNome(e.target.value)} placeholder="Digite seu nome..." />

                <label htmlFor="cpf">CPF do Comprador:</label>
                <input data-test="client-cpf" type="number" required id="cpf" value={cpf} onChange={e => SetCpf(e.target.value)} placeholder="Digite seu CPF..." />

                <button data-test="book-seat-btn" type="submit">Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={seats.movie && seats.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{seats.movie && seats.movie.title}</p>
                    <p>{seats.day && seats.day.weekday + " - " + seats.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: 98%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
        width: 225px;
        height: 42px;
        left: 72px;
        top: 688px;
        background: #E8833A;
        border-radius: 3px;
        border: none;
        margin-bottom: 30px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.04em;
        color: #FFFFFF;

    }
    input {
        width: 90%;
        height: 51px;
        left: 24px;
        top: 497px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 3px;
        margin-left: 16px;
        margin-bottom: 30px;
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
    }
    label{
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        color: #293845;
        margin-left: 16px;
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle1 = styled.div`
    border: 1px solid #0E7D71;
    background-color: #1AAE9E;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionCircle2 = styled.div`
    border: 1px solid blue;
    background-color: lightblue;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionCircle3 = styled.div`
    border: 1px solid #F7C52B;
    background-color: #FBE192;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
  cursor: pointer;
    ${({ isAvailable }) =>
        isAvailable
            ? css`
          border: 1px solid blue;
          background-color: lightblue;
          font-family: 'Roboto';
          font-size: 11px;
        `
            : css`
          border: 1px solid #F7C52B;
          background-color: #FBE192;
          font-family: 'Roboto';
          font-size: 11px;
        `}
    ${({ isSelected }) =>
        isSelected &&
        css`
        border: 1px solid #0e7d71;
        background-color: #1aae9e;
    `}
`;

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`