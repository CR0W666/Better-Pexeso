import {Gui} from "../presentation/gui/Gui.js"

export class Logic {

    constructor() {
        this.gui = new Gui();
        this.numOfCards;
        this.mode;
        this.element = document.getElementById("numOfCards"); 
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

    }

}