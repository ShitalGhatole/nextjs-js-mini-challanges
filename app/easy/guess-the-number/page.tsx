import Header from '@/app/components/Header/Header'
import NumberGuesser from "./NumberGuesser"
import styles from './page.module.scss'

const page = () => {

  return (
    <main className={styles.main}>
      <Header title="Guess The Number" />

      <NumberGuesser />
    </main>
  )
}

export default page