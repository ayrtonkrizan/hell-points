import styled from "styled-components";

export const Container = styled.div`
    align-items: center;
    display: flex;
    flex:1;
    justify-content: center;

    form {
        display:flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 350px;
        height: 400px;
        padding:${({ theme }) => theme.spacing(2)}px;
    }

    .fields {
        display: flex;
        flex-direction: column;
        padding: ${({ theme }) => theme.spacing(1)}px 0;
        >div{
            margin-bottom: ${({ theme }) => theme.spacing(1)}px;
        }
    }

    .buttons{
        display: flex;
        flex-direction: column;
    }

    .link {
        padding: ${({ theme }) => theme.spacing(1)}px;
        cursor: pointer;

        &:hover {
            opacity: 0.7
        }
    }
`