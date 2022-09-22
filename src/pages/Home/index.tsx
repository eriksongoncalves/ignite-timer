import { HandPalm, Play } from 'phosphor-react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import * as S from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import {
  newCycleSchemaValidation,
  FormData
} from './components/NewCycleForm/schemaValidation'
import { useCycleContext } from '../../contexts/Cycle'

export function Home() {
  const { activeCycle, createNewCycle, interruptCycle } = useCycleContext()
  const newCycleForm = useForm<FormData>({
    resolver: zodResolver(newCycleSchemaValidation),
    defaultValues: {
      task: '',
      minutesAmount: 5
    }
  })

  const { reset, watch, handleSubmit } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  const handleCreateNewCycle = (data: FormData) => {
    createNewCycle(data)
    reset()
  }

  const handleInterruptCycle = () => {
    interruptCycle()
    reset()
  }

  return (
    <S.Container>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <S.StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </S.StopCountdownButton>
        ) : (
          <S.StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </S.StartCountdownButton>
        )}
      </form>
    </S.Container>
  )
}
