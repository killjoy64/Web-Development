/**
 * Created by Administrator on 3/14/2016.
 */
"use strict";

import ATM from './ATM';

window.onload = function() {
    ATM = new ATM();
    ATM.initButtons();
};