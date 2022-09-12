import { ThemeProvider } from 'styled-components'
import { Button } from './components/Button'
import { ButtonVariants } from './components/Button/types'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyles } from './styles/themes/global'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Button variant={ButtonVariants.PRIMARY} />
      <Button variant={ButtonVariants.SECONDARY} />
      <Button variant={ButtonVariants.SUCCESS} />
      <Button variant={ButtonVariants.DANGER} />
    </ThemeProvider>
  )
}

export { App }
