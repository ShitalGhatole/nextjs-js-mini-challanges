const form = document.getElementById("transactionForm");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const transactionList = document.getElementById("transactionList");
let transactions = [];

// load transactions from localStorage on page load
const savedTransactions = localStorage.getItem("transactions");

if (savedTransactions) {
  transactions = JSON.parse(savedTransactions);
}

// save transactions whenever they change
function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function formatCurrency(amount) {
  return amount.toLocaleString("en-IN");
}

function renderTransactions() {
  transactionList.innerHTML = "";

  if (transactions.length === 0) {
    transactionList.innerHTML = '<p class="emptyState">No transactions yet</p>';
    updateSummary();
    return;
  }

  transactions.forEach((transaction) => {
    const div = document.createElement("div");

    div.className = "transactionItem";

    div.innerHTML = `
      <div>
        <h3>${transaction.description}</h3>
        <p>
          ₹${formatCurrency(transaction.amount)}
        </p>
      </div>

      <div class="actions">
        <span class="${transaction.type}">
          ${transaction.type}
        </span>

        <button
          onclick="deleteTransaction(${transaction.id})"
        >
          Delete
        </button>
      </div>
    `;

    transactionList.appendChild(div);
  });

  updateSummary();
}

function updateSummary() {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = totalIncome - totalExpense;

  balanceEl.textContent = `₹${formatCurrency(balance)}`;
  incomeEl.textContent = `₹${formatCurrency(totalIncome)}`;
  expenseEl.textContent = `₹${formatCurrency(totalExpense)}`;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = Number(amountInput.value);
  const type = typeInput.value;

  if (!description) {
    return;
  }

  if (!amount || amount <= 0) {
    return;
  }

  const transaction = {
    id: Date.now(),
    description,
    amount,
    type,
  };

  transactions.unshift(transaction);

  saveTransactions();
  renderTransactions();

  descriptionInput.value = "";
  amountInput.value = "";
  typeInput.value = "expense";
});

function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  saveTransactions();
  renderTransactions();
}

renderTransactions();
