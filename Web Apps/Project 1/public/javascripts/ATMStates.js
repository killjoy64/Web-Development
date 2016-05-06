"use strict";

export default class ATMStates {
    constructor(defaultState) {
        this.state = defaultState;
        this.pin = 0;
        this.savings = false;
    }

    setState(newState) {
        this.state = newState;
    }

    getState() {
        return this.state;
    }

    changeButtonText() {
        if (this.state == "ENTER_PIN_STATE") {
            document.getElementById("output").innerText = "Please enter your 4-digit PIN";
            document.getElementById("button-1").innerText = "Enter";
            document.getElementById("button-2").innerText = "NULL";
            document.getElementById("button-3").innerText = "NULL";
            document.getElementById("button-4").innerText = "NULL";
            document.getElementById("button-5").innerText = "NULL";
            document.getElementById("button-6").innerText = "Exit";
        } else if (this.state == "MAIN_USER_SCREEN") {
            document.getElementById("output").innerText = "Welcome!";
            document.getElementById("button-1").innerText = "Balance";
            document.getElementById("button-2").innerText = "Transfer";
            document.getElementById("button-3").innerText = "Withdraw";
            document.getElementById("button-4").innerText = "Deposit";
            document.getElementById("button-5").innerText = "NULL";
            document.getElementById("button-6").innerText = "Exit";
        } else if (this.state == "TRANSFER") {
            document.getElementById("output").innerText = "How would you like to transfer?";
            document.getElementById("button-1").innerText = "Checking to Savings";
            document.getElementById("button-2").innerText = "Savings to Checking";
            document.getElementById("button-3").innerText = "NULL";
            document.getElementById("button-4").innerText = "NULL";
            document.getElementById("button-5").innerText = "NULL";
            document.getElementById("button-6").innerText = "Exit";
        } else if (this.state == "TRANSFER_CONFIRM") {
            if (this.savings) {
                document.getElementById("output").innerText = "Enter the amount to transfer from savings to checking";
            } else {
                document.getElementById("output").innerText = "Enter the amount to transfer from checking to savings";
            }
            document.getElementById("input").setAttribute("placeholder", "Enter amount here");
            document.getElementById("button-1").innerText = "Confirm";
            document.getElementById("button-2").innerText = "NULL";
            document.getElementById("button-3").innerText = "NULL";
            document.getElementById("button-4").innerText = "NULL";
            document.getElementById("button-5").innerText = "NULL";
            document.getElementById("button-6").innerText = "Exit";
        } else if (this.state == "WITHDRAW") {
            document.getElementById("output").innerText = "How would you like to withdraw?";
            document.getElementById("button-1").innerText = "From Checking";
            document.getElementById("button-2").innerText = "From Savings";
            document.getElementById("button-3").innerText = "NULL";
            document.getElementById("button-4").innerText = "NULL";
            document.getElementById("button-5").innerText = "NULL";
            document.getElementById("button-6").innerText = "Exit";
        } else if (this.state == "WITHDRAW_CONFIRM") {
            if (this.savings) {
                document.getElementById("output").innerText = "Enter the amount to withdraw from savings";
            } else {
                document.getElementById("output").innerText = "Enter the amount to withdraw from checking";
            }
            document.getElementById("input").setAttribute("placeholder", "Enter amount here");
            document.getElementById("button-1").innerText = "Confirm";
            document.getElementById("button-2").innerText = "NULL";
            document.getElementById("button-3").innerText = "NULL";
            document.getElementById("button-4").innerText = "NULL";
            document.getElementById("button-5").innerText = "NULL";
            document.getElementById("button-6").innerText = "Exit";
        } else if (this.state == "DEPOSIT") {
            document.getElementById("output").innerText = "How would you like to deposit?";
            document.getElementById("button-1").innerText = "To Checking";
            document.getElementById("button-2").innerText = "To Savings";
            document.getElementById("button-3").innerText = "NULL";
            document.getElementById("button-4").innerText = "NULL";
            document.getElementById("button-5").innerText = "NULL";
            document.getElementById("button-6").innerText = "Exit";
        } else if (this.state == "DEPOSIT_CONFIRM") {
            if (this.savings) {
                document.getElementById("output").innerText = "Enter the amount to deposit into savings";
            } else {
                document.getElementById("output").innerText = "Enter the amount to deposit into checking";
            }
            document.getElementById("input").setAttribute("placeholder", "Enter amount here");
            document.getElementById("button-1").innerText = "Confirm";
            document.getElementById("button-2").innerText = "NULL";
            document.getElementById("button-3").innerText = "NULL";
            document.getElementById("button-4").innerText = "NULL";
            document.getElementById("button-5").innerText = "NULL";
            document.getElementById("button-6").innerText = "Exit";
        }

        for (let i = 1; i < 7; i++) {
            let elem = document.getElementById("button-" + i);
            if (elem.innerText == "NULL") {
                elem.innerText = "";
            }
        }

    }

    controlButtonOne(event) {
        if (this.state == "ENTER_PIN_STATE") {
            let input = document.getElementById("input");
            if (input.value.length == 0 || input.value.length > 4 ) {
                alert("You have entered an invalid PIN. Please enter a correct PIN! ");
            } else {
                this.setState("MAIN_USER_SCREEN");
                this.changeButtonText();
                this.pin = document.getElementById("input").value;
                let data = new FormData();
                data.append("input", this.pin);
                let bustCache = '?' + new Date().getTime();
                let self = this;
                const XHR = new XMLHttpRequest();
                XHR.addEventListener("load",function() {
                    if (XHR.readyState == 4 && XHR.status == 200) {
                        let response = XHR.responseText;
                        if (response == "NULL") {
                            alert("Error logging you in. Try a different PIN!");
                            document.getElementById("output").innerText = "Error!";
                            document.getElementById("input").value = "";
                            document.getElementById("input").setAttribute("placeholder", "Enter PIN Here");
                            self.setState("ENTER_PIN_STATE");
                            self.changeButtonText();
                        } else {
                            document.getElementById("output").innerText = "Welcome, " + XHR.responseText;
                            document.getElementById("input").value = "";
                            document.getElementById("input").setAttribute("placeholder", " ");
                        }
                    }
                });
                XHR.open('POST', event.target.dataset.url + bustCache, true);
                XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                XHR.send(data);
            }
        } else if (this.state == "MAIN_USER_SCREEN") {
            let data = new FormData();
            data.append("input", this.pin);
            data.append("request", "balance");
            let bustCache = '?' + new Date().getTime();
            const XHR = new XMLHttpRequest();
            XHR.addEventListener("load",function() {
                if (XHR.readyState == 4 && XHR.status == 200) {
                    document.getElementById("output").innerText = "Your balance in both accounts is - " + XHR.responseText;
                }
            });
            XHR.open('POST', event.target.dataset.url + bustCache, true);
            XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            XHR.send(data);
        } else if (this.state == "TRANSFER") {
            this.savings = false;
            this.setState("TRANSFER_CONFIRM");
            this.changeButtonText();
        } else if (this.state == "WITHDRAW") {
            this.savings = false;
            this.setState("WITHDRAW_CONFIRM");
            this.changeButtonText();
        }  else if (this.state == "DEPOSIT") {
            this.savings = false;
            this.setState("DEPOSIT_CONFIRM");
            this.changeButtonText();
        } else if (this.state == "TRANSFER_CONFIRM") {
            try {
                let amount = parseFloat(document.getElementById("input").value);
                let data = new FormData();
                let accountData = 0;
                let self = this;

                if (self.savings) {
                    // Transfer from savings to checking
                    data.append("input", this.pin);
                    data.append("request", "transfer_from_savings");
                    data.append("data", amount + "");
                    let bustCache = '?' + new Date().getTime();
                    const XHR = new XMLHttpRequest();
                    XHR.addEventListener("load",function() {
                        if (XHR.readyState == 4 && XHR.status == 200) {
                            self.state = "TRANSFER";
                            self.changeButtonText();
                            document.getElementById("output").innerText = XHR.responseText;
                        }
                    });
                    XHR.open('POST', event.target.dataset.url + bustCache, true);
                    XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    XHR.send(data);
                } else {
                    // Transfer from checking to savings
                    data.append("input", this.pin);
                    data.append("request", "transfer_from_checking");
                    data.append("data", amount + "");
                    let bustCache = '?' + new Date().getTime();
                    const XHR = new XMLHttpRequest();
                    XHR.addEventListener("load",function() {
                        if (XHR.readyState == 4 && XHR.status == 200) {
                            // Display new amount
                            self.state = "TRANSFER";
                            self.changeButtonText();
                            document.getElementById("output").innerText = XHR.responseText;
                        }
                    });
                    XHR.open('POST', event.target.dataset.url + bustCache, true);
                    XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    XHR.send(data);
                }

            } catch(e) {
                alert("Error reading input! Please enter a valid dollar amount.")
                document.getElementById("input").value = "";
            }
        } else if (this.state == "WITHDRAW_CONFIRM") {
            try {
                let amount = parseFloat(document.getElementById("input").value);
                if (this.savings) {
                    // withdraw from savings

                    let data = new FormData();
                    let accountData = 0;
                    let self = this;
                    data.append("input", this.pin);
                    data.append("request", "withdraw_savings");
                    data.append("data", amount + "");
                    let bustCache = '?' + new Date().getTime();
                    const XHR = new XMLHttpRequest();
                    XHR.addEventListener("load",function() {
                        if (XHR.readyState == 4 && XHR.status == 200) {
                           // Display new amount
                            self.state = "WITHDRAW";
                            self.changeButtonText();
                            document.getElementById("output").innerText = XHR.responseText;
                        }
                    });
                    XHR.open('POST', event.target.dataset.url + bustCache, true);
                    XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    XHR.send(data);

                } else {
                    // withdraw from checking

                    let data = new FormData();
                    let accountData = 0;
                    let self = this;
                    data.append("input", this.pin);
                    data.append("request", "withdraw_checking");
                    data.append("data", amount + "");
                    let bustCache = '?' + new Date().getTime();
                    const XHR = new XMLHttpRequest();
                    XHR.addEventListener("load",function() {
                        if (XHR.readyState == 4 && XHR.status == 200) {
                            // Display new amount
                            self.state = "WITHDRAW";
                            self.changeButtonText();
                            document.getElementById("output").innerText = XHR.responseText;
                        }
                    });
                    XHR.open('POST', event.target.dataset.url + bustCache, true);
                    XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    XHR.send(data);
                }
            } catch(e) {
                alert("Error reading input! Please enter a valid dollar amount.")
                document.getElementById("input").value = "";
            }
        } else if (this.state == "DEPOSIT_CONFIRM") {
            try {
                let amount = parseFloat(document.getElementById("input").value);
                if (this.savings) {
                    // deposit into savings

                    let data = new FormData();
                    let accountData = 0;
                    let self = this;
                    data.append("input", this.pin);
                    data.append("request", "deposit_savings");
                    data.append("data", amount + "");
                    let bustCache = '?' + new Date().getTime();
                    const XHR = new XMLHttpRequest();
                    XHR.addEventListener("load",function() {
                        if (XHR.readyState == 4 && XHR.status == 200) {
                            // Display new amount
                            self.state = "DEPOSIT";
                            self.changeButtonText();
                            document.getElementById("output").innerText = XHR.responseText;
                        }
                    });
                    XHR.open('POST', event.target.dataset.url + bustCache, true);
                    XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    XHR.send(data);

                } else {
                    // deposit into checking

                    let data = new FormData();
                    let accountData = 0;
                    let self = this;
                    data.append("input", this.pin);
                    data.append("request", "deposit_checking");
                    data.append("data", amount + "");
                    let bustCache = '?' + new Date().getTime();
                    const XHR = new XMLHttpRequest();
                    XHR.addEventListener("load",function() {
                        if (XHR.readyState == 4 && XHR.status == 200) {
                            // Display new amount
                            self.state = "DEPOSIT";
                            self.changeButtonText();
                            document.getElementById("output").innerText = XHR.responseText;
                        }
                    });
                    XHR.open('POST', event.target.dataset.url + bustCache, true);
                    XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    XHR.send(data);
                }
            } catch(e) {
                alert("Error reading input! Please enter a valid dollar amount.")
                document.getElementById("input").value = "";
            }
        }
    }

    controlButtonTwo() {
        if (this.state == "ENTER_PIN_STATE") {

        } else if (this.state == "MAIN_USER_SCREEN") {
            this.setState("TRANSFER");
            this.changeButtonText();
        } else if (this.state == "TRANSFER") {
            this.savings = true;
            this.setState("TRANSFER_CONFIRM");
            this.changeButtonText();
        } else if (this.state == "WITHDRAW") {
            this.savings = true;
            this.setState("WITHDRAW_CONFIRM");
            this.changeButtonText();
        } else if (this.state == "DEPOSIT") {
            this.savings = true;
            this.setState("DEPOSIT_CONFIRM");
            this.changeButtonText();
        }
    }

    controlButtonThree() {
        if (this.state == "ENTER_PIN_STATE") {

        } else if (this.state == "MAIN_USER_SCREEN") {
            this.setState("WITHDRAW");
            this.changeButtonText();
        }
    }

    controlButtonFour() {
        if (this.state == "ENTER_PIN_STATE") {

        } else if (this.state == "MAIN_USER_SCREEN") {
            this.setState("DEPOSIT");
            this.changeButtonText();
        }
    }

    controlButtonFive() {

    }

    controlButtonSix() {
        if (this.state == "MAIN_USER_SCREEN") {
            this.setState("ENTER_PIN_STATE");
            document.getElementById("output").innerText = "Please enter your 4-digit PIN";
            document.getElementById("input").value = "";
            document.getElementById("input").setAttribute("placeholder", "Enter PIN Here");
            this.changeButtonText();
        } else if (this.state == "TRANSFER" || this.state == "WITHDRAW" || this.state == "DEPOSIT") {
            this.setState("MAIN_USER_SCREEN");
            this.changeButtonText();
            let data = new FormData();
            data.append("input", this.pin);
            let bustCache = '?' + new Date().getTime();
            const XHR = new XMLHttpRequest();
            XHR.addEventListener("load",function() {
                if (XHR.readyState == 4 && XHR.status == 200) {
                    document.getElementById("output").innerText = "Welcome, " + XHR.responseText;
                    document.getElementById("input").value = "";
                    document.getElementById("input").setAttribute("placeholder", " ");
                }
            });
            XHR.open('POST', event.target.dataset.url + bustCache, true);
            XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            XHR.send(data);
        } else if (this.state == "TRANSFER_CONFIRM") {
            this.setState("TRANSFER");
            this.changeButtonText();
        } else if (this.state == "WITHDRAW_CONFIRM") {
            this.setState("WITHDRAW");
            this.changeButtonText();
        } else if (this.state == "DEPOSIT_CONFIRM") {
            this.setState("DEPOSIT");
            this.changeButtonText();
        }
    }

}