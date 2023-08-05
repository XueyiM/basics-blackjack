var gameState = 0;
var totalComputerCards = [];
var totalPlayerCards = [];

var getResults = function (totalCards) {
  var cardResult = [];
  for (var index = 0; index < totalCards.length; index += 1) {
    if (totalCards[index].rank === 1) {
      cardResult.push(11);
    } else if (
      totalCards[index].rank === 11 ||
      totalCards[index].rank === 12 ||
      totalCards[index].rank === 13
    ) {
      cardResult.push(10);
    } else {
      cardResult.push(totalCards[index].rank);
    }
  }
  var totalResult = [0, 0];
  for (var index = 0; index < cardResult.length; index += 1) {
    if (cardResult[index] === 11) {
      totalResult[0] += cardResult[index];
      totalResult[1] += 1;
    } else {
      totalResult[0] += cardResult[index];
      totalResult[1] += cardResult[index];
    }
  }

  return totalResult;
};

var makeDeck = function () {
  var cardDeck = [];

  var suits = ["hearts", "diamonds", "clubs", "spades"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      if (cardName === 1) {
        cardName = "Ace";
      } else if (cardName === 11) {
        cardName = "Jack";
      } else if (cardName === 12) {
        cardName = "Queen";
      } else if (cardName === 13) {
        cardName = "King";
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }

  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }

  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffledDeck = makeDeck();

var displayPlayerCardsValue = function () {
  var playerResults = "";
  for (var index = 0; index < totalPlayerCards.length; index += 1) {
    playerResults +=
      totalPlayerCards[index].name +
      " of " +
      totalPlayerCards[index].suit +
      "<br>";
  }
  return playerResults;
};

var displayCompCardsValue = function () {
  var computerResults = "";
  for (var index = 0; index < totalComputerCards.length; index += 1) {
    computerResults +=
      totalComputerCards[index].name +
      " of " +
      totalComputerCards[index].suit +
      "<br>";
  }
  return computerResults;
};

var gameResults = function (compCard, playerCard) {
  return (
    "Computer drew: <br>" +
    compCard +
    "<br>Total score: " +
    checkResults(getResults(totalComputerCards)) +
    "<br><br>----<br><br>You drew: <br>" +
    playerCard +
    "<br>Total score: " +
    checkResults(getResults(totalPlayerCards))
  );
};
var checkResults = function (results) {
  return results[0] === results[1]
    ? results[0]
    : results[0] + " or " + results[1];
};
var getGreaterResult = function (results) {
  var greatest = 0;

  for (var index = 0; index < results.length; index++) {
    if (greatest > 21) {
      greatest = results[index];
    }
    if (results[index] > greatest) {
      greatest = results[index];
    }
  }
  return greatest;
};

var main = function (input) {
  if (gameState === 0 && input != "deal") {
    return "Error, please type 'deal' to draw your 2 cards.";
  }
  if (gameState === 0 && input === "deal") {
    gameState = 1;
    var showComputerCards = function () {
      totalComputerCards.push(shuffledDeck.pop(), shuffledDeck.pop());
    };
    var showPlayerCards = function () {
      totalPlayerCards.push(shuffledDeck.pop(), shuffledDeck.pop());
    };

    if (gameState != 0 && input === "deal") {
    }
    showComputerCards();
    showPlayerCards();
  }

  if (input === "hit" || totalPlayerCards < 17) {
    gameState = 2;
    var drawNewCardforPlayer = function () {
      totalPlayerCards.push(shuffledDeck.pop());
    };

    drawNewCardforPlayer();
  }

  if ((gameState === 1 || gameState === 2) && input === "stand") {
    while (getGreaterResult(getResults(totalComputerCards)) <= 16) {
      var drawNewCardforComputer = function () {
        totalComputerCards.push(shuffledDeck.pop());
      };
      drawNewCardforComputer();
    }

    var highestPlayerResult = getGreaterResult(getResults(totalPlayerCards));
    var highestComputerResult = getGreaterResult(
      getResults(totalComputerCards)
    );
    gameState === 5;
    if (highestComputerResult > 21 && !(highestPlayerResult > 21)) {
      return (
        gameResults(displayCompCardsValue(), displayPlayerCardsValue()) +
        "<br><br>Computer busted. you win! Type 'restart' to play again."
      );
    }
    if (highestPlayerResult > 21 && !(highestComputerResult > 21)) {
      return (
        gameResults(displayCompCardsValue(), displayPlayerCardsValue()) +
        "<br><br>You've busted. computer wins! Type 'restart' to play again."
      );
    }
    if (highestComputerResult > 21 && highestPlayerResult > 21) {
      return (
        gameResults(displayCompCardsValue(), displayPlayerCardsValue()) +
        "<br><br>Both busted! Type 'restart' to play again."
      );
    }
    if (highestComputerResult === highestPlayerResult) {
      return (
        gameResults(displayCompCardsValue(), displayPlayerCardsValue()) +
        "<br><br>It's a stand-off! Type 'restart' to play again."
      );
    }
    if (highestComputerResult > highestPlayerResult) {
      return (
        gameResults(displayCompCardsValue(), displayPlayerCardsValue()) +
        "<br><br>Computer wins! Type 'restart' to play again."
      );
    }
    if (highestPlayerResult > highestComputerResult) {
      return (
        gameResults(displayCompCardsValue(), displayPlayerCardsValue()) +
        "<br><br>You win! Type 'restart' to play again."
      );
    }
  }

  if (input === "restart") {
    gameState = 0;
    var reset = function () {
      totalComputerCards = [];
      totalPlayerCards = [];
    };
    reset();
    return "This is a two player game, where you will play against the computer.<br><br>Type 'deal' to start dealing 2 cards each.";
  }

  return (
    gameResults(displayCompCardsValue(), displayPlayerCardsValue()) +
    "<br><br>Type 'hit' if your card is less than 17. Or type 'stand' if you're ready to submit your score."
  );
};
