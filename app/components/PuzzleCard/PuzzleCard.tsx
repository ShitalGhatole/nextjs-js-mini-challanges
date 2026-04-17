import Link from "next/link"
import styles from './PuzzleCard.module.scss'


const PuzzleCard = (
  {link, title, type, difficulty}: {link: {href: string}, title: string, type: string, difficulty: string}
) => {
  return (
    <Link href={link.href} target="_blank" rel="noopener noreferrer">
      <div className={styles.puzzleCard}>

      <div className={styles.headerWrapper}>
        {title}
        <p className={styles.difficulty}>{difficulty}</p>
      </div>

      <img src={type === 'react' ? '/react-logo.svg' : '/JavaScript_logo.png'} 
        className={styles.icon}
        width={40} 
        height={40} 
        alt={`${type === 'react' ? 'React' : 'JavaScript'} Icon`}
        title={`Made in ${type === 'react' ? 'React' : 'Vanilla HTML/CSS/JS'}`}
        />
      </div>
    </Link>
  )
}

export default PuzzleCard