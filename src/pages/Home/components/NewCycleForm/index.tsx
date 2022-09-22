import { useFormContext } from 'react-hook-form'
import { useCycleContext } from '../../../../contexts/Cycle'
import * as S from './styles'

export function NewCycleForm() {
  const { activeCycle } = useCycleContext()
  const { register } = useFormContext()

  return (
    <S.FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <S.TaskInput
        {...register('task')}
        id="task"
        list="taskSuggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
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
        disabled={!!activeCycle}
      />

      <span>minutos.</span>
    </S.FormContainer>
  )
}
