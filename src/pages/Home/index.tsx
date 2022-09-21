import { useState, useEffect } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'

import * as S from './styles'

const newCycleSchemaValidation = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O mínimo é de 5 minutos')
    .max(60, 'O máximo é de 5 minutos')
})

type FormData = zod.infer<typeof newCycleSchemaValidation>

type Cycle = {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  fineshedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string>()
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { handleSubmit, register, watch, reset } = useForm<FormData>({
    resolver: zodResolver(newCycleSchemaValidation),
    defaultValues: {
      task: '',
      minutesAmount: 5
    }
  })

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secontdsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secontdsAmount).padStart(2, '0')

  const task = watch('task')
  const isSubmitDisabled = !task

  useEffect(() => {
    let intervalId: number

    if (activeCycle) {
      intervalId = setInterval(() => {
        const secondsDifferent = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        )

        if (secondsDifferent >= totalSeconds) {
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

          setAmountSecondsPassed(totalSeconds)
          clearInterval(intervalId)
        } else {
          setAmountSecondsPassed(secondsDifferent)
        }
      }, 1000)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [activeCycle, activeCycleId, totalSeconds])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [seconds, minutes, activeCycle])

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

        <S.CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <S.Separator>:</S.Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </S.CountdownContainer>

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
