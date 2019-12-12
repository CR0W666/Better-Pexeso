import { Gui } from "../presentation/gui/Gui.js";

export class Logic {
  constructor() {
    //init variables
    this.gui = new Gui();
    this.numOfCards;
    this.mode;
    this.element = document.getElementById("numOfCards");

    //logic variables
    this.cards = []; //all cards
    this.foundPairs = []; //found pairs
    this.hiddenCards = [];
    this.selectedPair = []; //last clicked pair of cards
    this.clickedCard; //last clicked card
    this.foundCount;
    this.clickCounter = document.getElementById("clicks");
    this.scoreDiv = document.getElementById("score");
    this.clicks = 0;
    this.score;
  }

  //sets the mode of the game based on the clicked button
  mode(mode) {
    this.mode = mode; //sets global variable
    this._setMode(); //checks what mode was selected and sets the number of cards
    this._render(); //calls GUI to render the play space (cards, symbols etc.)

    //todo
    this._gameStart(); //starts the game
  }

  //determines the mode and card count
  _setMode() {
    //if statements check the selected mode
    if (this.mode == "easy") {
      //these commands set the number of cards
      this.element.innerText = 8;
    } else if (this.mode == "medium") {
      this.element.innerText = 16;
    } else if (this.mode == "hard") {
      this.element.innerText = 24;
    }
  }

  //calls GUI to render the game
  _render() {
    this.numOfCards = parseInt(this.element.innerHTML); //gets the card count to pass into gui
    this.gui.render(this.numOfCards, this.mode); //call
  }

  //todo
  _gameStart() {
    this._getCards(); //fills an array with all cards
    this._addListenerToCards(); //adds logic to cards (onclick)
  }

  //fills card array with all cards which are already stored in Gui variable
  _getCards() {
    this.cards = this.gui.cardArray;
  }

  //adds an Event Listener to all cards
  _addListenerToCards() {
    //loops through all cards
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].addEventListener("click", () => {
        this._clicked(this.cards[i]);
      }); //when a card is clicked, calls the _clicked func.
    }
  }

  //called when a card is clicked
  _clicked(clickedCard) {
    console.log(this.foundPairs.length + "|max: " + this.numOfCards);
    //console.log(clickedCard.children.item(0));
    this.clickedCard = clickedCard;
    this._increaseClickCounter();
    this._showScore();


    /*

    IMPORTANT NOTE?:
    Too lazy to change _first/_secondCard() fcs to just return true or false and then do the logic here in _clicked or separate func...

    */
    if (this._firstCard()) {
      //sets the first card if not set already, else continues
      //console.log("first card");
    } else if (this._secondCard()) {
      //sets the second card if not set already, else continues
      //console.log("second card");
    }

    if (this._haveAPair()) {
      //if 2 cards were clicked, executes this

      if (this._compareSelectedSymbols()) {
        //if symbols are equal, executes this

        this._foundAPair(); //pushes into array
        this._hideCards(); //hides whole cards
        this._resetPair(); //resets the array with the clicked cards
        this._checkWin(); //checks if the player has won
      } else {
        //if symbols are not equal, executes this

        this._hideSymbols(); //hides the symbols
        this._resetPair(); //resets the array with the clicked cards
      }
    }
    this._foundCount();
  }
  //fixes premature win //unknown cause
  _foundCount() {
    let counter = 0;
    for (let i = 0; i < this.numOfCards; i++) {
      if (this.cards[i].title == "found") {
        console.log(this.cards[i]);
        counter++;
      }
    }
    this.foundCount = counter;
  }

  //increases the number of clicks
  _increaseClickCounter() {
    this.clicks++;
    this.clickCounter.innerText = this.clicks;
  }

  //displays the score
  _showScore() {
    this.scoreDiv.innerText = this._score();
  }

  //adds first selection to pair
  _firstCard() {
    if (this.selectedPair[0] == undefined) {
      //Add clicked card to array
      this.selectedPair.push(this.clickedCard);

      //show the symbol
      this.selectedPair[0].getElementsByClassName("symbol").item(0).style =
        "visibility: visible";

      return true;
    }
  }
  //adds second selection to pair
  _secondCard() {
    if (this.selectedPair[1] == undefined) {
      //Check if this card equals the first one
      if (this._sameCardQ()) {
        //if not equal card

        //Add clicked card to array
        this.selectedPair.push(this.clickedCard);

        //show the symbol
        this.selectedPair[1].getElementsByClassName("symbol").item(0).style =
          "visibilty: shown;";

        return true;
      } else {
        //if equal card

        return false;
      }
    }
  }

  //resets the array
  _resetPair() {
    setTimeout(() => {
      this.selectedPair = [];
    }, 600);
  }

  //asks how many cards were clicked (present in the array)
  _haveAPair() {
    if (this.selectedPair.length == 2) {
      return true;
    } else {
      return false;
    }
  }

  //compares the symbols of selected cards
  _compareSelectedSymbols() {
    let firstSelected = this.selectedPair[0]
      .getElementsByClassName("symbol")
      .item(0).title;
    let secondSelected = this.selectedPair[1]
      .getElementsByClassName("symbol")
      .item(0).title;

    if (firstSelected == secondSelected) {
      return true;
    } else {
      return false;
    }
  }

  //check if there aren't any cards left to find
  _checkWin() {
    setTimeout(() => {
      //idk why +2 it just works... unless you click fast af boi, then it breaks like a lil bitch //edit, maybe solved... //edit2 solved... (still cant remember why+2, myb not adds latest pair...)
      if (this.foundCount + 2 == this.numOfCards) {
        alert("YOU WON"); //pop-up
        location.reload(); //reloads the page
      } else {
      }
    }, 600);
  }

  //handles error if the same card was clicked
  _sameCardQ() {
    if (this.clickedCard != this.selectedPair[0]) {
      return true;
    } else {
      return false;
    }
  }

  //hides cards
  _hideCards() {
    setTimeout(() => {
      for (let i = 0; i < this.foundPairs.length; i++) {
        this.foundPairs[i].style = "visibility: hidden";
        this.foundPairs[i].title = "found";
        this.hiddenCards.push(this.foundPairs[i]);
      }
    }, 600);
  }

  _hideSymbols() {
    setTimeout(() => {
      for (let i = 0; i < this.numOfCards; i++) {
        this.cards[i].getElementsByClassName("symbol").item(0).style =
          "visibility: hidden";
      }
      // //hide first symbol
      // this.selectedPair[0].getElementsByClassName("symbol").item(0).style = "visibility: hidden";
      // //hide second symbol
      // this.selectedPair[1].getElementsByClassName("symbol").item(0).style = "visibility: hidden";
    }, 600);
  }

  //if a pair is found pushes it into an array
  _foundAPair() {
    this.foundPairs.push(this.selectedPair[0], this.selectedPair[1]);
  }

  //calculates the score
  _score() {
    if (this.score >= 100) {
      this.score = Math.floor((this.clicks / this.numOfCards) * 100);
      //this.score = magic code to make sense;
      return this.score;
    } else {
      return "...";
    }
  }
}
