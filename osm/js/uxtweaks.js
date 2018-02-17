/*jslint browser:true */

var input = document.getElementById("addr");
input.addEventListener("keyup", function (event) {
    "use strict";
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("search_btn").click();
    }
});