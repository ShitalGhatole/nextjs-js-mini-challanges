const gameBoard = document.getElementById('gameBoard')

const movesEl = document.getElementById('moves')
const timerEl = document.getElementById('timer')
const bestScoreEl = document.getElementById('bestScore')

const overlay = document.getElementById('overlay')

const finalMoves = document.getElementById('finalMoves')
const finalTime = document.getElementById('finalTime')
const finalBestScore = document.getElementById('finalBestScore')

const restartBtn = document.getElementById('restartBtn')
const playAgainBtn = document.getElementById('playAgainBtn')

let cards = []
let selectedCards = []
let matchedCards = []

let moves = 0
let seconds = 0

let hasStarted = false
let isChecking = false

let timerInterval = null

let bestScore =
  Number(localStorage.getItem('memoryGameBestScore')) || null

bestScoreEl.textContent = bestScore || '-'

function generateCards() {
  const emojis = ['🍎', '🍌', '🍇', '🍊', '🍓', '🥝', '🍍', '🥥']

  return [...emojis, ...emojis]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
    }))
}

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++

    timerEl.textContent = `${seconds}s`
  }, 1000)
}

function renderBoard() {
  gameBoard.innerHTML = ''

  cards.forEach(card => {
    const cardEl = document.createElement('div')

    cardEl.className = 'memoryCard'

    const isSelected =
      selectedCards.includes(card.id)

    const isMatched =
      matchedCards.includes(card.id)

    if (isSelected || isMatched) {
      cardEl.classList.add('flipped')
    }

    cardEl.innerHTML = `
      <div class="memoryCardInner">
        <div class="memoryCardFront">❓</div>
        <div class="memoryCardBack">${card.emoji}</div>
      </div>
    `

    cardEl.addEventListener('click', () => {
      handleCardClick(card)
    })

    gameBoard.appendChild(cardEl)
  })
}

function handleCardClick(card) {

  if (!hasStarted) {
    hasStarted = true
    startTimer()
  }

  if (isChecking) return

  if (selectedCards.includes(card.id)) return

  if (matchedCards.includes(card.id)) return

  selectedCards.push(card.id)

  renderBoard()

  if (selectedCards.length === 2) {
    compareCards()
  }
}

function compareCards() {
  isChecking = true

  moves++
  movesEl.textContent = moves

  const firstCard =
    cards.find(c => c.id === selectedCards[0])

  const secondCard =
    cards.find(c => c.id === selectedCards[1])

  if (firstCard.emoji === secondCard.emoji) {

    matchedCards.push(
      firstCard.id,
      secondCard.id
    )

    selectedCards = []
    isChecking = false

    renderBoard()

    checkWin()

  } else {

    setTimeout(() => {
      selectedCards = []

      isChecking = false

      renderBoard()
    }, 1000)
  }
}

function checkWin() {

  if (matchedCards.length !== cards.length) {
    return
  }

  clearInterval(timerInterval)

  if (
    bestScore === null ||
    moves < bestScore
  ) {
    bestScore = moves

    localStorage.setItem(
      'memoryGameBestScore',
      moves
    )

    bestScoreEl.textContent = bestScore
  }

  finalMoves.textContent = moves
  finalTime.textContent = `${seconds}s`
  finalBestScore.textContent = bestScore

  overlay.classList.remove('hidden')
}

function restartGame() {

  clearInterval(timerInterval)

  cards = generateCards()

  selectedCards = []
  matchedCards = []

  moves = 0
  seconds = 0

  hasStarted = false
  isChecking = false

  movesEl.textContent = 0
  timerEl.textContent = '0s'

  overlay.classList.add('hidden')

  renderBoard()
}

restartBtn.addEventListener(
  'click',
  restartGame
)

playAgainBtn.addEventListener(
  'click',
  restartGame
)

restartGame()