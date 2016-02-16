/**
 * Created by Kyle Flynn on 2/15/2016.
 */
"use strict";

export default class LoadDataClass {
    constructor() {

    }

    loadData(filePath, callback) {
        let request = new XMLHttpRequest();
        request.open("GET", filePath, true);
        request.send();
        request.onload = function() {
            const COLUMNS = 3;
            let data, middleData, finalData = [];
            if (request.readyState === 4 && request.status === 200) {
                data = request.responseText.split(/\n/);
            }
            for (let i = 0; i < data.length; i++) {
                middleData = data[i].split(/:/);
                finalData[i] = []; //makes it an MD array
                for (let j = 0; j < COLUMNS; j++) {
                    finalData[i][j] = middleData[j];
                }
            }
            callback(finalData);
        };
    }

    printData(finalData) {
        for (let i = 0; i < finalData.length; i++) {
            for (let j = 0; j < 3; j++) {
                console.log(i + "," + j);
            }
        }
    }
}