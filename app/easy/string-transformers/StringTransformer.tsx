'use client';
import { useEffect, useRef, useState } from "react"
import styles from './StringTransformer.module.scss'

const StringTransformer = () => {

  // Helper function to convert a string to camelCase
  function camel(str: string) {
    const words = str.split(" ");
    const firstWord = words[0].toLowerCase();
    const restOfTheWords = words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return firstWord + restOfTheWords.join('');
  }

  const inputRef = useRef(null)
  const [originalText, setOriginalText] = useState('This is the string to transform')
  const lowercaseText = originalText.toLowerCase()
  const uppercaseText = originalText.toUpperCase();
  const camelCaseText = camel(originalText);
  const snakeCaseText = originalText.toLowerCase().split(" ").join("_");
  const pascalCaseText = originalText.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  const kebabCaseText = originalText.toLowerCase().split(" ").join("-");
  const trimCaseText = originalText.toLowerCase().split(" ").join("");


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [])

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h1>
          String Transformers 
          <img 
            src="/react-logo.svg" 
            width="24" 
            height="24" 
            alt="JS Icon" 
            title="Made in Vanilla HTML/CSS/JS"
          />
        </h1>
        <p>Transform strings in various ways!</p>
      </div>

      <div className={styles.row}>
        <p>Original</p>
        <input 
          type="text" id="original" value={originalText}  
          onChange={(e) => setOriginalText(e.target.value)}
          ref={inputRef}
        />
      </div>

      <div className={styles.row}>
        <p>Lowercase (lowercase)</p>
        <output className={styles.lowercase}>{lowercaseText}</output>
      </div>

      <div className={styles.row}>
        <p>Uppercase (uppercase)</p>
        <output className={styles.uppercase}>{uppercaseText}</output>
      </div>

      <div className={styles.row}>
        <p>Camel case (camelCase)</p>
        <output className={styles.camelcase}>{camelCaseText}</output>
      </div>
      
      <div className={styles.row}>
        <p>Snake case (snake_case)</p>
        <output className={styles.snakecase}>{snakeCaseText}</output>
      </div>
      
      <div className={styles.row}>
        <p>Kebab case (kebab-case)</p>
        <output className={styles.kebabcase}>{kebabCaseText}</output>
      </div>
      
      <div className={styles.row}>
        <p>Pascal case (PascalCase)</p>
        <output className={styles.pascalcase}>{pascalCaseText}</output>
      </div>
      
      <div className={styles.row}>
        <p>Trim case (trimcasetext)</p>
        <output className={styles.trimcase}>{trimCaseText}</output>
      </div>
    </div>
  )
}

export default StringTransformer