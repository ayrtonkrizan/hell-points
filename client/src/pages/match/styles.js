import styled from "styled-components";
import ListMUI from '@material-ui/core/List';

export const List = styled(ListMUI)`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;

    .item {
        margin: ${({theme})=>theme.spacing(1)}px
    }
`