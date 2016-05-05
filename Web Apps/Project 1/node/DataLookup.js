"use strict";

class DataLookup {
    constructor(columns) {
        this.columns = columns;
        this.finalData = [];
    }

    setFinalData(dataPath) {
        const FS = require('fs');
        let fileHandle = FS.readFileSync(dataPath, 'utf8');
        let tempArray = fileHandle.split(/\r?\n/); //remove newlines
        for (let i = 0; i < tempArray.length; i++) {
            this.finalData[i] = tempArray[i].split(/,/).slice(0, this.columns);
        }
    }

    getFinalData() {
        return this.finalData;
    }

    writeDataFile_MD(dataPath, data, COLUMNS) {
        const FS = require('fs');
        FS.writeFileSync(dataPath, "");
        for (let i = 0; i < data.length; i++) {
            let line = "";
            for (let j = 0; j < COLUMNS; j++) {
                if (data[i][j] != 'undefined') {
                    if (j < COLUMNS - 1) {
                        line = line + data[i][j] + ',';
                    } else {
                        line = line + data[i][j] + '\n';
                    }
                }
            }
            let fileHandle = FS.appendFileSync(dataPath, line, 'utf8');
        }
        console.log("[System] Successfully wrote MD data to file");
    }

    writeDataFile_SD(dataPath, data) {
        const FS = require('fs');
        for (let i = 0; i < data.length; i++) {
            if (eval(i) + 1 == data.length) {
                let fileHandle = FS.appendFileSync(dataPath, data[i] + '\n', 'utf8');
            } else {
                let fileHandle = FS.appendFileSync(dataPath, data[i] + ',', 'utf8');
            }
        }
    }

}

module.exports = DataLookup;