const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];
let cards = [...cardValues, ...cardValues]; // Duplicate for matching pairs
let flippedCards = [];
let matchedCards = [];
let moveCount = 0;
let timer = 0;
let interval;

const gameBoard = document.getElementById("game-board");
const moveCountEl = document.getElementById("moveCount");
const timerEl = document.getElementById("timer");
const resetBtn = document.getElementById("reset");

// Shuffle cards
function shuffleCards() {
  cards = cards.sort(() => Math.random() - 0.5);
}

// Create card elements
function createCards() {
  gameBoard.innerHTML = '';
  cards.forEach((value, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", index);
    card.setAttribute("data-value", value);
    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
  });
}

// Handle card click
function handleCardClick(event) {
  const card = event.target;
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    card.textContent = card.getAttribute("data-value");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      moveCount++;
      moveCountEl.textContent = moveCount;
      checkMatch();
    }
  }
}

// Check if two flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.getAttribute("data-value") === card2.getAttribute("data-value")) {
    matchedCards.push(card1, card2);
    flippedCards = [];

    // Check if game is complete
    if (matchedCards.length === cards.length) {
      clearInterval(interval);
      alert(`You win! It took ${moveCount} moves and ${timer} seconds.`);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.textContent = "";
      card2.textContent = "";
      flippedCards = [];
    }, 1000);
  }
}

// Start the game
function startGame() {
  shuffleCards();
  createCards();
  moveCount = 0;
  moveCountEl.textContent = moveCount;
  timer = 0;
  timerEl.textContent = "00:00";
  matchedCards = [];
  clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    timerEl.textContent = formatTime(timer);
  }, 1000);
}

// Format time (seconds -> MM:SS)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Reset game
resetBtn.addEventListener("click", startGame);

// Initialize game
startGame();
