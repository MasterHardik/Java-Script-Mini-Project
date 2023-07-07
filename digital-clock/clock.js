let tick_sound = new Audio('Clock-Ticking-C.mp3')
let img = document.getElementById('sound')
let play = false;

document.querySelector(".clock .hours").innerHTML = (
    new Array(24).fill(0).map((n, i) => {
        return `
        <div data-label="Hours">
            ${i < 10 ? "0" + i : i}
        </div>
        `;
    }).join("")
);
document.querySelector(".clock .minutes").innerHTML = (
    new Array(60).fill(0).map((n, i) => {
        return `
        <div data-label="Minutes">
            ${i < 10 ? "0" + i : i}
        </div>
        `;
    }).join("")
);
document.querySelector(".clock .seconds").innerHTML = (
    new Array(60).fill(0).map((n, i) => {
        return `
        <div data-label="Seconds">
            ${i < 10 ? "0" + i : i}
        </div>
        `;
    }).join("")
);

let time = new Date();
let prevHours = time.getHours() * 100,
prevMinutes = time.getMinutes() * 100,
prevSeconds = time.getSeconds() * 100;

document.querySelector(".clock .hours div").style.marginTop =
`-${prevHours}px`;
document.querySelector(".clock .minutes div").style.marginTop =
`-${prevMinutes}px`;
document.querySelector(".clock .seconds div").style.marginmarginTop = `-${prevSeconds}px`;


updateClock = () => {
    if (play == true) {
        tick_sound.play()
        img.src = 'sound_on_lmode.png'
    }
    else {
        tick_sound.pause();  
        img.src = 'sound_off_lmode.png'
    } 
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    if (prevHours !== hours) {
        prevHours = hours;
        document.querySelector(".clock .hours div").style.marginTop =
            `-${hours * 100}px`;
        document.querySelector(".clock .hours").classList.add("animate");
        setTimeout(function () {
            document.querySelector(".clock .hours").classList.remove("animate");
        }, 800);
    }
    if (prevMinutes !== minutes) {
        prevMinutes = minutes;
        document.querySelector(".clock .minutes div").style.marginTop =
            `-${minutes * 100}px`;
        document.querySelector(".clock .minutes").classList.add("animate");
        setTimeout(function () {
            document.querySelector(".clock .minutes").classList.remove("animate");
        }, 800);
    }
    if (prevSeconds !== seconds) {
        prevSeconds = seconds;
        document.querySelector(".clock .seconds div").style.marginTop =
            `-${seconds * 100}px`;
        document.querySelector(".clock .seconds").classList.add("animate");
        setTimeout(function () {
            document.querySelector(".clock .seconds").classList.remove("animate");
        }, 800);
    }
}

setInterval(updateClock, 1000);

play_pause = () => {
    play = !play
}