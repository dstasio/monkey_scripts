// ==UserScript==
// @name         Artstation quick-credit creator
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a button to quickly copy to clipboard the artwork's title and author
// @author       Davide Stasio
// @match        https://www.artstation.com/artwork/*
// @icon         https://www.google.com/s2/favicons?domain=artstation.com
// @grant        none
// ==/UserScript==

function CopyCredit() {
    var credit_text = ""
    var title = document.querySelector("h1[ng-bind-html=project\\.title]").textContent;
    var author = document.querySelector("a[ng-bind-html*=project\\.user\\.full_name]").textContent;

    credit_text = title + " by " + author

    navigator.clipboard.writeText(credit_text);
    alert("Credit copied to clipboard");
}

(function() {
    'use strict';

    var button_block = document.getElementsByClassName("button-blocks")[0];
    var button_row = button_block.getElementsByClassName("row")[0];
    var button_col = button_row.getElementsByClassName("col-xs-6");
    button_col = button_col[button_col.length - 1];

    var credit_button = button_col.firstElementChild.cloneNode(false);
    credit_button.appendChild(document.createTextNode("Copy credit"));
    credit_button.removeAttribute("ng-authorized-click");
    credit_button.addEventListener("click", CopyCredit);

    console.log(credit_button);

    button_col.appendChild(credit_button);
})();