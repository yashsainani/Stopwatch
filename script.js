const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const milliSeconds = document.getElementById('milliSeconds');
const dot = document.getElementById('dot');
const lap = document.getElementById('lap');
const lapDiv = document.querySelector('.lap-div');
milliSeconds.style.display = 'none';
dot.style.display = 'none';
lap.disabled = true;
let h = 0;
let m = 0;
let s = 0;
let ms = 0;
let toStop;
let lapper = [];

document.getElementById('start').addEventListener('click', () => {
    document.getElementById('start').disabled = true;
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
        lap.disabled = false;
    }, 10);
});

document.getElementById('stop').addEventListener('click', () => {
    clearInterval(toStop);
    document.getElementById('start').disabled = false;
});

document.getElementById('reset').addEventListener('click', () => {
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
    document.getElementById('start').disabled = false;
    lapDiv.innerHTML = "";
    lapper = [];
    lap.disabled = true;
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
        let div = `
            <div class="laps">
                <span>${idx + 1}</span>
                <div class="lap-time">
                    <span>${ele.hour}</span>
                    <span>:</span>
                    <span>${ele.minute}</span>
                    <span>:</span>
                    <span>${ele.second}</span>
                    <span>:</span>
                    <span>${ele.milliSecond}</span>
                </div>
            </div>    
        `;
    lapDiv.innerHTML += div;
    });
});