/**
 * Created by Kyle Flynn on 4/11/2016.
 */

"use strict";

import DataLoader from "./DataLoader";
import ATM from "./ATM";

export default class PinLookup {
    constructor() {
    }

    requestPin(pin) {
        DataLoader.loadData("data/users.csv", this.search)
    }

    search(data) {
        const COLUMNS = 4;

        let foundPin = false;

        for (let i = 0; i < data.length; i++) {
            if (document.getElementById("input-window").value == data[i][1]) {
                foundPin = true;
                console.log("loading user data " + data[i][1]);
                let userData = [COLUMNS];
                for (let j = 0; j < COLUMNS; j++) {
                    userData[j] = data[i][j];
                }
                let atm = new ATM(userData);
                atm.init();
            }
        }

        if (!foundPin) {
            document.getElementById("console").innerText = "Invalid PIN, please re-enter.";
        }

    }

}