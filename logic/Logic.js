import {Gui} from "../presentation/gui/Gui.js"

export class Logic {

    constructor() {
        //init variables
        this.gui = new Gui();
        this.numOfCards;
        this.mode;
        this.element = document.getElementById("numOfCards");

        //logic variables
        this.cards = [];
        this.foundPairs = [];
        this.selectedPair = [];
        this.thisSymbol;
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
        if(this.mode == "easy") {

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
        console.log(clickedCard.children.item(0));
        this.thisSymbol = clickedCard.children.item(0);
        this._increaseClickCounter();
        this._showScore();

        this._addToPair();
    
        

    }

    //increases the number of clicks
    _increaseClickCounter() {
        this.clicks++;
        this.clickCounter.innerText = this.clicks;
    }

    _showScore() {

        this.scoreDiv.innerText = this._score();

    }

    //adds selection to pair
    _addToPair() {
        
        this.selectedPair.push(this.thisSymbol);

    }

    //removes the last element
    _removeFromPair() {

        this.selectedPair.length == 1;

    }
    
    //resets the pair when 2 cards are clicked
    _resetPair() {
        
        this.selectedPair.length = 0;

    }

    //asks how many cards are shown
    _doIhaveAPair() {

        if (this.selectedPair.length == 2) {

            return true;

        } else {

            return false;

        }

    }


    //compares the symbols of selected cards
    _compareSelectedSymbols() {
        
        let firstSelected = this.selectedPair[0].title;
        let secondSelected = this.selectedPair[1].title;
        if(firstSelected == secondSelected) {

            return true;

        } else {

            return false;

        }

    }

    //handles error if the same card was clicked
    _sameCardQ() {
   
        if (this.selectedPair > 0) {

            let one = this.selectedPair[0].id;
            let two = this.selectedPair[1].id;

            if(one == two) {

                return true;

            } else {

                return false;

            }

        } else {

            return false;

        }
        

        


    }

    //handles error if already paired card was clicked
    _alreadFoundQ() {

        if (this.foundPairs.includes(this.selectedPair[0])) {

            return true;

        } else if (this.selectedPair.length > 0) {

            if(this.foundPairs.includes(this.selectedPair[1])) {

                return true;

            }
            

        } else {

            return false;

        }

    }

    //shows the symbol of the selected card
    _showSymbol() {
        
        this.thisSymbol.style = "visibilty: shown;";

    }

    //hides symbols
    _hide() {

        let one = this.selectedPair[0];
        let two = this.selectedPair[1];

        setTimeout(function() {
            
            one.style = "visibility: hidden";
            two.style = "visibility: hidden";

        }, 250);

    }

    //if a pair is found pushes it into an array
    _foundAPair() {

        this.foundPairs.push(this.selectedPair[0]);
        this.foundPairs.push(this.selectedPair[1]);

    }

    //hides only the last clicked symbol
    _errorHide() {

        this.thisSymbol.style = "visibility: hidden;";
        
    }

    //checks what pairs have been found etc. and restores their visibility, hopefully not to be used
    _handleVisibility() {

        for(let i = 0; i < this.numOfCards; i++) {
            if(clickedCard != this.cards[i]) {
               if(this.foundPairs.includes(this.cards[i].children.item(0))) {
                    this.cards[i].children.item(0).style = "visibility: shown";
                } else {
                    this.cards[i].children.item(0).style = "visibility: hidden;";
                }
           }
        }

    }

    //calculates the score
    _score() {
        this.score = Math.floor((this.clicks / this.numOfCards) * 100);
        if (this.score >= 100) {
            //this.score = magic code to make sense;
            return this.score;
        } else {
            return "...";
        }
        


    }

}