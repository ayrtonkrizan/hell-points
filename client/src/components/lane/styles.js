import styled from "styled-components";
import {
    Paper,
} from "@material-ui/core";

export const LaneContainer = styled(Paper)`
    margin: 8px;
    padding: 8px;
    
    .title-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    ul {
        display: flex;
        overflow-x: auto;
    }
`