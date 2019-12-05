import {Gui} from "../presentation/gui/Gui.js"

export class Logic {

    constructor() {
        this.gui = new Gui();
        this.menu = document.getElementById("menu");
        this.numOfCards;
        this.mode;
        this.element = document.getElementById("numOfCards"); 
        this.gameField = document.getElementById("gameField");
    }

    //sets the mode of the game based on the clicked button
    mode(mode) {
        this.mode = mode; //sets global variable
        this._setMode(); //checks what mode was selected and sets the number of cards
        this._hideMenu(); //hides the menu for selecting difficulty
        this._revealClickCount(); //reveals the click count
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

    //hides the menu
    _hideMenu() {

        //sets the height to 0 and hides it
        this.menu.style = "visibility: hidden;" + "height: 0px";

        //if hard mode is selected makes sure, the cards can fit (normal 18:9 computer screen)
        if (this.mode == "hard") {

            this.gameField.style = "width: 800px";

        } else if (this.mode == "easy") {

            //this.gameField.style = "width: 400px";

        }

    }

    _revealClickCount() {
        document.getElementById("clickCountDiv").style = "visibility: visible;";
    }

   //calls GUI to render the game
    _render() {

        this.numOfCards = parseInt(this.element.innerHTML); //gets the card count to pass into gui
        this.gui.render(this.numOfCards); //call

    }

    //todo 
    _gameStart() {

    }

}