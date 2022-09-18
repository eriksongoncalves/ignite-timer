import styled, { css, DefaultTheme } from 'styled-components'

export const Container = styled.main`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    padding: 3.5rem;

    h1 {
      font-size: 1.5rem;
      color: ${theme.gray100};
    }
  `}
`

export const HistoryList = styled.div`
  ${({ theme }) => css`
    overflow: auto;
    margin-top: 2rem;

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 600px;

      th {
        background-color: ${theme.gray600};
        padding: 1rem;
        text-align: left;
        color: ${theme.gray100};
        font-size: 0.875rem;
        line-height: 1.6;

        &:first-child {
          border-top-left-radius: 8px;
          padding-left: 1.5rem;
        }

        &:last-child {
          border-top-right-radius: 8px;
          padding-right: 1.5rem;
        }
      }

      td {
        background-color: ${theme.gray700};
        border-top: 4px solid ${theme.gray800};
        padding: 1rem;
        font-size: 0.875rem;
        line-height: 1.6;

        &:first-child {
          width: 50%;
          padding-left: 1.5rem;
        }

        &:last-child {
          padding-right: 1.5rem;
        }
      }
    }
  `}
`

type StatusProps = {
  statusColor: 'yellow' | 'red' | 'green'
}

const StatusModifiers = {
  yellow: (theme: DefaultTheme) => css`
    background: ${theme.yellow500};
  `,
  red: (theme: DefaultTheme) => css`
    background: ${theme.red500};
  `,
  green: (theme: DefaultTheme) => css`
    background: ${theme.green500};
  `
}

export const Status = styled.div<StatusProps>`
  ${({ theme, statusColor }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: '';
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 9999px;

      ${StatusModifiers[statusColor](theme)};
    }
  `}
`
