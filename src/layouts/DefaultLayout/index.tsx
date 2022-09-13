import { Outlet } from 'react-router-dom'

import * as S from './styles'
import { Header } from '../../components/Header.tsx'

export const DefaultLayout = () => {
  return (
    <S.Container>
      <Header />
      <Outlet />
    </S.Container>
  )
}
