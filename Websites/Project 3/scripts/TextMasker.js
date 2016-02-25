/**
 * Created by Administrator on 2/24/2016.
 */

"use strict";

export default class TextMasker {

    mask(textToHide) {
        let allElems = document.getElementsByTagName("*");

        for (let i = 0; i < allElems.length; i++) {
            if (allElems[i].innerText == textToHide) {
                allElems[i].style.display = "none";
            }
        }
    }

    unmask(textToReveal) {
        let allElems = document.getElementsByTagName("*");

        for (let i = 0; i < allElems.length; i++) {
            if (allElems[i].innerText == textToReveal) {
                allElems[i].style.display = "initial";
            }
        }
    }

}