const gameContainer = document.getElementById("game");
const over = document.getElementById('over')
const score = document.getElementById('score')
const btn = document.querySelector('button')
const tries = document.getElementById('tries')
const timer = document.getElementById('timer')
const matches = document.getElementById('matches')
const total = document.getElementById('total')


let card1 = null;
let card2 = null;
let timerId = null;

const gameProps = {
    matches: 0,
    tries: 0,
    timeElapsed: 0,
    gameOn: false,
    total: 0
}


const GAMEBOARD = [
  'https://images.unsplash.com/photo-1674903745215-0267b9c6baeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
  'https://images.unsplash.com/photo-1674766557958-cf06f147d182?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
  'https://images.unsplash.com/photo-1674903745215-0267b9c6baeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
  'https://images.unsplash.com/photo-1674766557958-cf06f147d182?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
  'https://images.unsplash.com/photo-1673643108094-7bf50d7c7d1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=694&q=80',
  'https://images.unsplash.com/photo-1673643108094-7bf50d7c7d1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=694&q=80',
  'https://images.unsplash.com/photo-1661454426786-8e6adbeeec82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=757&q=80',
  'https://images.unsplash.com/photo-1661454426786-8e6adbeeec82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=757&q=80',
  'https://images.unsplash.com/photo-1674066636011-d445199acada?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=674&q=80',
  'https://images.unsplash.com/photo-1674066636011-d445199acada?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=674&q=80',
  'https://images.unsplash.com/photo-1673874246309-de6d5fc34369?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
  'https://images.unsplash.com/photo-1673874246309-de6d5fc34369?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'

];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  gameProps.total = array.length / 2;


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

let shuffledItems = shuffle(GAMEBOARD);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForItems(itemArray) {
  for (let item of itemArray) {
    
    // create a new div
    const newDiv = document.createElement("div");
    newDiv.classList.add('itemDiv')
    newDiv.innerHTML = `<img src='${item}' class='hidden'/>`
    total.innerHTML = itemArray.length / 2;
    newDiv.ondragstart = ()=>{return false;}

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  console.log(event.target)
  // you can use event.target to see which element was clicked
  if(!gameProps.gameOn) {
    return
  }
  else if (event.target.parentNode.className == 'itemDiv'){
    event.target.className = '';
    if(!card1) {
      card1 = event.target;
      card1.parentNode.removeEventListener('click', handleCardClick)
      return
    }
    else if(!card2) {
      card2 = event.target;
      card2.parentNode.removeEventListener('click', handleCardClick)
      
      if(card1.outerHTML == card2.outerHTML){
        gameProps.matches ++;
        matches.innerHTML = gameProps.matches;
        (gameProps.matches == gameProps.total) ? winner() : clearCards();
      }

      else {
        gameProps.gameOn = false;
        setTimeout(()=> {
          card1.className = 'hidden';
          card2.className = 'hidden';
          card1.parentNode.addEventListener('click', handleCardClick)
          card2.parentNode.addEventListener('click', handleCardClick)
          clearCards();
          gameProps.gameOn = true; 
        },1000)
      }
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
  clearCards();
  setTimeout(()=> {alert('GAME OVER!!!'); 

  clearInterval(timerId);
  if(gameProps.tries < localStorage.highscoreTries || !localStorage.highscoreTries) {
    localStorage.setItem('highscoreTries', gameProps.tries +1)
  }
  if(gameProps.timeElapsed < localStorage.highscoreTime || !localStorage.highscoreTime) {
    localStorage.setItem('highscoreTime', gameProps.timeElapsed)
  }
  updateHighScores();}, 100)
  
}

function updateHighScores() {
  if(localStorage.highscoreTime && localStorage.highscoreTries){
  document.getElementById('highscoreTries').innerHTML = localStorage.highscoreTries
  document.getElementById('highscoreTime').innerHTML = localStorage.highscoreTime
  }
}

// when the DOM loads
createDivsForItems(shuffledItems);
updateHighScores();

btn.addEventListener('click', function() {
  if(timerId) {clearInterval(timerId)}
  resetProps();
  shuffle(GAMEBOARD);
  createDivsForItems(shuffledItems);
  timerId = setInterval(function() {
    gameProps.timeElapsed++;
    timer.innerHTML = gameProps.timeElapsed
  },1000)
})


