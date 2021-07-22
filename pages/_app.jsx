import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { AlurakutStyles } from '@/lib/AlurakutCommons';
import styles from '@/constants/styles';

const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  * {
    padding: 0;
    margin: 0;
    vertical-align: baseline;
    list-style: none;
    border: 0;
  }

  body {
    background: ${styles.BACKGROUND_SECONDARY};
    box-sizing: border-box;
    color: ${styles.GRAY_1};
    font-family: sans-serif;
    margin: 0;
    padding: 0;
    transition: all 0.5s;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`;

const theme = {
  color: {
    primary: 'black',
  },
};

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Component {...pageProps} />
      </>
    </ThemeProvider>
  );
}
