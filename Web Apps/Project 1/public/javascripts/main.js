"use strict";

window.addEventListener("load", function() {
    new main();
});

import ATMStates from "./ATMStates";

class main {
    constructor() {
        this.atmStates = new ATMStates("ENTER_PIN_STATE");
        this.atmStates.changeButtonText();

        let self = this;

        document.getElementById("button-1").addEventListener("click", function(event) {
            self.atmStates.controlButtonOne(event);
        });
        document.getElementById("button-2").addEventListener("click", function() {
            self.atmStates.controlButtonTwo();
        });
        document.getElementById("button-3").addEventListener("click", function() {
            self.atmStates.controlButtonThree();
        });
        document.getElementById("button-4").addEventListener("click", function() {
            self.atmStates.controlButtonFour();
        });
        document.getElementById("button-5").addEventListener("click", function() {
            self.atmStates.controlButtonFive();
        });
        document.getElementById("button-6").addEventListener("click", function() {
            self.atmStates.controlButtonSix();
        });
    }
}