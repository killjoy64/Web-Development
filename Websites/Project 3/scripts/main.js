/**
 * Created by Kyle Flynn on 2/14/2016.
 */
"use strict";

window.onload = function() {
    let submitBtn = document.getElementById("submit");

    submitBtn.addEventListener("click", function() {
        let pathOneChecked = document.getElementById("option-one").checked;
        let pathTwoChecked = document.getElementById("option-two").checked;

        if (pathOneChecked) {
            alert("You selected path one!");
        } else if (pathTwoChecked) {
            alert("You selected path two!");
        } else {
            alert("You need to select an answer!")
        }
    });
}