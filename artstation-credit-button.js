// ==UserScript==
// @name         Artstation quick-credit creator
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a button to quickly copy to clipboard the artwork's title and author
// @author       Davide Stasio
// @match        https://www.artstation.com/artwork/*
// @icon         https://www.google.com/s2/favicons?domain=artstation.com
// @grant        none
// ==/UserScript==

function DeleteToast(container, toast) {
    var opacity = 1; // initial opacity
    var timer = setInterval(function () {
        if (opacity <= 0.1){
            clearInterval(timer);
            container.removeChild(toast);
        }
        toast.style.opacity = opacity;
        toast.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
        opacity -= opacity * 0.1;
    }, 50);
}

function SpawnToast() {
    var toast_container = document.getElementById("toast-container");
    if (toast_container == null)
    {
        toast_container = document.createElement("div");
        toast_container.setAttribute("id", "toast-container");
        toast_container.className = "toast-top-left";

        document.body.appendChild(toast_container);
    }


    var message = "Credit string copied to clipboard";
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.classList.add("toast-info");
    toast.setAttribute("aria-live", "polite");
    toast.style.display = "block";

    toast.innerHTML = 
    `<button type="button" class="toast-close-button" role="button">
    <i class="far fa-times"></i>
    </button>
    <div class="toast-title">Notice</div>
    <div class="toast-message">${message}</div>`;

    toast_container.insertBefore(toast, toast_container.firstElementChild);
    setTimeout(DeleteToast, 700, toast_container, toast);
}

function CopyCredit() {
    var credit_text = ""
    var title = document.querySelector("h1[ng-bind-html=project\\.title]").textContent;
    var author = document.querySelector("a[ng-bind-html*=project\\.user\\.full_name]").textContent;

    credit_text = title + " by " + author

    navigator.clipboard.writeText(credit_text);
    SpawnToast();
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

    button_col.appendChild(credit_button);
})();