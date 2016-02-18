/**
 * Created by Kyle Flynn on 2/15/2016.
 */
"use strict";
import SceneLoader from './SceneLoader';

export default class FormManager {

    constructor() {

    }

    check(callback) {
        document.getElementById("submit").addEventListener("click", function() {
            let pathOneChecked = document.getElementById("option-one").checked;
            let pathTwoChecked = document.getElementById("option-two").checked;
            let pathChosen = 0;

            if (pathOneChecked) {
                pathChosen = 1;
            } else if (pathTwoChecked) {
                pathChosen = 2;
            } else {
                pathChosen = 0;
                alert("CHOOSE A PATH!");
            }
            callback(pathChosen);
        });
    }



}