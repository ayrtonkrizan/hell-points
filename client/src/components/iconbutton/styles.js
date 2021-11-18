import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import CircularProgress from '@material-ui/core/CircularProgress';

export const StyledFab = styled(Fab)`
    position: fixed !important;
    right: ${({theme})=>theme.spacing(1)}px;
    bottom: ${({theme})=>theme.spacing(1)}px;
`

export const StyledCircular = styled(CircularProgress)`
    position: absolute;
    z-index: 1;
`