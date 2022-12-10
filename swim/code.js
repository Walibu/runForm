/* Walibu
   MIT licence */
   
let distanceSee_m = 300;
let speedFluss_s100m = 60;
let speedFluss_m_s = 1.67;
let athlet_s1 = 67;
let athlet_s2 = 95;


function init() {
    let speed = getURLParameter("speedFluss_s100m");
    if (speed) {
        speedFluss_s100m = speed;
    }
    update();
}

function updateDistance() {
    let distance = document.getElementsByName('tdistance')[0].value;
    if (!distance || !(distance > 0)) {
        document.getElementsByName('tdistance')[0].value = distanceSee_m;
    } else {
        distanceSee_m = distance;
    }
}

function updateSpeed() {
    let speed = document.getElementsByName('tspeed')[0].value;
    if (!speed || !(speed > 0)) {
        document.getElementsByName('tspeed')[0].value = 360 / speedFluss_s100m;
    } else {
        speedFluss_s100m = 360 / speed;
    }
}

function updateAthlet() {
    let speed = document.getElementsByName('ts1')[0].value;
    if (!speed || !(speed > 0)) {
        document.getElementsByName('ts1')[0].value = athlet_s1;
    } else {
        athlet_s1 = speed;
    }
    speed = document.getElementsByName('ts2')[0].value;
    if (!speed || !(speed > 0)) {
        document.getElementsByName('ts2')[0].value = athlet_s2;
    } else {
        athlet_s2 = speed;
    }
}

function getURLParameter(name) {
    return decodeURIComponent(
        (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
            .exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')
    ) || null;
}

function update() {
    updateDistance();
    updateSpeed();
    updateAthlet();
}

function calculate() {
    update();

    let time1 = document.getElementsByName('ts1')[0].value;
    let time2 = document.getElementsByName('ts2')[0].value;
    let stime1 = distanceSee_m * time1 / 100;
    let stime2 = distanceSee_m * time2 / 100;

    let vTime1 = 100 / time1;
    let vTime2 = 100 / time2;
    let vFluss = 100 / speedFluss_s100m;

    let distanceFluss = Math.round(distanceSee_m *
        (1 / vTime2 - 1 / vTime1) / (1 / (vTime2 + vFluss) - 1 / (vTime1 + vFluss)));

    let ftime1 = Math.round(distanceFluss / (vTime1 + vFluss));
    let ftime2 = Math.round(distanceFluss / (vTime2 + vFluss));
    if (ftime2 > ftime1) {}
    let fdelta = ftime2 - ftime1;
    if (ftime1 > ftime2) {
        fdelta = ftime1 - ftime2;
    }
    let sdelta = stime2 - stime1;
    if (stime1 > stime2) {
        sdelta = stime1 - stime2;
    }

    document.getElementById("_distanceFluss").innerHTML = "<span>" + (distanceFluss) + " m</span>";
    document.getElementById("_distanceSee").innerHTML = "<span>" + (distanceSee_m) + " m</span>";

    document.getElementById("_ftime_s1").innerHTML = "<span>" + getMinSec(ftime1) + "</span>";
    document.getElementById("_ftime_s2").innerHTML = "<span>" + getMinSec(ftime2) + "</span>";
    document.getElementById("_fdelta_s").innerHTML = "<span>" + getMinSec(fdelta) + "</span>";
    document.getElementById("_stime_s1").innerHTML = "<span>" + getMinSec(stime1) + "</span>";
    document.getElementById("_stime_s2").innerHTML = "<span>" + getMinSec(stime2) + "</span>";
    document.getElementById("_sdelta_s").innerHTML = "<span>" + getMinSec(sdelta) + "</span>";
}

function getMinSec(time) {
    if (time > 0) {
        let min = Math.floor(time / 60);
        let secs = Math.round(time % 60);
        if (secs < 10) {
            return min + ":0" + secs;
        } else {
            return min + ":" + secs;
        }
    } else {
        return "-:-";
    }
}
