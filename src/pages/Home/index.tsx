import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import * as S from './styles'

type FormData = {
  task: string
  minutesAmount: number
}

export function Home() {
  const { handleSubmit, register, watch } = useForm<FormData>()

  const handleCreateNewCycle = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log('>>> ', data)
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <S.Container>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <S.FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <S.TaskInput
            {...register('task')}
            id="task"
            list="taskSuggestions"
            placeholder="Dê um nome para o seu projeto"
          />

          <datalist id="taskSuggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <S.MinutesAmountInput
            {...register('minutesAmount', { valueAsNumber: true })}
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
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

        <S.StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </S.StartCountdownButton>
      </form>
    </S.Container>
  )
}
