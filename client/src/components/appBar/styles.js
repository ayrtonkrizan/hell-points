import styled from "styled-components";
import AppBar from '@material-ui/core/AppBar';
import Paper from "@material-ui/core/Paper";

export default styled(AppBar)`
    z-index: ${({ theme }) => theme.zIndex.drawer + 1};

    a {
        flex-grow: 0;
    }

    .actions-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .toolbar{
        justify-content: space-between;
    }
`

export const SearchContainer = styled(Paper)`
    border-radius: 16px;
    padding: 0 16px;
    margin-left: 8px;
    .search-input {
        width: 600px;

        @media (max-width: 480px) {
            width:100%;
        }
    }
`

export const PopperContainer = styled(Paper)`
    width: 624px;
    padding: 8px;
    margin-top: 8px;
    max-height: 80vh;
    overflow-y: auto;

    @media (max-width: 480px) {
        width:100%;
    }
`