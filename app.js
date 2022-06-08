const gameContainer = document.getElementById("game");
let start = document.getElementById("start");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let currentScore = 0;
let noClicking = false;
let lowScore = localStorage.getItem("low-score");


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function setScore(newScore) {
  currentScore = newScore;
  document.getElementById("current-score").innerText = "SCORE: " + currentScore;
}

function startGame() {
  setScore(0);
  start.classList.add("playing");
  if (gameContainer.style.display === "none") {
    gameContainer.style.display = "block";
  } else {
    gameContainer.style.display = "none";
  }
  
}

let startBtn = document.getElementById("start-button");
startBtn.addEventListener("click", startGame);

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (noClicking) return;
  if (event.target.classList.contains("flipped")) return;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    if (!currentCard.classList.contains("flipped")) {
      setScore(currentScore + 1);
    }

    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;
    // debugger
    let gif1 = card1.className;
    let gif2 = card2.className;

    if (gif1 === gif2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
      setScore(currentScore + 3);
    } else {
      setScore(currentScore -1);
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (cardsFlipped === COLORS.length){
      endGame();
  }
}
function endGame(){
  let end = document.querySelector('#end');
  let finalScore= end.children[1];
  finalScore.innerText = "Your score: " + currentScore;
  let lowScore = +localStorage.getItem("low-score") || Infinity;
  if (currentScore < lowScore) {
      finalScore.innerText += "";
      localStorage.setItem("low-score", currentScore);
  }
  document.getElementById("end").classList.add("game-over");


}

// when the DOM loads
createDivsForColors(shuffledColors);
