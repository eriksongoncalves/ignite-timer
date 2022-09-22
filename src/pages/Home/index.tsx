import { useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import * as S from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { CycleProvider } from '../../contexts/Cycle'
import { Cycle } from '../../contexts/Cycle/types'
import {
  newCycleSchemaValidation,
  FormData
} from './components/NewCycleForm/schemaValidation'

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string>()
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const newCycleForm = useForm<FormData>({
    resolver: zodResolver(newCycleSchemaValidation),
    defaultValues: {
      task: '',
      minutesAmount: 5
    }
  })

  const { reset, watch, handleSubmit } = newCycleForm

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)
  const task = watch('task')
  const isSubmitDisabled = !task

  const markCurrentCycleAsFinished = () => {
    setCycles(prevCycles =>
      prevCycles.map(cycle => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            fineshedDate: new Date()
          }
        }

        return cycle
      })
    )
  }

  const setSecondsPassed = (value: number) => {
    setAmountSecondsPassed(value)
  }

  const handleCreateNewCycle = (data: FormData) => {
    const cycleId = String(new Date().getTime())

    const newCycle = {
      id: cycleId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles(state => [...state, newCycle])
    setActiveCycleId(cycleId)
    setAmountSecondsPassed(0)

    reset()
  }

  const handleInterruptCycle = () => {
    setActiveCycleId(undefined)
    setCycles(prevCycles =>
      prevCycles.map(cycle => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date()
          }
        }

        return cycle
      })
    )

    reset()
  }

  return (
    <S.Container>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CycleProvider
          activeCycleId={activeCycleId}
          activeCycle={activeCycle}
          markCurrentCycleAsFinished={markCurrentCycleAsFinished}
          amountSecondsPassed={amountSecondsPassed}
          setSecondsPassed={setSecondsPassed}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />
        </CycleProvider>

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
