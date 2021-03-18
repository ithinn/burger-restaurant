import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        box-sizing: border-box;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        width: 100%;
        height: 100%;
    }

    body {
        background-color: #d1d1d1;
    }

    main {
        
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        
    }

    section {
        width: 96%;
    }

    h1 {
        font-size: 3rem;
    }

    h2 {
        text-align: center;
        font-family: "gastromond";
        

    }

    h3 {
        font-family: "expo-serif-pro";
    }

    p {
        font-family: "expo-serif-pro"
    }

    label  {
        font-family: "expo-serif-pro"
    }

`

export default GlobalStyle;