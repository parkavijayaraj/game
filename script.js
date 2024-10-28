const cardValues = [
    "P",
    "P",
    "S",
    "S",
    "Y",
    "Y",
    "D",
    "D",
    "N",
    "N",
    "J",
    "J",
    "G",
    "G",
    "A",
    "A",
  ];
  let cardElements = [];
  let flippedCards = [];
  let matchedPairs = 0;
  const totalPairs = cardValues.length / 2;
  
  const gameBoard = document.getElementById("game-board");
  const restartButton = document.getElementById("restart-button");
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function createCard(value) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
  
    card.addEventListener("click", () => flipCard(card));
    return card;
  }
  
  function flipCard(card) {
    if (
      flippedCards.length < 2 &&
      !card.classList.contains("flipped") &&
      !card.classList.contains("matched")
    ) {
      card.classList.add("flipped");
      card.textContent = card.dataset.value;
      flippedCards.push(card);
  
      if (flippedCards.length === 2) {
        checkForMatch();
      }
    }
  }
  
  function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
  
    if (firstCard.dataset.value === secondCard.dataset.value) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      matchedPairs++;
  
      if (matchedPairs === totalPairs) {
        setTimeout(() => alert("Congratulations! You found all pairs!"), 500);
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard.textContent = "";
        secondCard.textContent = "";
      }, 1000);
    }
  
    flippedCards = [];
  }
  
  function initializeGame() {
    gameBoard.innerHTML = "";
    shuffledValues = shuffle([...cardValues]);
  
    shuffledValues.forEach((value) => {
      const card = createCard(value);
      gameBoard.appendChild(card);
      cardElements.push(card);
    });
  
    matchedPairs = 0;
  }
  
  restartButton.addEventListener("click", initializeGame);
  
  initializeGame();