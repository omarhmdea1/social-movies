import { createGlobalStyle } from "styled-components";

import { BREAKPOINTS } from "./constants/responsive-breakpoints";

const GlobalStyles = createGlobalStyle`
    /* === color Palette === */
    :root {
        --primary-color: #2374E1;
        --background-color: #18191A;
        --card-background-color: #242526;
        --element-background-color: rgba(255, 255, 255, 0.1);
        --text-color: #E4E6EB;
        --positive-color: #31A24C;
        --negative-color: #F0284A;
        --secondary-text-color: #B0B3B8;
        --washed-primary-color: rgba(45, 136, 255, 0.2);
        --washed-primary-color-rgb: #263951;
        --scrollbar-thumb-color: rgb(170,170,170);
        --scrollbar-thumb-hover-color: rgb(140,140,140);
        --scrollbar-background-color: var(--card-background-color);
        --border-radius: 10px;
        --card-shadow: 0px 1px 4px 0px rgba(0,0,0,0.2);
        --spacing-x1: 1rem;
        --spacing-x1-5: 1.5rem;
        --spacing-x2: 2rem;
        --spacing-x3: 3rem;
        --spacing-x4: 4rem;
        --spacing-x5: 5rem;
        --spacing-x6: 6rem;
        --font-weight-black: 800;
        --font-weight-bold: 700;
        --font-weight-medium: 600;
        --transition-time: 300ms;
    }

    #root {
        min-height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    html {
        font-size: 62.5%;
    }
    body, html {
        min-width: 100%;
        min-height: 100%;
        scroll-behavior: smooth;
    }
    *,
    *::before,
    *::after {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
    }
    body {
        color: var(--text-color);
        background-color: var(--background-color);
        font-family: Arial, Helvetica, sans-serif;
    }
    button {
        cursor: pointer;
        background-color: var(--primary-color);
        border: none;
    }
    input, textarea, *:focus {
        outline: none;
    }
    ul {
        list-style: none;
    }
    .material-icons-round {
        vertical-align: middle;
    }
    /* ===== Scrollbar ===== */
    * {
        scrollbar-width: auto;
        scrollbar-color: var(--scrollbar-thumb-color) var(--scrollbar-background-color);
    }
    *::-webkit-scrollbar {
        width: 14px;
    }
    *::-webkit-scrollbar-track {
        background: var(--scrollbar-background-color);
    }
    *::-webkit-scrollbar-thumb {
        background-color: var(--scrollbar-thumb-color);
        border-radius: 10px;
        border: 3px solid var(--scrollbar-background-color);
    }
    *::-webkit-scrollbar-thumb:hover {
        background-color: var(--scrollbar-thumb-hover-color);
    }   

    /* === Headers === */
    h1,
    .h1 {
        font-size: 3.6rem;
        font-weight: var(--font-weight-bold);
    }
    h2,
    .h2 {
        font-size: 3.2rem;
        font-weight: var(--font-weight-bold);
    }
    h3,
    .h3 {
        font-size: 3rem;
        font-weight: var(--font-weight-bold);
    }
    h4,
    .h4 {
        font-size: 2.6rem;
        font-weight: var(--font-weight-medium);
    }
    h5,
    .h5 {
        font-size: 2.4rem;
        font-weight: var(--font-weight-medium);
    }
    h6,
    .h6 {
        font-size: 2.0rem;
        font-weight: var(--font-weight-medium);
    }

    /* === Paragraph === */
    .p-large {
        font-size: 2.0rem;
        font-weight: var(--font-weight-regular);
    }
    p,
    .p {
        font-size: 1.8rem;
        font-weight: var(--font-weight-regular);
    }
    .p-small {
        font-size: 1.6rem;
        font-weight: var(--font-weight-regular);
    }

    /* === label === */
    label {
        color: var(--secondary-text-color);
        font-size: 1.6rem;
        font-weight: var(--font-weight-light);
    }
    ::placeholder {
        color: var(--secondary-text-color);
        font-size: inherit;
        font-weight: inherit;
        opacity: 1;
    }
    textarea {
        height: 130px;
        resize: none;
    }

     /* === Font Weights === */
     .black {
        font-weight: var(--font-weight-black);
    }
    .bold {
        font-weight: var(--font-weight-bold);
    }
    .medium {
        font-weight: var(--font-weight-medium);
    }
    .regular {
        font-weight: var(--font-weight-regular);
    }
    .light {
        font-weight: var(--font-weight-light);
    }
    .thin {
        font-weight: var(--font-weight-thin);
    }

    /* === anchor === */
    a {
        text-decoration: none;
        color: var(--text-color);
    }

    .clickable {
        transition: var(--transition-time);
    }
    
    .clickable:hover {
        filter: brightness(0.80);
    }

    /* === Animations === */
    @keyframes bounce-in {
		0% {
			transform: scale(0.2);
			opacity: 0;
		}
		40% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

     /*
    ====================================
        Responsive
    ====================================
    */
    @media ${BREAKPOINTS.smallScreensAndLaptops} {
        /* === Headers === */
        h1,
        .h1 {
            font-size: 3.4rem;
        }
        h2,
        .h2 {
            font-size: 3.0rem;
        }
        h3,
        .h3 {
            font-size: 2.8rem;
        }
        h4,
        .h4 {
            font-size: 2.4rem;
        }
        h5,
        .h5 {
            font-size: 2.2rem;
        }
        h6,
        .h6 {
            font-size: 1.8rem;
        }
    }
    @media ${BREAKPOINTS.iPadsAndTablets} {
        /* === Global === */
        :root {
            --spacing-x1: 1rem;
            --spacing-x1-5: 1rem;
            --spacing-x2: 1.5rem;
            --spacing-x3: 2rem;
            --spacing-x4: 2rem;
            --spacing-x5: 3rem;
            --spacing-x6: 4rem;
            --font-weight-bold: var(--font-weight-medium);
            --border-radius: 8px;
        }

        /* === Headers === */
        h1,
        .h1 {
            font-size: 2.8rem;
        }
        h2,
        .h2 {
            font-size: 2.4rem;
        }
        h3,
        .h3 {
            font-size: 2.0rem;
        }
        h4,
        .h4 {
            font-size: 1.8rem;
        }
        h5,
        .h5 {
            font-size: 1.8rem;
        }
        h6,
        .h6 {
            font-size: 1.6rem;
        }
        /* === Paragraph === */
        .p-large {
            font-size: 1.6rem;
        }
        p,
        .p {
            font-size: 1.4rem;
        }
        .p-small {
            font-size: 1.4rem;
        }
        /* === label === */
        label {
            font-size: 1.4rem;
        }
    }
`;

export default GlobalStyles;