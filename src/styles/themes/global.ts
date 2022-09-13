import { createGlobalStyle, css } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    &::before,
    &::after {
      box-sizing: inherit;
    }
  }

  ${({ theme }) => css`
    :focus {
      outline: 0;
      box-shadow: 0 0 0 2px ${theme.green500};
    }

    body {
      background: ${theme.gray900};
      color: ${theme.gray300};
    }

    body,
    input,
    textarea,
    button {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 1.6rem;
    }
  `}  
`
