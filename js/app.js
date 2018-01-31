let cardStyles = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf',
  'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'
];


let openedCard = null; // initialize this to null
let timer;
let matchCounter;

function handleMouseClick(selectedCard) {

  document.getElementsByClassName('moves')[0].innerHTML = parseInt(document.getElementsByClassName('moves')[0].innerHTML) + 1;
  let moves = parseInt(document.getElementsByClassName('moves')[0].innerHTML);

  if (moves === 5 || moves === 20) {
    reduceStars();
  }

  if (selectedCard.className === "card") {
    selectedCard.className = "card open show";
  }
  // if a card was selected before
  if (openedCard != null) {
    // if cards match
    if (openedCard.firstChild.className === selectedCard.firstChild.className) {
      // display matched cards
      selectedCard.className = "card match";
      openedCard.className = "card match";
      matchCounter +=1;

      if(matchCounter >= 8) {
        alert('Game finished');
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

function closeCards(selectedCard, prevCard) {
  // close the selected card
  selectedCard.className = "card";
  // close the previously opened card
  prevCard.className = "card";
}


function shuffleCards(array) {
  cardStyles = shuffle(array);

  const cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].firstChild.setAttribute("class", cardStyles[i]);
  }
}


function initGame() {
  shuffleCards(cardStyles);
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
