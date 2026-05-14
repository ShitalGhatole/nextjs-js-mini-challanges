import StringTransformer from './StringTransformer'
import styles from './StringTransformer.module.scss'

const page = () => {
  return (
    <div className={styles.container}>
      <StringTransformer />
    </div>
  )
}

export default page     