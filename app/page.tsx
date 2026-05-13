import PuzzleCard from "./components/PuzzleCard/PuzzleCard";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.ReactPuzzles}>
        <h2 className={styles.title}>React Puzzles</h2>
        <ul className={styles.puzzleList}>
          {/* Easy - React  */}
          <PuzzleCard link={{href: "/easy/todo-list"}} title="Todo List" type="react" difficulty="Easy" />
          <PuzzleCard link={{href: "/easy/guess-the-number"}} title="Guess the Number" type="react" difficulty="Easy" />
          <PuzzleCard link={{href: "/easy/bill-splitter"}} title="Bill Splitter" type="react" difficulty="Easy" />
          <PuzzleCard link={{href: "/easy/string-transformers"}} title="String Transformers" type="react" difficulty="Easy" />

          {/* Medium - React  */}
          <PuzzleCard link={{href: "/medium/calculator"}} title="Calculator" type="react" difficulty="Medium" />

          {/* Hard - React  */}
          {/* <PuzzleCard />  */}
        </ul>
      </div>

      <div className={styles.ReactPuzzles}>
        <h2 className={styles.title}>HTML/CSS/JS Versions</h2>
        <ul className={styles.puzzleList}>
          {/* Easy - JS  */}
          <PuzzleCard link={{href: "/vanilla-js/easy/todo-list/index.html"}} title="Todo List" type="javascript" difficulty="Easy" />
          <PuzzleCard link={{href: "/vanilla-js/easy/guess-the-number/index.html"}} title="Guess the Number" type="javascript" difficulty="Easy" />
          <PuzzleCard link={{href: "/vanilla-js/easy/bill-splitter/index.html"}} title="Bill Splitter" type="javascript" difficulty="Easy" />
          <PuzzleCard link={{href: "/vanilla-js/easy/string-transformers/index.html"}} title="String Transformers" type="javascript" difficulty="Easy" />
          
          {/* Medium - JS  */}
          <PuzzleCard link={{href: "/vanilla-js/medium/calculator/index.html"}} title="Calculator" type="javascript" difficulty="Medium" />

          {/* Hard - JS  */}
          {/* <PuzzleCard />  */}
        </ul>
      </div>
    </div>
  );
}
