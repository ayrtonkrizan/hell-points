import styled, { createGlobalStyle } from "styled-components";

export default styled.div`
    display:block;
    overflow: hidden;
    
    > .content {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        min-height: 100vh;
        max-width: 100vw;
        min-width: 300px;
        transition: all 0.5s;
        padding-bottom:50px;
    }
    >.closed-menu {
        margin-left:300px;
    }
`

export const GlobalStyle = createGlobalStyle`
    * {
        margin:0;
        padding:0;
        box-sizing: border-box;
    }

    a:link {
        text-decoration: none;
        color:inherit;
    }

    a:visited {
        text-decoration: none;
        color:inherit;
    }

    .pointer{
        cursor: pointer;
    }

    *:focus {
        outline: none;
    }

    ul {
        list-style:none
    }

    .no-print {
        @media print {
            display: none
        }
    }
`