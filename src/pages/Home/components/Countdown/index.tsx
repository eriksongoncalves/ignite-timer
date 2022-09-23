import { useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'

import * as S from './styles'
import { useCycleContext } from '../../../../contexts/Cycle'

export function Countdown() {
  const {
    activeCycle,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed
  } = useCycleContext()
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secontdsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secontdsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [seconds, minutes, activeCycle])

  useEffect(() => {
    let intervalId: number

    if (activeCycle) {
      intervalId = setInterval(() => {
        const secondsDifferent = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        )

        if (secondsDifferent >= totalSeconds) {
          markCurrentCycleAsFinished()

          setSecondsPassed(totalSeconds)
          clearInterval(intervalId)
        } else {
          setSecondsPassed(secondsDifferent)
        }
      }, 1000)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [activeCycle, markCurrentCycleAsFinished, totalSeconds, setSecondsPassed])

  return (
    <S.CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <S.Separator>:</S.Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </S.CountdownContainer>
  )
}
