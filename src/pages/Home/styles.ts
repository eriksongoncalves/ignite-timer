import styled, { css } from 'styled-components'

export const Container = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${theme.gray100};
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;
  `}
`

export const CountdownContainer = styled.div`
  ${({ theme }) => css`
    font-family: 'Roboto Mono', monospace;
    font-size: 10rem;
    line-height: 8rem;
    color: ${theme.gray100};
    display: flex;
    gap: 1rem;

    span {
      background: ${theme.gray700};
      padding: 2rem 1rem;
      border-radius: 8px;
    }
  `}
`
export const Separator = styled.div`
  ${({ theme }) => css`
    padding: 2rem 0;
    color: ${theme.green500};
    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
  `}
`

const BaseInput = styled.input`
  ${({ theme }) => css`
    background: transparent;
    height: 2.5rem;
    border: 0;
    border-bottom: 2px solid ${theme.gray500};
    font-weight: bold;
    font-size: 1.125rem;
    padding: 0 0.5rem;
    color: ${theme.gray100};

    &:focus {
      box-shadow: none;
      border-color: ${theme.green500};
    }

    &::placeholder {
      color: ${theme.gray500};
    }
  `}
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`

export const BaseCountdownButton = styled.button`
  ${({ theme }) => css`
    width: 100%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: bold;
    cursor: pointer;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  `}
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  ${({ theme }) => css`
    background: ${theme.green500};
    color: ${theme.gray100};

    &:not(:disabled):hover {
      background: ${theme.green700};
    }
  `}
`

export const StopCountdownButton = styled(BaseCountdownButton)`
  ${({ theme }) => css`
    background: ${theme.red500};

    &:not(:disabled):hover {
      background: ${theme.red700};
    }
  `}
`
