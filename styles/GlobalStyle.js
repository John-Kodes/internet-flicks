import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 62.5%;
    }

    body {
        font-family: "Montserrat", sans-serif;
        box-sizing: border-box;
        background-color: ${(props) => props.theme.pageBg100};
        padding: 0 6rem;
        font-size: 1.4rem;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    * {
        box-sizing: inherit;
        padding: 0;
        margin: 0;
    }

`;

export default GlobalStyle;
