(function(){
    'use strict'

    console.log("running js");

    window.addEventListener("load", function(){

        const loader = document.querySelector("#loader");

        loader.style.opacity = "0";

        setTimeout(function(){
            loader.style.display = "none";
        }, 400)

    }());

    const hoverText = document.querySelector("#hover");

    const phrases = [
    "Lock In Twin",
    "Keep going.",
    "It will all be worth it in the end",
    "Focus up.",
    "One more try.",
    "You're doing great."
    ];

    let index = 0;

    hoverText.addEventListener("mouseenter", function() {
        index = (index + 1) % phrases.length;
        hoverText.textContent = phrases[index];
    });


}());