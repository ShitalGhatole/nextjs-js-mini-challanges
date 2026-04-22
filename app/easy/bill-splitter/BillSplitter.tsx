'use client'
import { useRef, useState } from 'react';
import styles from './BillSplitter.module.scss'

const BillSplitter = () => {
  //initial values
  const [billAmount, setBillAmount] = useState<number>(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [customTipValue, setCustomTipValue] = useState(0);
  const [totalPeople, setTotalPeople] = useState(0);
  //Final Values
  const [finalBill, setFinalBill] = useState(0);
  const [finalTip, setFinalTip] = useState(0);
  const [billPerPerson, setBillPerPerson] = useState(0);

  const tipPercentages = [
    { percent: 'five', number: 5 }, 
    { percent: 'ten', number: 10 }, 
    { percent: 'fifteen', number: 15 }, 
    { percent: 'twentyfive', number: 25 }, 
    { percent: 'fifty', number: 50 }
  ]

  const setTip = (percentage: number) => () => {
    setTipPercentage(percentage);
    setCustomTipValue(0);
  }

  const handleCustomTipChange = (value: number) => {
    setCustomTipValue(value);
    setTipPercentage(0);
  }

  const calculateBill = () => {
    const finalTip = customTipValue > 0 ? customTipValue : tipPercentage;
    const finalBill = (billAmount * (finalTip / 100)) + billAmount;
    const billPerPerson = finalBill / totalPeople;

    setFinalTip(finalTip)
    setFinalBill(finalBill);
    setBillPerPerson(billPerPerson);

    console.log('Bill Amount: ', billAmount);
    console.log('Tip Percentage: ', tipPercentage);
    console.log('Custom Tip: ', customTipValue);
    console.log('Total People: ', totalPeople);
    console.log('Bill per person: ', billPerPerson);
  }

  const resetEverything = () => {
    setBillAmount(0);
    setTipPercentage(0);
    setCustomTipValue(0);
    setTotalPeople(0);
    setFinalBill(0);
    setFinalTip(0);
    setBillPerPerson(0);
  }

  const isEverythingSet = () => {
    return (
      !isNaN(billAmount) &&
      !isNaN(totalPeople) &&
      billAmount > 0 &&
      totalPeople > 0 &&
      (tipPercentage > 0 || customTipValue > 0)
    );
  }

  return (
    <main className={styles.container}>
      {/* Bill Input */}
      <div className={styles.billInput}>
        <div className={styles.header}>
          <h1>Split the Bill <img src="/JavaScript_logo.png" alt="JS Icon" height="24" width="24" title="Made in Vanilla HTML/CSS/JS" /></h1>
          <p>Split the bill with ease!</p>
        </div>

        <div className={styles.inputBill}>
          <label>Bill: </label>
          <input 
            type="number" 
            id="billInput" 
            placeholder="Enter the bill amount"
            value={billAmount || ''} 
            onChange={(e) => {
              const value = e.target.value;
              setBillAmount(value ? parseFloat(value) : 0)} 
            } 
          />
        </div>

        <div className={styles.inputTip}>
          <p>Select Tip: </p>
          <div className={styles.tipBtnContainer}>
            <div className={styles.tipBtnGroup}>
              {tipPercentages.map((tip) => {
                return (
                <button 
                  key={tip.percent} 
                  className={`${styles.tipBtn} ${tip.number === tipPercentage ? styles.active : ''}`} 
                  onClick={setTip(tip.number)}>
                    {tip.number}%
                  </button>
                )
              })}
            </div>
            <input 
              type="number" 
              id="customTip" 
              placeholder="Enter custom tip" 
              value={customTipValue} 
              onChange={(e) => handleCustomTipChange(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className={styles.inputPeople}>
          <label>Number of People: </label>
          <input 
            type="number" 
            id="peopleInput" 
            placeholder="Enter the number of people" 
            value={totalPeople || 0}
            onChange={(e) => {
              const value = e.target.value;
              setTotalPeople(value ? parseInt(value) : 0)}
            } 
          />
        </div>

        <div className={styles.calculateBtnContainer}>
          <button 
            className={`${isEverythingSet() ? styles.active : ''} ${styles.calculateBtn}`}
            disabled={!isEverythingSet()} 
            onClick={calculateBill}
          >
            Calculate
          </button>
        </div>
      </div>

      {/* Bill Display */}
      <div className={styles.billDisplay}>
        <div className={styles.header}>
          <h1>Total Bill Split</h1>
          <p>This is how much each person should pay</p>
        </div>

        <div className={styles.tipAmount}>
          <p>Tip Amount: <span id="tipAmount">{finalTip.toFixed(2)}</span></p>
        </div>

        <div className={styles.totalAmount}>
          <p>Total: <span id="totalAmount">{finalBill.toFixed(2)}</span></p>
        </div>

        <div className={styles.billPerPerson}>
          <p>Bill Per Person: <span id="billPerPerson">{billPerPerson.toFixed(2)}</span></p>
        </div>

        <div className={styles.resetBtnContainer}>
          <button className={styles.resetBtn} onClick={resetEverything}>Reset</button>
        </div>
      </div>
    </main>
  )
}

export default BillSplitter