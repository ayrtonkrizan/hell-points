import styled from "styled-components";
import AccordionMUI from "@material-ui/core/Accordion";

export const TableContainer = styled.table`
width: 100%;
margin-top: 8px;

img {
    width: 75px;

    @media (max-width: 600px) {
        display:none
    }
}


`

export const Accordion = styled(AccordionMUI)`
.MuiAccordionDetails-root{
    flex-direction: column;
}
.MuiAccordionSummary-content{
    justify-content: space-between;
    align-items: center;
}

`

export const ActionsContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: flex-end;
    &>*{
        margin-left: 8px;
    }
`