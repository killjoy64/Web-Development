/**
 * Created by Administrator on 2/24/2016.
 */

"use strict";

export default class TextMasker {

    mask(textToHide) {
        if (document.getElementById("option-one-txt").innerText == textToHide) {
            document.getElementById("option-one").style.display = "none";
            document.getElementById("option-one-txt").style.display = "none";
        }
        if (document.getElementById("option-two-txt").innerText == textToHide) {
            document.getElementById("option-two").style.display = "none";
            document.getElementById("option-two-txt").style.display = "none";
        }
    }

    unmask(textToReveal) {
        if (document.getElementById("option-one-txt").innerText == textToReveal) {
            document.getElementById("option-one").style.display = "initial";
            document.getElementById("option-one-txt").style.display = "initial";
        }
        if (document.getElementById("option-two-txt").innerText == textToReveal) {
            document.getElementById("option-two").style.display = "initial";
            document.getElementById("option-two-txt").style.display = "initial";
        }
    }

}