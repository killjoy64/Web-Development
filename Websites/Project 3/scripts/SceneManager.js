/**
 * Created by Administrator on 2/17/2016.
 */
"use strict";

import SceneLoader from './SceneLoader';

export default class SceneManager {

    constructor() {

    }

    init() {
        SceneLoader.loadData("data/scene-0.csv", this.showScene);
    }

    showScene(fileData) {
        console.log("Showing new scene");
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
    }

    processAnswer(pathChosen) {
        if (pathChosen == 1) {
            //SceneLoader.loadData("data/" + document.getElementById("option-one-loc").innerText, this.showScene);
            SceneLoader.loadData("data/scene-0.csv", this.showScene);
        }
        if (pathChosen == 2) {
            SceneLoader.loadData("data/" + document.getElementById("option-two-loc").innerText, this.showScene);
        }
    }

}