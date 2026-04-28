(function(){

async function getData() {
    const myTimes = await fetch('data.json');
    const data = await myTimes.json();
    console.log("Loaded data:", data);

    buildDataButtons(data.times_home);
    
}
getData();

function createDigit(){
    const digit = document.createElement("div");
    digit.classList.add("digit");
    digit.textContent = "-"
    return digit;
}

function createDigitGroup(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    const d1 = createDigit();
    const d2 = createDigit();

    container.appendChild(d1);
    container.appendChild(d2);

    return [d1, d2];
}

const [h1, h2] = createDigitGroup("hours");
const [m1, m2] = createDigitGroup("minutes");
const ampmEl = document.getElementById("ampm");

function displayTime(timeString) {
    const [time, ampm] = timeString.split(" ");
    const [hourStr, minuteStr] = time.split(":");

    ampmEl.textContent = ampm;

    const h = hourStr.padStart(2, "0");
    const m = minuteStr.padStart(2, "0");

    h1.textContent = h[0];
    h2.textContent = h[1];
    m1.textContent = m[0];
    m2.textContent = m[1];
}

const dayBtnsContainer = document.getElementById("day-btns");
const selectedLabel = document.getElementById("selected-label");

function buildDataButtons(timesArray){
    dayBtnsContainer.innerHTML = "";
    
    for (var i = 0; i < timesArray.length; i++) {
        (function (entry) {
            var date = entry.date;
            var time = entry.times[0];

            var btn = document.createElement("button");
            btn.textContent = formatDateLabel(date);

            btn.addEventListener("click", function () {
                var allBtns = document.querySelectorAll(".btn-row button");
                for (var j = 0; j < allBtns.length; j++) {
                    allBtns[j].classList.remove("selected");
                }

                btn.classList.add("selected");

                selectedLabel.textContent = formatDateLabel(date) + " — " + time;

                displayTime(time);
            });

                dayBtnsContainer.appendChild(btn);
        })(timesArray[i]);
    } 
}
function formatDateLabel(isoDate) {
        var d = new Date(isoDate);
        var options = { weekday: "short", month: "short", day: "numeric" };
        return d.toLocaleDateString("en-US", options);
    }

})();