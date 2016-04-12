/**
 * Created by Administrator on 3/16/2016.
 */

"use strict";

export default class ATM {
    constructor() {

    }

    initButtons() {
        const BUTTONS = 6;
        for (let i = 0; i < 6; i++) {
            document.getElementById("button-" + i).innerText = "TESTING";
        }
    }

}