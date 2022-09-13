import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    max-width: 1120px;
    height: calc(100vh - 16rem);
    margin: 8rem auto;
    padding: 4.5rem;
    background-color: ${theme.gray800};
    display: flex;
    flex-direction: column;
  `}
`
