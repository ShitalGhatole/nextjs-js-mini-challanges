'use client'
import { useEffect, useState } from 'react'
import styles from './MemoryGame.module.scss'

type Card = {
  id: number
  emoji: string
}

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [matchedCards, setMatchedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [bestScore, setBestScore] = useState<number | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const generateNewCards = (): Card[] => {
    const emojis = ['🍎', '🍌', '🍇', '🍊', '🍓', '🥝', '🍍', '🥥',]

    return [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
      }))
  }

  const gameWon =
    cards.length > 0 &&
    matchedCards.length === cards.length

  // initial game setup
  useEffect(() => {
    setCards(generateNewCards())
  }, [])

  // Load best score
  useEffect(() => {
    const score = localStorage.getItem('bestScore')

    if (score) {
      setBestScore(Number(score))
    }
  }, [])

  // timer
  useEffect(() => {
    if (!hasStarted || gameWon) {
      return
    }

    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [hasStarted, gameWon])

  // compare selected cards
  useEffect(() => {
    if (selectedCards.length !== 2) {
      return
    }

    setIsChecking(true)
    setMoves(prev => prev + 1)

    const [firstId, secondId] = selectedCards

    const firstCard = cards.find(
      card => card.id === firstId
    )

    const secondCard = cards.find(
      card => card.id === secondId
    )

    if (!firstCard || !secondCard) {
      setIsChecking(false)
      return
    }

    if (firstCard.emoji === secondCard.emoji) {
      setMatchedCards(prev => [
        ...prev,
        firstCard.id,
        secondCard.id,
      ])

      setSelectedCards([])
      setIsChecking(false)
    } else {
      setTimeout(() => {
        setSelectedCards([])
        setIsChecking(false)
      }, 1000)
    }
  }, [selectedCards, cards])

  // save best score
  useEffect(() => {
    if (!gameWon) {
      return
    }

    if (
      bestScore === null ||
      moves < bestScore
    ) {
      setBestScore(moves)

      localStorage.setItem(
        'bestScore',
        moves.toString()
      )
    }
  }, [gameWon, moves, bestScore])

  // lock body scroll when modal is open
  useEffect(() => {
    if (gameWon) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [gameWon])

  const handleCardClick = (card: Card) => {

    if (!hasStarted) {
      setHasStarted(true)
    }

    if (isChecking) {
      return
    }

    if (selectedCards.includes(card.id)) {
      return
    }

    if (matchedCards.includes(card.id)) {
      return
    }

    if (selectedCards.length === 2) {
      return
    }

    setSelectedCards(prev => [
      ...prev,
      card.id,
    ])
  }

  const restartGame = () => {
    setCards(generateNewCards())
    setSelectedCards([])
    setMatchedCards([])
    setMoves(0)
    setSeconds(0)
    setIsChecking(false)
    setHasStarted(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Memory Game
            <img
              src="/react-logo.svg"
              alt="React Logo"
              width="24"
              height="24"
            />
          </h1>

          <p>Match all pairs to win</p>
        </div>

        <div className={styles.stats}>
          <div>
            <span>Moves</span>
            <strong>{moves}</strong>
          </div>

          <div>
            <span>Time</span>
            <strong>{seconds}s</strong>
          </div>

          <div>
            <span>Best Score</span>
            <strong>
              {bestScore !== null
                ? bestScore
                : '-'}
            </strong>
          </div>
        </div>

        <button
          className={styles.restartButton}
          onClick={restartGame}
        >
          Restart Game
        </button>

        <div className={styles.gameBoard}>
          {cards.map(card => {
            const isSelected =
              selectedCards.includes(card.id)

            const isMatched =
              matchedCards.includes(card.id)

            return (
              <div
                key={card.id}
                className={styles.memoryCard}
                onClick={() => handleCardClick(card)}
              >
                <div
                  className={`${styles.memoryCardInner} ${
                    isSelected || isMatched
                      ? styles.flipped
                      : ''
                  }`}
                >
                  <div className={styles.memoryCardFront}>
                    ❓
                  </div>

                  <div className={styles.memoryCardBack}>
                    {card.emoji}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {gameWon && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>🎉 Congratulations!</h2>

            <p>
              You completed the game in{' '}
              <b>{moves}</b> moves
            </p>

            <p>
              Time taken: <b>{seconds}s</b>
            </p>

            <p>
              Best Score:{' '}
              <b>
                {bestScore !== null
                  ? bestScore
                  : '-'}
              </b>
            </p>

            <button
              className={styles.restartButton}
              onClick={restartGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MemoryGame