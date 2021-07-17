import { createGlobalStyle } from "styled-components";

// 會是輸出成元件 所以照雙駝峰式命名
export const GlobalStyle = createGlobalStyle`
    :root {
        --maxWidth: 1280px;
        --white: #fff;
        --lightGrey: #eee;
        --darkGrey: #1c1c1c;
        --medGrey: #787878;
        --fontSuperBig: 2.5rem;
        --fontBig: 1.5rem;
        --fontSmall: 1rem;
    }

    * {
        box-sizing: border-box;
        font-family: 'Abel', sans-serif;
        margin: 0;
        padding: 0;
    }

    body {
        margin: 0;
        padding: 0;

        h1 {
            font-size: 2rem;
            font-weight: 600;
            color: var(--white);
            margin: 10px 0;
        }

        h3 {
            font-size: 1.1rem;
            font-weight: 600;
            margin: 10px 0;
        }

        p {
            font-size: 1rem;
            color: var(--white);
            margin: 10px 0;
        }
    }
`