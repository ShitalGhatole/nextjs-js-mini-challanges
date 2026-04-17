import NumberGuesser from "./NumberGuesser"
import styles from './page.module.scss'

const page = () => {

  return (
    <main className={styles.main}>
      <NumberGuesser />
    </main>
  )
}

export default page