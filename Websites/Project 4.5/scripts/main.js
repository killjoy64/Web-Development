/**
 * Created by Administrator on 3/14/2016.
 */
"use strict";

import ClickHandler from "./ClickHandler";

window.onload = function() {
    let clickHandler = new ClickHandler();

    clickHandler.initButtonListeners();
};