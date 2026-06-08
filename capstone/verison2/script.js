document.addEventListener('DOMContentLoaded', function(){
 
    'use strict';
    console.log('running js');
 
    //data
    const EXCHANGES = [
        { 
            dialogue: "Hey it is me. Are you there? I need you to come home. Can you come home? Please just come home soon",
            timerDuration: 12000,
            responseOptions: [
                "The weather has been really nice lately",
                "I think I left my keys on the counter.",
                "Did you see what happened at the game last night?",
                "I was thinking about getting a new plant for my room."
            ]    
        },
        {
            dialogue:"Why are you not answering me? I need you here. Something happened. Please. Come home.",
            timerDuration: 10000,
            responseOptions:[
                "I need to remember to buy groceries tomorrow.",
                "My friend just got a new job downtown.",
                "I have been really tired lately I think I need more sleep.",
                "There is a good movie playing this weekend."
            ]
        },
        {
            dialogue:"I can not do this alone. Please. Come home. I need you to come home now. Are you listening to me?",
            timerDuration: 8000,
            responseOptions:[
                "I forgot to water the plants again this morning.",
                "I think I want to redecorate my room soon.",
                "The coffee shop on fifth street closed down.",
                "I have been meaning to call you back about that."
            ]
        },
        {
            dialogue:"Please. Something happened and I am scared. I need you. Please come home.",
            timerDuration: 3500,
            responseOptions:[
                "My back has been hurting from sitting all day.",
                "I saw a dog on my walk today it was really cute.",
                "I think I want to try a new recipe this week.",
                "The bus was really late again this morning."
            ]
        },
        {
            dialogue:"Why won't you answer me? I need you. Please. Come home. I need you. Please",
            timerDuration: 3000,
            responseOptions: [
                "I really need to clean my room this weekend.",
                "I think the plant by the window is dying.",
                "I have not checked my email in three days.",
                "There was a long line at the store this morning."
            ]
        },
        {
            dialogue:"Please. Come home",
            timerDuration: 1000,
            responseOptions:[
                "I should probably go to bed earlier.",
                "I keep forgetting to reply to that message.",
                "It smells like rain outside today.",
                "I think I need a haircut soon."
            ]
        }
    ];
 
    // state
    let currentExchange = 0;
    let clockTween = null;
 
    // clock
    function initClock(){
        const clockEl = document.querySelector('#clock');
        if(!clockEl) return;
 
        clockEl.innerHTML = `<svg id="clock-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#1a1410" stroke="#c4956a" stroke-width="2"/>
        ${generateHourMarkers()}
        <line
            id="clock-hand"
            x1="50" y1="50"
            x2="50" y2="14"
            stroke="#c4956a"
            stroke-width="2"
            stroke-linecap="round"
            style="transform-origin: 50px 50px;"
        />
        <circle cx="50" cy="50" r="3" fill="#c4956a"/>
        </svg>`;
    }
 
    function generateHourMarkers(){
        let markers = '';
        for (let i = 0; i < 12; i++) {
            const angle = (i * 30) * (Math.PI / 180);
            const x1 = 50 + 38 * Math.sin(angle);
            const y1 = 50 - 38 * Math.cos(angle);
            const x2 = 50 + 43 * Math.sin(angle);
            const y2 = 50 - 43 * Math.cos(angle);
            markers += `<line 
                x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" 
                x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" 
                stroke="#c4956a" stroke-width="1.5" 
                stroke-linecap="round" opacity="0.5"/>`;
        }
        return markers;
    }
 
function startClock(duration){
    clearClock();

    const hand = document.querySelector('#clock-hand');
    if(!hand) return;

    hand.style.animation = 'none';
    hand.style.transform = 'rotate(0deg)';

    setTimeout(() => {
        hand.style.transition = `transform ${duration / 1000}s linear`;
        hand.style.transform = 'rotate(360deg)';
    }, 50);

    timerTimeout = setTimeout(() => handleResponse(), duration);
}

function clearClock(){
    const hand = document.querySelector('#clock-hand');
    if(hand){
        hand.style.transition = 'none';
        hand.style.transform = 'rotate(0deg)';
    }
    if(clockTween){
        clockTween.kill();
        clockTween = null;
    }
}
 
    // landing
    document.querySelector('#pick-up').addEventListener('click', function(){
        showScreen('screen-call');
        initClock();
        loadExchange(0);
    });

        // start ringing on page load
    const ring = document.querySelector('#phone-ring');
    ring.play();

    // stop ringing when user picks up
    document.querySelector('#pick-up').addEventListener('click', function(){
        ring.pause();
        ring.currentTime = 0;
        showScreen('screen-call');
        initClock();
        loadExchange(0);
    });
 
    // load exchange
    function loadExchange(index){
        if (index >= EXCHANGES.length){
            endCall();
            return;
        }
 
        const exchange = EXCHANGES[index];
 
        document.body.setAttribute('data-exchange', index + 1);
        document.querySelector('#response-option').classList.add('active');
 
        document.querySelector('#dialogue-text').textContent = exchange.dialogue;
 
        const buttons = document.querySelectorAll('.response-btn');
        buttons.forEach((btn, i) => {
            btn.textContent = exchange.responseOptions[i];
            btn.disabled = false;
            btn.onclick = () => handleResponse();
        });
 
        startClock(exchange.timerDuration);
    }
 
    // handle response
    function handleResponse(){
        clearClock();
 
        document.querySelectorAll('.response-btn').forEach(btn => btn.disabled = true);
 
        setTimeout(function(){
            currentExchange++;
            loadExchange(currentExchange);
        }, 500);
    }
 
    // end call 
    function endCall(){
        document.querySelector('#response-option').classList.remove('active');

        const endScreen = document.querySelector('#screen-end');
        showScreen('screen-end');

        // fade out after 2 seconds
        setTimeout(function(){
            endScreen.style.transition = 'opacity 1.5s ease';
            endScreen.style.opacity = '0';

            setTimeout(function(){
                // fully reset end screen before switching
                endScreen.style.transition = 'none';
                endScreen.style.opacity = '1';
                showScreen('screen-preprompts');
                // small delay so screen is fully visible before prompts start
                setTimeout(function(){
                    revealPrePrompts();
                }, 300);
            }, 1500);
        }, 2000);
    }
 
    // pre-prompts
    function revealPrePrompts(){
        const prompts = ['pre-prompt-1', 'pre-prompt-2', 'pre-prompt-3'];
        let i = 0;
 
        function showNext(){
            if (i >= prompts.length){
                showScreen('screen-reflection');
                return;
            }
 
            document.querySelector('#' + prompts[i]).classList.add('visible');
 
            setTimeout(function(){
                document.querySelector('#' + prompts[i]).classList.remove('visible');
                i++;
                setTimeout(showNext, 800);
            }, 2200);
        }
 
        showNext();
    }
 
    // submit response
    document.querySelector('#btn-submit').addEventListener('click', function(){
        const input = document.querySelector('#reflection-input').value.trim();
        if (!input) return;
 
        const Response = Parse.Object.extend('Response');
        const response = new Response();
        response.set('text', input);
        response.save().then(function(){
            showScreen('collective-display');
            loadCollectiveResponses();
        }).catch(function(error){
            console.error('Error saving response:', error);
        });
    });
 
    // collective display
    function loadCollectiveResponses(){
        const wall = document.querySelector('#response-wall');
        wall.innerHTML = '';
 
        const Response = Parse.Object.extend('Response');
        const query = new Parse.Query(Response);
        query.find().then(function(results){
            if (results.length === 0){
                wall.innerHTML = '<p>Be the first to respond.</p>';
                return;
            }
            results.forEach(function(result){
                const card = document.createElement('div');
                card.className = 'response-card';
                card.textContent = result.get('text');
                wall.appendChild(card);
            });
        }).catch(function(error){
            console.error('Error loading responses:', error);
        });
    }
 
    // answer again + retake
    document.querySelector('#answer-again').addEventListener('click', function(){
    document.querySelector('#reflection-input').value = '';
    showScreen('screen-reflection');
    });
 
    document.querySelector('#retake-call').addEventListener('click', function(){
        currentExchange = 0;
        document.body.setAttribute('data-exchange', '0');
        showScreen('screen-call');
        loadExchange(0);
    });
 
    // screen management
    function showScreen(id){
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.querySelector('#' + id).classList.add('active');
    }
 
});