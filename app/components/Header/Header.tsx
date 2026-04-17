import Link from 'next/link';
import styles from './Header.module.scss'
const Header = ({title}: {title?: string}) => {
  return (
    <div className={styles.header}>
      <h1>
        <Link href="/">Mini Puzzles</Link>
      </h1>
    </div>
  )
}

export default Header;