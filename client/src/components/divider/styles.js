import styled from "styled-components";
import DividerMUI from '@material-ui/core/Divider';

export const Divider = styled(DividerMUI)`
    background-color: ${({ theme }) => theme.palette.primary.main};
    margin-top: ${({ theme }) => theme.spacing(1) / 2}px;
    margin-bottom: ${({ theme }) => theme.spacing(1) / 2}px;
`