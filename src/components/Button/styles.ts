import styled, { css } from 'styled-components'
import { ButtonVariants } from './types'

type ContainerProps = {
  variant: ButtonVariants
}

const containerModifiers = {
  [ButtonVariants.PRIMARY]: 'purple',
  [ButtonVariants.SECONDARY]: 'orange',
  [ButtonVariants.SUCCESS]: 'green',
  [ButtonVariants.DANGER]: 'red'
}

export const Container = styled.button<ContainerProps>`
  ${({ variant }) => css`
    width: 100px;
    height: 48px;s

    background: ${containerModifiers[variant]};
  `}
`
