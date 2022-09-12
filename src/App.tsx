import { Button } from './components/Button'
import { ButtonVariants } from './components/Button/types'

function App() {
  return (
    <>
      <Button variant={ButtonVariants.PRIMARY} />
      <Button variant={ButtonVariants.SECONDARY} />
      <Button variant={ButtonVariants.SUCCESS} />
      <Button variant={ButtonVariants.DANGER} />
    </>
  )
}

export { App }
