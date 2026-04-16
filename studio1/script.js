(function(){
    'use strict'

    console.log("running js");

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