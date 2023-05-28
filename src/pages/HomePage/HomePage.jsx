import styled from "styled-components"
import { useState } from "react"
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    const [filmes, SetFilmes] = useState([]);

    useEffect(() => {
        const URL = "https://mock-api.driven.com.br/api/v8/cineflex/movies";
        const promise = axios.get(URL);

        promise.then((response) => {
            console.log(response.data);
            SetFilmes(response.data);
        })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {filmes.map((filme) => (
                    <Link key={filme.id} to={`/sessoes/${filme.id}`}>
                        <MovieContainer>
                            <img src={filme.posterURL} alt="poster" />
                        </MovieContainer>
                    </Link>
                )
                )}
            </ListContainer>

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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    @media (width: 768px){
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
    }
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`
