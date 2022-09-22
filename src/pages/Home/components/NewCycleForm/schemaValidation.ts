import * as zod from 'zod'

export const newCycleSchemaValidation = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O mínimo é de 5 minutos')
    .max(60, 'O máximo é de 5 minutos')
})

export type FormData = zod.infer<typeof newCycleSchemaValidation>
