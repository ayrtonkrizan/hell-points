import styled from "styled-components";
import {
    Card as CardMUI,
} from "@material-ui/core";

export const Card = styled(CardMUI)`
    position: relative;
    width: 175px;
    height: 275px;
    padding: ${({ theme }) => theme.spacing(1.5)}px;
    margin: ${({ theme }) => theme.spacing(1)}px;
    flex: 0 0 auto;
    
    .media {
        padding-top: 75%;
        background-size: contain;
    }

    .description {
        margin-top: ${({ theme }) => theme.spacing(1)}px;
        height: 3.5rem;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }

    .divider {
        margin-top: ${({ theme }) => theme.spacing(1)}px;
    }

    .actions {
        padding: 0;
        justify-content: space-between;

        >h5{
            font-weight: 500;
        }
    }

    .favorite-icon {
        position: absolute;
        right: 0;
        top: 0;
    }

`
export const CartCard = styled(CardMUI)`
    display: grid;
    grid-template-columns: 120px 1fr 10px 50px;
    height: 120px;
    padding: ${({ theme }) => theme.spacing(1.5)}px;
    margin: ${({ theme }) => theme.spacing(1)}px;
    flex: 0 0 auto;
    
    .media {
        padding-top: 75%;
        background-size: contain;
    }

    .description {
        margin-top: ${({ theme }) => theme.spacing(1)}px;
        text-overflow: ellipsis;
    }

    .divider {
        margin-top: ${({ theme }) => theme.spacing(1)}px;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .actions {
        padding: 0;
        align-items:center;
        justify-content: space-between;
        flex-direction: column;

        >h5{
            font-weight: 500;
            margin:0;
        }
        >button{
            margin:0;
            padding: ${({ theme }) => theme.spacing(1)}px;
        }
    }

`
