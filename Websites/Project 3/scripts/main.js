/**
 * Created by Kyle Flynn on 2/14/2016.
 */
"use strict";

import SceneManager from './SceneManager';
import FormManager from './FormManager';
import SceneLoader from './SceneLoader';

window.onload = function() {

    let formHandler = new FormManager();
    let sceneManager = new SceneManager();

    sceneManager.init();
    formHandler.check(sceneManager.processAnswer);

};