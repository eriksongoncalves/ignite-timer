import { Play } from 'phosphor-react'

import * as S from './styles'

export function Home() {
  return (
    <S.Container>
      <form>
        <S.FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <S.TaskInput id="task" placeholder="Dê um nome para o seu projeto" />

          <label htmlFor="minutesAmount">durante</label>
          <S.MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
          />

          <span>minutos.</span>
        </S.FormContainer>

        <S.CountdownContainer>
          <span>0</span>
          <span>0</span>
          <S.Separator>:</S.Separator>
          <span>0</span>
          <span>0</span>
        </S.CountdownContainer>

        <S.StartCountdownButton disabled type="submit">
          <Play size={24} />
          Começar
        </S.StartCountdownButton>
      </form>
    </S.Container>
  )
}
