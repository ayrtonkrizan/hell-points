import styled from "styled-components";
import {
    Paper,
    List as ListMUI
} from '@material-ui/core';

export const List = styled(ListMUI)`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;

    .item {
        margin: ${({theme})=>theme.spacing(1)}px
    }
`

export const Container = styled(Paper)`
    width: 100%;
    min-height: 80vh;
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 8px;
`

export const GameContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    padding: 8px;

    .column {
        padding: 8px;

        .slider{
            margin-top: 32px;
        }

        li {
            margin: 8px 0;
        }

        .buttons-container{
            display: flex;
            justify-content: space-evenly;
        }
    }
`