/**
 * Created by Administrator on 2/23/2016.
 */

import SceneManager from './SceneManager';
import SceneLoader from './SceneLoader';

export default class Game {
    constructor() {

    }

    init() {
        let sceneManager = new SceneManager();
        SceneLoader.loadData("data/scene-0.csv", sceneManager.createScene);
    }

}