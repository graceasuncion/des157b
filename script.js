(function(){

    'use strict';
    
    const button = document.querySelector('#toggle');
    const body = document.querySelector('body');
    const h1 = document.querySelector('header h1');

    let mode = 'day';

    button.addEventListener('click', function(){

        if(mode ==='day'){
            body.classList.add('night');
            button.classList.add('night');
            mode = "night";
        } else {
            body.classList.remove('night');
            button.classList.remove('night');
            mode = 'day';
        }

    });

}());