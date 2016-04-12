/**
 * Created by Kyle Flynn on 4/11/2016.
 */

"use strict";

export default class ATM {
    constructor(data) {
        this.data = data;
        this.name = data[0];
        this.pin = data[1];
        this.savings = data[2];
        this.checking = data[3];
        this.transfer = false;
        this.withdraw = false;
    }

    init() {
        document.getElementById("console").innerText = "Welcome, " + this.name;
        document.getElementById("input-window").value = "";

        document.getElementById("button-1").innerText = "EXIT";
        document.getElementById("button-2").innerText = "BALANCES";
        document.getElementById("button-3").innerText = "TRANSFER";
        document.getElementById("button-4").innerText = "WITHDRAW";

        let self = this;


        document.getElementById("button-1").addEventListener("click", function() {
            if (document.getElementById("button-3").innerText == "TRANSFER") {
                document.getElementById("button-1").innerText = "Enter";
                document.getElementById("button-2").innerText = "";
                document.getElementById("button-3").innerText = "";
                document.getElementById("button-4").innerText = "";
                document.getElementById("console").innerText = "Enter your PIN number";
                document.getElementById("input-window").value = "";
            } else {
                document.getElementById("button-1").innerText = "EXIT";
                document.getElementById("button-2").innerText = "BALANCES";
                document.getElementById("button-3").innerText = "TRANSFER";
                document.getElementById("button-4").innerText = "WITHDRAW";

                self.transfer = false;
                self.withdraw = false;
            }
        });
        document.getElementById("button-2").addEventListener("click", function() {
            if (document.getElementById("button-2").innerText == "BALANCES") {
                document.getElementById("console").innerText = "Checking - $" + self.checking + " Savings - $" + self.savings;
            }
        });
        document.getElementById("button-3").addEventListener("click", function() {
            if (document.getElementById("button-3").innerText == "TRANSFER") {
                document.getElementById("console").innerText = "Would you like to transfer from checking or savings?";
                document.getElementById("button-3").innerText = "CHECKING";
                document.getElementById("button-4").innerText = "SAVINGS";
                self.transfer = true;
            } else if (document.getElementById("button-3").innerText == "CHECKING") {
                if (self.transfer) {
                    document.getElementById("console").innerText = "Enter amount to transfer";
                    document.getElementById("button-3").innerText = "CONFIRM";
                    document.getElementById("button-4").innerText = "";
                } else if (self.withdraw) {
                    document.getElementById("console").innerText = "Enter amount to withdraw";
                    document.getElementById("button-3").innerText = "CONFIRM";
                    document.getElementById("button-4").innerText = "";
                }
            } else if (document.getElementById("button-3").innerText == "CONFIRM") {
                if (self.transfer) {
                    try {
                        let amount = parseFloat(document.getElementById("input-window").value);
                        if (amount > self.checking) {
                            alert("YOU DO NOT HAVE SUFFICIENT FUNDS. NICE TRY.");
                        } else {
                            let oldChecking = parseFloat(self.checking);
                            let oldSavings = parseFloat(self.savings);
                            self.checking = oldChecking - amount;
                            self.savings = oldSavings + amount;
                            document.getElementById("console").innerText = "New savings balance - $" + self.savings;
                            document.getElementById("input-window").value = "";

                            document.getElementById("button-1").innerText = "EXIT";
                            document.getElementById("button-2").innerText = "BALANCES";
                            document.getElementById("button-3").innerText = "TRANSFER";
                            document.getElementById("button-4").innerText = "WITHDRAW";

                            self.transfer = false;
                            self.withdraw = false;
                        }
                    } catch (e) {
                        alert("Error reading amount, please try again!");
                    }
                } else if (self.withdraw) {
                    try {
                        let amount = parseFloat(document.getElementById("input-window").value);
                        if (amount > self.checking) {
                            alert("YOU DO NOT HAVE SUFFICIENT FUNDS. NICE TRY.");
                        } else {
                            let oldChecking = parseFloat(self.checking);
                            self.checking = oldChecking - amount;
                            document.getElementById("console").innerText = "New checking balance - $" + self.checking;
                            document.getElementById("input-window").value = "";

                            document.getElementById("button-1").innerText = "EXIT";
                            document.getElementById("button-2").innerText = "BALANCES";
                            document.getElementById("button-3").innerText = "TRANSFER";
                            document.getElementById("button-4").innerText = "WITHDRAW";

                            self.transfer = false;
                            self.withdraw = false;
                        }
                    } catch (e) {
                        alert("Error reading amount, please try again!");
                    }
                }
            }
        });
        document.getElementById("button-4").addEventListener("click", function() {
            if (document.getElementById("button-4").innerText == "WITHDRAW") {
                document.getElementById("console").innerText = "Would you like to withdraw from checking or savings?";
                document.getElementById("button-3").innerText = "CHECKING";
                document.getElementById("button-4").innerText = "SAVINGS";
                self.withdraw = true;
            } else if (document.getElementById("button-4").innerText == "SAVINGS") {
                if (self.transfer) {
                    document.getElementById("console").innerText = "Enter amount to transfer";
                    document.getElementById("button-4").innerText = "CONFIRM";
                    document.getElementById("button-3").innerText = "";
                } else if (self.withdraw) {
                    document.getElementById("console").innerText = "Enter amount to withdraw";
                    document.getElementById("button-4").innerText = "CONFIRM";
                    document.getElementById("button-3").innerText = "";
                }
            } else if (document.getElementById("button-4").innerText == "SAVINGS") {
                if (self.transfer) {
                    try {
                        let amount = parseFloat(document.getElementById("input-window").value);
                        if (amount > self.savings) {
                            alert("YOU DO NOT HAVE SUFFICIENT FUNDS. NICE TRY.");
                        } else {
                            let oldChecking = parseFloat(self.checking);
                            let oldSavings = parseFloat(self.savings);
                            self.checking = oldChecking + amount;
                            self.savings = oldSavings - amount;
                            document.getElementById("console").innerText = "New checking balance - $" + self.checking;
                            document.getElementById("input-window").value = "";

                            document.getElementById("button-1").innerText = "EXIT";
                            document.getElementById("button-2").innerText = "BALANCES";
                            document.getElementById("button-3").innerText = "TRANSFER";
                            document.getElementById("button-4").innerText = "WITHDRAW";

                            self.transfer = false;
                            self.withdraw = false;
                        }
                    } catch (e) {
                        alert("Error reading amount, please try again!");
                    }
                } else if (self.withdraw) {
                    try {
                        let amount = parseFloat(document.getElementById("input-window").value);
                        if (amount > self.savings) {
                            alert("YOU DO NOT HAVE SUFFICIENT FUNDS. NICE TRY.");
                        } else {
                            let oldSavings = parseFloat(self.savings);
                            self.savings = oldSavings - amount;
                            document.getElementById("console").innerText = "New savings balance - $" + self.savings;
                            document.getElementById("input-window").value = "";

                            document.getElementById("button-1").innerText = "EXIT";
                            document.getElementById("button-2").innerText = "BALANCES";
                            document.getElementById("button-3").innerText = "TRANSFER";
                            document.getElementById("button-4").innerText = "WITHDRAW";

                            self.transfer = false;
                            self.withdraw = false;
                        }
                    } catch (e) {
                        alert("Error reading amount, please try again!");
                    }
                }
            }
        });
    }

    checkButtonTwo() {
        console.log(this.savings);

    }

}
