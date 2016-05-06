"use strict";

const DATA_LOOKUP = require("./DataLookup");

class ATMUser {
    constructor(data) {
        this.formData = data;
        this.columns = 4;
        this.row = 0;
        this.fileData = new DATA_LOOKUP(this.columns);
        this.fileData.setFinalData("./data/users.csv");
        this.userData = [this.columns];
        this.foundPin = false;

        const PIN_COLUMN = 1;

        for (let i = 0; i < this.fileData.finalData.length; i++) {
            if ((this.formData['input'] == this.fileData.finalData[i][PIN_COLUMN]) && this.foundPin == false) {
                this.row = i;
                this.foundPin = true;
                for (let j = 0; j < this.columns; j++) {
                    this.userData[j] = this.fileData.finalData[i][j];
                }
            }
        }

        if (this.foundPin == true) {
            this.name = this.userData[0];
            this.pin = this.userData[1];
            this.checking = parseFloat(this.userData[2]);
            this.savings = parseFloat(this.userData[3]);
        } else {
            this.name = 'UNDEFINED';
            this.pin = '0';
            this.checking = '0';
            this.savings = '0';
        }
    }

    hasFoundPin() {
        return this.foundPin;
    }

    withdrawSavings(amount) {
        if (amount > this.savings) {
            return "Insufficient funds. Please enter a valid amount";
        } else {
            let oldSavings = this.savings;
            this.savings = oldSavings - amount;
            this.writeData();
            return "Successful withdraw. New savings - $" + this.savings;
        }
    }

    withdrawChecking(amount) {
        if (amount > this.checking) {
            return "Insufficient funds. Please enter a valid amount";
        } else {
            let oldChecking = this.checking;
            this.checking = oldChecking - amount;
            this.writeData();
            return "Successful withdraw. New checking - $" + this.checking;
        }
    }

    depositSavings(amount) {
        let oldSavings = this.savings;
        this.savings = oldSavings + amount;
        this.writeData();
        return "Successful deposit. New savings - $" + this.savings;
    }

    depositChecking(amount) {
        let oldChecking = this.checking;
        this.checking = oldChecking + amount;
        this.writeData();
        return "Successful deposit. New checking - $" + this.checking;
    }

    transferFromSavings(amount) {
        if (amount > this.checking || amount > this.savings) {
            return "Insufficient funds. Please enter a valid amount";
        } else {
            let oldChecking = this.checking;
            let oldSavings = this.savings;
            this.checking = oldChecking + amount;
            this.savings = oldSavings - amount;
            this.writeData();
            return "Successful transfer. New balance - " + this.getBalance();
        }
    }

    transferFromChecking(amount) {
        if (amount > this.checking || amount > this.savings) {
            return "Insufficient funds. Please enter a valid amount";
        } else {
            let oldChecking = this.checking;
            let oldSavings = this.savings;
            this.checking = oldChecking - amount;
            this.savings = oldSavings + amount;
            this.writeData();
            return "Successful transfer. New balance - " + this.getBalance();
        }
    }

    getBalance() {
        return "savings[$" + this.savings + "] checking[$" + this.checking + "]";
    }

    getPIN() {
        return this.pin;
    }

    getUserName() {
        return this.name;
    }

    getSavings() {
        return this.savings;
    }

    getChecking() {
        return this.checking;
    }

    writeData() {
        let dataArray = [];
        let dataWriter = new DATA_LOOKUP(this.columns);
        for (let i = 0; i < this.fileData.finalData.length; i++) {
            dataArray[i] = [];
            for (let j = 0; j < this.columns; j++) {
                if (this.row != i) {
                    dataArray[i][j] = this.fileData.finalData[i][j];
                } else {
                    dataArray[this.row][0] = this.name;
                    dataArray[this.row][1] = this.pin;
                    dataArray[this.row][2] = this.checking;
                    dataArray[this.row][3] = this.savings;
                }
            }
        }
        dataWriter.writeDataFile_MD(__dirname + '/../data/' + 'users.csv', dataArray, this.columns);
    }

}

module.exports = ATMUser;