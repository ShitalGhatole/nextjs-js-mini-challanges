//THis uses localstorage, instead of the usual state implementation
"use client";
import { useEffect, useState } from "react";
import styles from "./ExpenseTracker.module.scss";

type Transaction = {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
};

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  
  // On first render, check if we have any previously saved
  // transactions in localStorage and restore them into state
  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Whenever a transaction is added or deleted,
  // persist the latest state to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (e) => {
    e.preventDefault();

    if (!description.trim()) {
      return;
    }

    if (!amount || Number(amount) <= 0) {
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      description,
      amount: Number(amount),
      type,
    };

    setTransactions((prev) => [newTransaction, ...prev]);

    setDescription("");
    setAmount("");
    setType("expense");
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id),
    );
  };

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>
            Expense Tracker
            <img
              src="/react-logo.svg"
              alt="React Logo"
              width="24"
              height="24"
            />
          </h1>

          <p>Track your income and expenses</p>
        </div>

        <div className={styles.summary}>
          <div>
            <span>Balance</span>
            <strong>₹{balance.toLocaleString("en-IN")}</strong>
          </div>

          <div>
            <span>Income</span>
            <strong>₹{totalIncome.toLocaleString("en-IN")}</strong>
          </div>

          <div>
            <span>Expense</span>
            <strong>₹{totalExpense.toLocaleString("en-IN")}</strong>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleAddTransaction}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value as "income" | "expense")}
          >
            <option value="expense">Expense</option>

            <option value="income">Income</option>
          </select>

          <button type="submit">Add Transaction</button>
        </form>

        <div className={styles.transactionList}>
          {transactions.length === 0 && (
            <p className={styles.emptyState}>No transactions yet</p>
          )}

          {transactions.map((transaction) => (
            <div key={transaction.id} className={styles.transactionItem}>
              <div>
                <h3>{transaction.description}</h3>

                <p>₹{transaction.amount}</p>
              </div>

              <div className={styles.actions}>
                <span
                  className={
                    transaction.type === "income"
                      ? styles.income
                      : styles.expense
                  }
                >
                  {transaction.type}
                </span>

                <button onClick={() => handleDeleteTransaction(transaction.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
