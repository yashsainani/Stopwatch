const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const milliSeconds = document.getElementById('milliSeconds');
const dot = document.getElementById('dot');
const lap = document.getElementById('lap');
const lapDiv = document.querySelector('.lap-div');
milliSeconds.style.display = 'none';
dot.style.display = 'none';
let h = 0;
let m = 0;
let s = 0;
let ms = 0;
let toStop;
let lapper = [];

start.addEventListener('click', () => {
    start.disabled = true;
    start.classList.add('start');
    stop.disabled = false;
    stop.classList.add('stop');
    reset.disabled = false;
    reset.classList.add('reset');
    lap.disabled = false;
    lap.classList.add('lap');
    toStop = setInterval(() => {
        milliSeconds.style.display = 'inline-block';
        dot.style.display = 'inline-block';
        ms ++;
        if (ms === 100) {
            ms = 0;
            s ++;
        }
        if (s === 60) {
            s = 0;
            m ++;
        }
        if (m === 60) {
            m = 0;
            h ++;
        }
        hours.innerText = h < 10 ? `0${h}` : h;
        minutes.innerText = m < 10 ? `0${m}` : m;
        seconds.innerText = s < 10 ? `0${s}` : s;
        milliSeconds.innerText = ms < 10 ? `0${ms}` : ms;
    }, 10);
});

stop.addEventListener('click', () => {
    clearInterval(toStop);
    start.disabled = false;
    start.classList.remove('start');
    stop.disabled = true;
    stop.classList.remove('stop');
});

reset.addEventListener('click', () => {
    h = 0;
    m = 0;
    s = 0;
    ms = 0;
    milliSeconds.style.display = 'none';
    dot.style.display = 'none';
    hours.innerText = '00';
    minutes.innerText = '00';
    seconds.innerText = '00';
    milliSeconds.innerText = '00';
    clearInterval(toStop);
    start.disabled = false;
    start.classList.remove('start');
    lapDiv.innerHTML = "";
    lapper = [];
    lap.disabled = true;
    lap.classList.remove('lap');
    reset.disabled = true;
    reset.classList.remove('reset');
});

lap.addEventListener('click', () => {
    let obj = {
        hour : h,
        minute : m,
        second : s,
        milliSecond : ms
    }
    lapper.push(obj);
    lapDiv.innerHTML = "";
    lapper.forEach((ele, idx) => {
        let hr = ele.hour < 10 ? `0${ele.hour}` : ele.hour;
        let mi = ele.minute < 10 ? `0${ele.minute}` : ele.minute;
        let se = ele.second < 10 ? `0${ele.second}` : ele.second;
        let millis = ele.milliSecond < 10 ? `0${ele.milliSecond}` : ele.milliSecond;
        let div = `
            <div class="laps">
                <span>${idx + 1}</span>
                <div class="lap-time">
                    <span>${hr}</span>
                    <span>:</span>
                    <span>${mi}</span>
                    <span>:</span>
                    <span>${se}</span>
                    <span>:</span>
                    <span>${millis}</span>
                </div>
            </div>    
        `;
    lapDiv.innerHTML += div;
    });
});