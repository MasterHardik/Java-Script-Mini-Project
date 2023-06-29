let bulb = document.getElementById('bulb');
let slider = document.getElementById('slider');
let time = document.getElementById('time')

let interval = setInterval(() => {
    bulb.classList.toggle("bulb_on");
}, parseInt(slider.value));

slider.addEventListener("input", () => {
    time.innerHTML = slider.value + ' ms'
    clearInterval(interval);
    interval = setInterval(() => {
        bulb.classList.toggle("bulb_on");
    }, parseInt(slider.value));
});