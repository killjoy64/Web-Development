/**
 * Created by Kyle Flynn on 4/10/2016.
 */

"use strict";

export default class UserReader {
    constructor() {

    }

    static loadData(filePath, callback) {
        console.log("Requesting File: " + filePath);

        let request = new XMLHttpRequest();
        request.open("GET", "" + filePath, true);
        request.send();
        request.onload = function() {
            const COLUMNS = 4;
            let data, middleData, fileData = [];
            if (request.readyState === 4 && request.status === 200) {
                data = request.responseText.split(/\n/);
            }
            for (let i = 0; i < data.length; i++) {
                middleData = data[i].split(/,/);
                fileData[i] = []; //makes it an MD array
                for (let j = 0; j < COLUMNS; j++) {
                    fileData[i][j] = middleData[j];
                }
            }
            callback(fileData);
        };
    }
}