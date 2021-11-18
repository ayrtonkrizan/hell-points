import styled from "styled-components";
import Paper from "@material-ui/core/Paper";

export const Container = styled(Paper)`
    display: flex;
    flex-direction: column;    
    width: 50vw;
    height: 80vh;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    position: absolute;
    border: 0;
    border-left: 5px solid ${({ theme }) => theme.palette.primary.main};
    
    &:focus {
        outline:none;
    }

    .header {
        display: flex;
        align-items: center;
        height: 50px;
        border-bottom: 1px solid ${({ theme }) => theme.palette.primary.main};
        padding-left: ${({ theme }) => theme.spacing(1)}px;
        box-shadow: ${({ theme }) => theme.shadows[1]};

        .title {
            flex: 1;
        }
    }

    .content {
        flex:1;
        overflow-y: auto;
        padding: ${({ theme }) => theme.spacing(1)}px;
    }

    .footer {
        max-height: 50px;
        box-shadow: ${({ theme }) => theme.shadows[1]};
        padding: ${({ theme }) => theme.spacing(1)}px;
    }
`