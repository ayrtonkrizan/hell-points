import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledTheme } from "styled-components";
import App from './App';
import { GlobalStyle } from "./globalCSS";
import theme from './theme';

ReactDOM.render(
  <>
    <CssBaseline />
    <StyledTheme theme={theme}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </StyledTheme>
  </>,
  document.getElementById('root')
);