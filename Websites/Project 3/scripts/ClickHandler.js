/**
 * Created by Kyle Flynn on 2/15/2016.
 */

export default class ClickHandler {

    constructor() {

    }

    init(submitID) {
        console.log("init");
        let submitBtn = document.getElementById(submitID);

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

}