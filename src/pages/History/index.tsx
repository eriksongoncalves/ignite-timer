import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/esm/locale/pt-BR'

import * as S from './styles'
import { useCycleContext } from '../../contexts/Cycle'

export const History = () => {
  const { cycles } = useCycleContext()

  return (
    <S.Container>
      <h1>Meu histórico</h1>

      <S.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            $
            {cycles.map(cycle => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBR
                  })}
                </td>
                <td>
                  {cycle.fineshedDate && (
                    <S.Status statusColor="green">Concluído</S.Status>
                  )}

                  {cycle.interruptedDate && (
                    <S.Status statusColor="red">Interrompido</S.Status>
                  )}

                  {!cycle.fineshedDate && !cycle.interruptedDate && (
                    <S.Status statusColor="yellow">Em Andamento</S.Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </S.HistoryList>
    </S.Container>
  )
}
