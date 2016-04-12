/**
 * Created by Administrator on 3/16/2016.
 */

"use strict";

import PinLookup from "./PinLookup";

export default class ClickHandler {
    constructor() {

    }

    initButtonListeners() {
        document.getElementById("console").innerText = "Enter your PIN";
        document.getElementById("button-1").innerText = "ENTER";

        const BUTTONS = 6;

        for (let i = 2; i <= BUTTONS; i++) {
            document.getElementById("button-" + i).innerText = "";
        }

        document.getElementById("button-1").addEventListener("click", function() {
            if (document.getElementById("button-1").innerText == "ENTER") {
                if (document.getElementById("input-window").value.length == 0 ||document.getElementById("input-window").value.length > 4 ) {
                    alert("Please enter a correct 4 digit PIN number");
                } else {
                    new PinLookup().requestPin();
                }
            }
        });
    }

    textCheck() {

    }

}