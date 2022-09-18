import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import * as S from './styles'

const newCycleSchemaValidation = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O mínimo é de 5 minutos')
    .max(60, 'O máximo é de 5 minutos')
})

type FormData = zod.infer<typeof newCycleSchemaValidation>

export function Home() {
  const { handleSubmit, register, watch, reset } = useForm<FormData>({
    resolver: zodResolver(newCycleSchemaValidation),
    defaultValues: {
      task: '',
      minutesAmount: 5
    }
  })

  const handleCreateNewCycle = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log('>>> ', data)
    reset()
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
