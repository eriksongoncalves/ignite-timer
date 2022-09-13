import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      display: flex;
      gap: 1rem;

      a {
        width: 4rem;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${theme.gray100};
        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent;

        &:hover {
          border-bottom: 3px solid ${theme.green500};
        }

        &.active {
          color: ${theme.green500};
        }
      }
    }
  `}
`
