

let cardStyles = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf',
  'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'
];


let openedCard = null;
let timer = null;
let matchCounter = 0;
let gameOver = false;

/**
@description - handles the mouse click on the card.
Keeps track of the opened and matched cards.
Shows and closes the card symbols.
Shows the modal popup when the game is finished.

@param {string} selectedCard - The card selected by a mouse click
*/
function handleMouseClick(selectedCard) {
  if (openedCard === selectedCard || gameOver || selectedCard.className === "card match") {
     return;
  }

    // start timer if it has not been started
  if (timer == null) {
     timer = setInterval(function() {
        document.getElementsByClassName('timer')[0].innerHTML = parseInt(document.getElementsByClassName('timer')[0].innerHTML) + 1;
     }, 1000);
  }


  if (selectedCard.className === "card") {
    selectedCard.className = "card open show";
  }
  // if a card was selected before
  if (openedCard != null) {

    document.getElementsByClassName('moves')[0].innerHTML = parseInt(document.getElementsByClassName('moves')[0].innerHTML) + 1;
    let moves = parseInt(document.getElementsByClassName('moves')[0].innerHTML);
    if (moves === 5 || moves === 20) {
      reduceStars();
    }


    // if cards match
    if (openedCard.firstChild.className === selectedCard.firstChild.className) {
      // display matched cards
      selectedCard.className = "card match";
      openedCard.className = "card match";
      matchCounter += 1;

      if (matchCounter >= 8) {
        showModal();
        gameOver = true;
        clearInterval(timer);
      }
      console.log(matchCounter);

    }
    // if cards do not match
    else {
      let prevCard = openedCard;
      window.setTimeout(function() {
        closeCards(selectedCard, prevCard);
      }, 500);
    }
    // reset opened card variable to null
    openedCard = null;
  } // 'openedCard == null' means there was no previously opened card
  else {
    openedCard = selectedCard;
  }
}


// closes the card symbol
function closeCards(selectedCard, prevCard) {
  // close the selected card
  selectedCard.className = "card";
  // close the previously opened card
  prevCard.className = "card";
}


// reduces the number of stars
function reduceStars() {
  const stars = document.getElementsByClassName('stars')[0];
  if (stars.children.length == 0) {
      return;
  }
  const starHTML = '<li><i class="fa fa-star"></i></li>';
  stars.innerHTML = starHTML.repeat(stars.children.length - 1);
}


// shuffles the cards
function shuffleCards(array) {
  cardStyles = shuffle(array);

  const cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].firstChild.setAttribute("class", cardStyles[i]);
  }
}


// initializes the game
function initGame() {
  shuffleCards(cardStyles);

}


// shows the modal popup
function showModal() {
	let modal = document.getElementsByClassName("modal")[0];
	modal.innerHTML = "Congratulations! <br><br>You got " + (document.getElementsByClassName('stars')[0].children.length) + " stars with " + document.getElementsByClassName('moves')[0].innerHTML + " moves, after " + document.getElementsByClassName('timer')[0].innerHTML + " seconds. <br><input type='button' onclick=\"window.location='index.html'\" value='Play again' >";
	modal.className = "modal show";
}


function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


initGame();
