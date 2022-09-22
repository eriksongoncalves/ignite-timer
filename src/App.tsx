import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import { Router } from './Router'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyles } from './styles/themes/global'
import { CycleProvider } from './contexts/Cycle'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <CycleProvider>
          <Router />
        </CycleProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export { App }
