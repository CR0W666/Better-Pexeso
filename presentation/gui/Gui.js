export class Gui {

    constructor() {
        //determines variables
        this.gameField = document.getElementById("gameField");
        this.cardArray = [];
        this.cardCount;
        this.symbolArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
        //this.filledCards = [];
        this.usedNums = [];

    }

    //called funtion from Logic to render the game
    render(cardCount) {
        
        this.cardCount = cardCount; //makes global variable
        this._createCards(); //call to create cards
        this._fillCards(); //call to assign properties
        this._fillCardsWithSymbols() //call to fill cards with symbols

    }

    //creates cards
    _createCards() {
        
        for (let i = 0; i < this.cardCount; i++) {

            let card = document.createElement("div"); //creates the card itself
            this.gameField.appendChild(card);//displays the card
            this.cardArray.push(card);//pushes the card into global array

        }

    }

    //fills cards with properties
    _fillCards() {

        //cycles through cards in cardarray
        for (let i = 0; i < this.cardCount; i++) {

            let card = this.cardArray[i]; //selects card from card array
            card.className = "card"; //assigns class
            card.id = "card" + i; //assigns ID

        }
        

    }

    //fills cards with symbols
    _fillCardsWithSymbols() {

        let symbol;
        //cycles symbols
        for (let i = 0; i < (this.cardCount/2); i++) {

            symbol = this.symbolArray[i]; //selects symbol from symbol array

            //makes card pairs with same symbols
            for (let y = 0; y < 2; y++) {

                this._getRandomCard().innerText = symbol; //inserts symbol into card
                
            }
        }
        
    }
    
    //selects random card from card array
    _getRandomCard() {

       return this.cardArray[this._getRandomInt()]; //selects card from array
        
    }

    _getRandomInt() {

        let nonused = false;
        let random;
        //generates a randome num until a nonused num is found
        while(!nonused) {
            
            random = Math.floor(Math.random() * Math.floor(this.cardCount)); //generates random number from 0 to number of cards

            if(!this._wasIUsed(random)) { //if nonused num found, exits the loop
                nonused = true;
            }

        }

        this.usedNums.push(random); //pushes number into used array
        return random;  //returns

    }

    //checks arrays for used nums and return boolean
    _wasIUsed(something) {

        //if generated num is used returns true else false
        if (this.usedNums.includes(something)) {
            return true;
        } else {
            return false;
        }

    }

}