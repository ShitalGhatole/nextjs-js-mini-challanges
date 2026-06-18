const itemsContainer = document.getElementById('itemsContainer');
const loader = document.getElementById('loader');

let items = [];
let isLoading = false;

function renderItems() {
  itemsContainer.innerHTML = items
    .map(item => {
      return `
        <div class="item">
          Item ${item}
        </div>
      `;
    })
    .join('');
}

async function loadMoreItems() {
  if (isLoading) return;

  isLoading = true;
  loader.style.display = 'block';

  // Fake API delay
  await new Promise(resolve => {
    setTimeout(resolve, 2000);
  });

  const start = items.length + 1;

  const newItems = Array.from(
    { length: 10 },
    (_, index) => start + index
  );

  items.push(...newItems);

  renderItems();

  isLoading = false;
  loader.style.display = 'none';
}

function handleScroll() {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  const isNearBottom =
    scrollTop + windowHeight >= documentHeight - 100;

  if (isNearBottom && !isLoading) {
    loadMoreItems();
  }
}

// Initial 10 items immediately

items = Array.from(
  { length: 10 },
  (_, index) => index + 1
);

renderItems();

// Infinite Scroll

window.addEventListener('scroll', handleScroll);