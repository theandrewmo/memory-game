const gameContainer = document.getElementById("game");
const over = document.getElementById('over')
const score = document.getElementById('score')
const btn = document.querySelector('button')
const tries = document.getElementById('tries')
const timer = document.getElementById('timer')
const matches = document.getElementById('matches')


let card1 = null;
let card2 = null;
let timerId = null;

const gameProps = {
    matches: 0,
    tries: 0,
    timeElapsed: 0,
    gameOn: false
}


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
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  if(!gameProps.gameOn) {
    return
  }
  else {event.target.style.backgroundColor = event.target.className}

  if(!card1) {
    card1 = event.target
    card1.removeEventListener('click', handleCardClick)
    return
  }
  else {
    card2 = event.target;
    card2.removeEventListener('click', handleCardClick)
    if(card1.className == card2.className){
      gameProps.matches ++;
      matches.innerHTML = gameProps.matches;
      clearCards();
      gameProps.matches == gameContainer.children.length / 2 ? winner() : null;
    }
    else {
      gameProps.gameOn = false;
      setTimeout(()=> {
        card1.style.backgroundColor = null;
        card2.style.backgroundColor = null;
        card1.addEventListener('click', handleCardClick)
        card2.addEventListener('click', handleCardClick)
        clearCards();
        gameProps.gameOn = true;
        
      },1000)
    }
  }
  gameProps.tries ++;
  tries.innerHTML = gameProps.tries;
}

function clearCards() {
  card1=null
  card2=null
}

function resetProps() {
  gameContainer.textContent = '';
  gameProps.matches = 0;
  gameProps.tries = 0;
  gameProps.timeElapsed = 0;
  gameProps.gameOn = true;
  over.innerText = '';
  tries.innerHTML = 0;
  matches.innerHTML = 0;
  timer.innerHTML = 0;
}

function winner() {
  over.innerText = 'GAME OVER!!!'; 
  clearInterval(timerId);
  if(gameProps.tries < localStorage.highscoreTries || !localStorage.highscoreTries) {
    localStorage.setItem('highscoreTries', gameProps.tries +1)
  }
  if(gameProps.timeElapsed < localStorage.highscoreTime || !localStorage.highscoreTime) {
    localStorage.setItem('highscoreTime', gameProps.timeElapsed)
  }
  updateHighScores();
}

function updateHighScores() {
  if(localStorage.highscoreTime && localStorage.highscoreTries){
  document.getElementById('highscoreTries').innerHTML = localStorage.highscoreTries
  document.getElementById('highscoreTime').innerHTML = localStorage.highscoreTime
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
updateHighScores();

btn.addEventListener('click', function() {
  if(timerId) {clearInterval(timerId)}
  resetProps();
  shuffle(COLORS);
  createDivsForColors(shuffledColors);
  timerId = setInterval(function() {
    gameProps.timeElapsed++;
    timer.innerHTML = gameProps.timeElapsed
  },1000)
})


/* */