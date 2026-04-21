'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './Calculator.module.scss';

const Calculator = () => {

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = [
    { operator: 'add', symbol: '+' },
    { operator: 'subtract', symbol: '-' },
    { operator: 'multiply', symbol: '*' },
    { operator: 'divide', symbol: '/' },
    { operator: 'equals', symbol: '=' }
  ];

  const [firstNumber, setFirstNumber] = useState('');
  const [currentNumber, setCurrentNumber] = useState('');
  const [currentOperator, setCurrentOperator] = useState('');
  const [result, setResult] = useState('');
  const [calcState, setCalcState] = useState<'idle' | 'result' | 'typing' | 'operator'>('idle')
  const inputElementRef = useRef<HTMLInputElement>(null);

  const handleNumberInput = (value: number | string) => {
    setCurrentNumber(prevValue => {
      
      if (calcState === 'result' || calcState === 'operator') {
        prevValue = '';
      }

      if (value === '.') {
        if (prevValue.includes('.')) return prevValue;
        return prevValue === '' ? '0.' : prevValue + '.';
      }

      setCalcState('typing');
      return prevValue + value; 
    });
  }

  const calculateResult = (firstNumber: string, secondNum: string, operator: string) => {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNum);

    if (isNaN(num1) || isNaN(num2))  return '';

    let rawResult: number;
  
    switch (operator) {
      case 'add': rawResult = num1 + num2; break;
      case 'subtract': rawResult = num1 - num2; break;
      case 'multiply': rawResult = num1 * num2; break;
      case 'divide': 
        if (num2 === 0) return 'Error';
        rawResult =  num1 / num2;
        break;
      default: return '';
    }

    const formattedResult = Number(rawResult.toFixed(12));
    return Number.isInteger(formattedResult) ? formattedResult : formattedResult.toFixed(2);
  }

  //handles the operator symbols
  const handleOperator = (operator: string) => {
    console.log('current operator: ', operator);

    if (operator === 'equals') {
      if (!firstNumber || !currentOperator) return;

      const res = calculateResult(firstNumber, currentNumber, currentOperator);

      setResult(String(res));
      setCurrentNumber(String(res))

      setFirstNumber('');
      setCurrentOperator('');
      setCalcState('result');
      return;
    } 

    //chaining
    if (firstNumber && currentNumber && currentOperator) {
      const res = calculateResult(firstNumber, currentNumber, currentOperator);
      setFirstNumber(String(res));
    } else {
      setFirstNumber(currentNumber);
    }

    setCurrentOperator(operator);
    setCurrentNumber('');
    setCalcState('operator');
  }

  //backspace logic
  const handleBackspace = () => {
    if (calcState === 'typing') {
      setCurrentNumber(prevValue => prevValue.slice(0, -1));
    }

    if (calcState === 'result') {
      setCurrentNumber('');
      setCalcState('idle');
    }
  }
  
  //clear logic
  const allClear = () => {
    setFirstNumber('');
    setCurrentNumber('');
    setCurrentOperator('');
    setResult('');
    setCalcState('idle');
    if (inputElementRef.current) {
      inputElementRef.current.focus();
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (/^[0-9]$/.test(key)) {
        handleNumberInput(key);
      }

      //decimal
      if (key === '.') {
        handleNumberInput('.');
      }

      // operators 
      if (key === '+') handleOperator('add');
      if (key === '-') handleOperator('subtract');
      if (key === '*') handleOperator('multiply');
      if (key === '/') handleOperator('divide');
      if (key === '=') handleOperator('equals');

      if (key === 'Enter') {
        event.preventDefault();
        handleOperator('equals');
      }

      //backspace
      if (key === 'Backspace') {
        event.preventDefault();
        handleBackspace();
      }

      //clear
      if (key === 'Escape') {
        event.preventDefault();
        allClear();
      }

      
    }
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [calcState, firstNumber, currentNumber, currentOperator]);

  return (
    <main className={styles.container}>
      {/* <p>FirstNumber: {firstNumber}</p>
      <p>CurrentNumber: {currentNumber}</p>
      <p>CurrentOperator: {currentOperator}</p>
      <p>Result: {result}</p> */}

      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Basic Calculator<img src="/react-logo.svg" alt="JS Icon" height="24" width="24" title="Made in Vanilla HTML/CSS/JS" /></h1>
          <p>Perform basic arithmetic operations!</p>
        </div>

        <div className={styles.displayArea}>
          <p className={styles.calculationDisplay}></p>
          <input 
            ref={inputElementRef}
            type="text" 
            inputMode="decimal" 
            id="inputElement" 
            value={currentNumber}
            readOnly
            className={styles.input}
            onChange={(event) => setCurrentNumber(event.target.value)}
          />
        </div>

        <div className={styles.calculatorButtons}>

          {/* Numbers  */}
          {numbers.map(i => 
            <button className={styles.numberButton} key={i} 
              onClick={() => handleNumberInput(i)}
            >
              {i}
            </button>
          )}

          <button className={styles.numberButton} 
            onClick={() => handleNumberInput('.')}>
            .
          </button>

          {/* Operators  */}
          {operators.map(op => 
            <button className={styles.operatorButton} key={op.operator} 
              onClick={() => handleOperator(op.operator)}
            >
              {op.symbol}
            </button>
          )}

          <button className={styles.specialButton} onClick={handleBackspace}>
            ⌫
          </button>

          <button className={styles.specialButton} onClick={allClear}>AC</button>
        </div>
      </div>
    </main>
  )
}

export default Calculator