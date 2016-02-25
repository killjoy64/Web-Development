/**
 * Created by Administrator on 2/17/2016.
 */
"use strict";

import SceneLoader from './SceneLoader';
import TextMasker from './TextMasker';

export default class SceneManager {

    constructor() {

    }

    init() {
        let sceneManager = new SceneManager();

        SceneLoader.loadData("data/scene-0.csv", sceneManager.createScene);
    }

    createScene(fileData) {
        let sceneManager = new SceneManager();
        let textMasker = new TextMasker();

        textMasker.unmask("null");
        sceneManager.clearFields();

        const COLUMNS = 2;

        for (let i = 0; i < fileData.length; i++) {
            for (let j = 0; j < COLUMNS; j++) {
                if (fileData[i][0] == "descr") {
                    document.getElementById("path-descr").innerText = fileData[i][j];
                }
                if (fileData[i][0] == "o-1") {
                    document.getElementById("option-one-txt").innerText = fileData[i][j];
                }
                if (fileData[i][0] == "o-2") {
                    document.getElementById("option-two-txt").innerText = fileData[i][j];
                }
                if (fileData[i][0] == "1") {
                    document.getElementById("option-one-loc").innerText = fileData[i][1];
                }
                if (fileData[i][0] == "2") {
                    document.getElementById("option-two-loc").innerText = fileData[i][1];
                }
            }
        }

        textMasker.mask("null");

        document.getElementById("continue-btn").addEventListener("click", sceneManager.processAnswer);
    }

    clearFields() {
        document.getElementById("path-descr").innerText = "";
        document.getElementById("option-one-txt").innerText = "null";
        document.getElementById("option-two-txt").innerText = "null";
        document.getElementById("option-one-loc").innerText = "";
        document.getElementById("option-two-loc").innerText = "";
        document.getElementById("option-one").checked = false;
        document.getElementById("option-two").checked = false;
    }

    processAnswer() {
        let sceneManager = new SceneManager();

        let pathOneChecked = document.getElementById("option-one").checked;
        let pathTwoChecked = document.getElementById("option-two").checked;

        let pathOneHasValue = document.getElementById("option-one-txt").innerText != "null";
        let pathTwoHasValue = document.getElementById("option-two-txt").innerText != "null";

        if (pathOneChecked && pathOneHasValue) {
            SceneLoader.loadData("data/" + document.getElementById("option-one-loc").innerText, sceneManager.createScene);
        } else if (pathTwoChecked && pathTwoHasValue) {
            SceneLoader.loadData("data/" + document.getElementById("option-two-loc").innerText, sceneManager.createScene);
        } else {
            alert("You must choose a path, sir!");
        }
    }

}