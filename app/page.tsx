import PuzzleCard from "./components/PuzzleCard/PuzzleCard";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.ReactPuzzles}>
        <h2 className={styles.title}>React Puzzles</h2>
        <div className={styles.puzzleList}>
          {/* Easy - React  */}
          <div className={styles.puzzleContainer}>
            <h3 className={styles.puzzleTypeHeading}>Easy</h3>

            <div className={styles.puzzleList}>
              <PuzzleCard link={{href: "/easy/todo-list"}} title="Todo List" type="react" difficulty="Easy" />
              <PuzzleCard link={{href: "/easy/guess-the-number"}} title="Guess the Number" type="react" difficulty="Easy" />
              <PuzzleCard link={{href: "/easy/bill-splitter"}} title="Bill Splitter" type="react" difficulty="Easy" />
              <PuzzleCard link={{href: "/easy/string-transformers"}} title="String Transformers" type="react" difficulty="Easy" />
            </div>
          </div>

          {/* Medium - React  */}
          <div className={styles.puzzleContainer}>
            <h3 className={styles.puzzleTypeHeading}>Medium</h3>
            <div className={styles.puzzleList}>
              <PuzzleCard link={{href: "/medium/calculator"}} title="Calculator" type="react" difficulty="Medium" />
              <PuzzleCard link={{href: "/medium/password-strength-checker"}} title="Password Strength Checker" type="react" difficulty="Medium" />
              <PuzzleCard link={{href: "/medium/infinite-scroll"}} title="Infinite Scroll" type="react" difficulty="Medium" />
              <PuzzleCard link={{href: "/medium/expense-tracker"}} title="Expense Tracker" type="react" difficulty="Medium" />
              <PuzzleCard link={{href: "/medium/pomodoro-timer"}} title="Pomodoro Timer" type="react" difficulty="Medium" />
              <PuzzleCard link={{href: "/medium/habit-tracker"}} title="Habit Tracker" type="react" difficulty="Medium" />
            </div>
          </div>

          {/* Hard - React  */}
          <div className={styles.puzzleContainer}>
            <h3 className={styles.puzzleTypeHeading}>Hard</h3>
            <div className={styles.puzzleList}>
              <PuzzleCard link={{href: "/hard/weather-app"}} title="Weather App" type="react" difficulty="hard" />
              <PuzzleCard link={{href: "/hard/kanban-board"}} title="Kanban Board" type="react" difficulty="hard" />
              <PuzzleCard link={{href: "/hard/memory-game"}} title="Memory Game" type="react" difficulty="hard" />
            </div>
          </div>
          {/* <PuzzleCard />  */}
        </div>
      </div>

      <div className={styles.ReactPuzzles}>
        <h2 className={styles.title}>HTML/CSS/JS Versions</h2>
        <div className={styles.puzzleList}>
          {/* Easy - JS  */}
          <div className={styles.puzzleContainer}>
            <h3 className={styles.puzzleTypeHeading}>Easy</h3>
            <div className={styles.puzzleList}>
              <PuzzleCard link={{href: "/vanilla-js/easy/todo-list/index.html"}} title="Todo List" type="javascript" difficulty="Easy" />
              <PuzzleCard link={{href: "/vanilla-js/easy/guess-the-number/index.html"}} title="Guess the Number" type="javascript" difficulty="Easy" />
              <PuzzleCard link={{href: "/vanilla-js/easy/bill-splitter/index.html"}} title="Bill Splitter" type="javascript" difficulty="Easy" />
              <PuzzleCard link={{href: "/vanilla-js/easy/string-transformers/index.html"}} title="String Transformers" type="javascript" difficulty="Easy" />
            </div>
          </div>
          
          {/* Medium - JS  */}
          <div className={styles.puzzleContainer}>
            <h3 className={styles.puzzleTypeHeading}>Medium</h3>
            <div className={styles.puzzleList}>
              <PuzzleCard link={{href: "/vanilla-js/medium/calculator/index.html"}} title="Calculator" type="javascript" difficulty="Medium" />
              <PuzzleCard link={{href: "/vanilla-js/medium/password-strength/index.html"}} title="Password Strength Checker" type="javascript" difficulty="Medium" />
              <PuzzleCard link={{href: "/vanilla-js/medium/infinite-scroll/index.html"}} title="Infinite Scroll" type="javascript" difficulty="Medium" />
              <PuzzleCard link={{href: "/vanilla-js/medium/expense-tracker/index.html"}} title="Expense Tracker" type="javascript" difficulty="Medium" />
              <PuzzleCard link={{href: "/vanilla-js/medium/pomodoro-timer/index.html"}} title="Pomodoro Timer" type="javascript" difficulty="Medium" />
              <PuzzleCard link={{href: "/vanilla-js/medium/habit-tracker/index.html"}} title="Habit Tracker" type="javascript" difficulty="Medium" />
            </div>
          </div>

          {/* Hard - JS  */}
          <div className={styles.puzzleContainer}>
            <h3 className={styles.puzzleTypeHeading}>Hard</h3>
            <div className={styles.puzzleList}>
              <PuzzleCard link={{href: "/vanilla-js/hard/weather-app/index.html"}} title="Weather App" type="javascript" difficulty="hard" />
              <PuzzleCard link={{href: "/vanilla-js/hard/kanban-board/index.html"}} title="Kanban Board" type="javascript" difficulty="hard" />
              <PuzzleCard link={{href: "/vanilla-js/hard/memory-game/index.html"}} title="Memory Game" type="javascript" difficulty="hard" />
            </div>
          </div>
          {/* <PuzzleCard />  */}
        </div>
      </div>
    </div>
  );
}
