'use client'
import { useState } from 'react'
import styles from './PwdStrengthChecker.module.scss'

const PwdStrengthChecker = () => {
  const [inputVal, setInputVal] = useState('')

  const hasLowerCase = /[a-z]/.test(inputVal)
  const hasUpperCase = /[A-Z]/.test(inputVal)
  const hasNumbers = /[0-9]/.test(inputVal)
  const hasSymbols = /[^A-Za-z0-9]/.test(inputVal)

  const currCharCount = inputVal.length

  let score = 0

  if (hasLowerCase) score++
  if (hasUpperCase) score++
  if (hasNumbers) score++
  if (hasSymbols) score++

  const meterWidth = `${score * 25}%`

  let passStrength = 'Weak'

  if (currCharCount >= 12 && score === 4) {
    passStrength = 'Strong'
  } else if (currCharCount >= 8 && score >= 2) {
    passStrength = 'Medium'
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>
            Password Strength Checker
            <img
              src="/react-logo.svg"
              alt="React Icon"
              width="24"
              height="24"
            />
          </h1>

          <p>Check the strength of your password</p>
        </div>

        <div className={styles.wrapper}>
          <form>
            <input
              type="text"
              name="username"
              autoComplete="username"
              style={{ display: 'none' }}
              aria-hidden="true"
            />

            <input
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
          </form>

          <div className={styles.requirementsGrid}>
            <div
              className={`${styles.requirementCard} ${
                hasLowerCase ? styles.completed : ''
              }`}
            >
              <span>{hasLowerCase ? '✓' : '•'}</span>
              Lowercase
            </div>

            <div
              className={`${styles.requirementCard} ${
                hasUpperCase ? styles.completed : ''
              }`}
            >
              <span>{hasUpperCase ? '✓' : '•'}</span>
              Uppercase
            </div>

            <div
              className={`${styles.requirementCard} ${
                hasNumbers ? styles.completed : ''
              }`}
            >
              <span>{hasNumbers ? '✓' : '•'}</span>
              Number
            </div>

            <div
              className={`${styles.requirementCard} ${
                hasSymbols ? styles.completed : ''
              }`}
            >
              <span>{hasSymbols ? '✓' : '•'}</span>
              Symbol
            </div>
          </div>

          <div className={styles.strengthMeter}>
            <div
              className={styles.strengthMeterFill}
              style={{
                width: meterWidth,
                background:
                  passStrength === 'Strong'
                    ? '#2e7d32'
                    : passStrength === 'Medium'
                    ? '#f9a825'
                    : '#c62828',
              }}
            />
          </div>

          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <span>Characters</span>
              <strong>{currCharCount}</strong>
            </div>

            <div className={styles.infoCard}>
              <span>Password Strength</span>

              <strong
                className={
                  passStrength === 'Strong'
                    ? styles.strong
                    : passStrength === 'Medium'
                    ? styles.medium
                    : styles.weak
                }
              >
                {passStrength}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PwdStrengthChecker