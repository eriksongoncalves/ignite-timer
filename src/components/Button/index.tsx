import { ButtonVariants } from './types'
import * as S from './styles'

interface ButtonProps {
  variant: ButtonVariants
}

export const Button = ({ variant }: ButtonProps) => {
  return <S.Container variant={variant}>Enviar</S.Container>
}
