import styled, { css } from "styled-components";
import axios from "axios";
import { useState } from "react"
import { useEffect } from "react";
import { useParams } from "react-router-dom"


export default function SeatsPage() {

    const [seats, SetSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const parametros = useParams();
    // console.log(parametros.idSessao);

    useEffect(() => {
        const url = (`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametros.idSessao}/seats`);
        const promise = axios.get(url);
        promise.then(resposta => SetSeats(resposta.data));
        promise.catch(error => console.log(error.response.data));
    }, [])

    const handleSeatClick = (seatId) => {
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
    };




    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.seats && seats.seats.map((seat) => (
                    <SeatItem
                        key={seat.id}
                        isAvailable={seat.isAvailable}
                        isSelected={selectedSeats.includes(seat.id)}
                        onClick={() => handleSeatClick(seat.id)}
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

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
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
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
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