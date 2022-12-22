/* Walibu
   MIT licence
 */
   
let distanceFluss_m = 1700.0;
let speedFluss_s100m = 65.4545; // corresponds 5.5km/h
let speedFluss_m_s = 1.5278;    // corresponds 5.5km/h
let athlet_s1 = 67.0;
let athlet_s2 = 95.0;


function init() {
    let distance = getURLParameter("distance");
    if (distance) {
        distanceFluss_m = parseInt(distance);
    }
    update();
}

function updateDistance() {
    let distance = parseInt(document.getElementsByName('tdistance')[0].value);
    if (!distance || !(distance > 0)) {
        document.getElementsByName('tdistance')[0].value = distanceFluss_m;
    } else {
        distanceFluss_m = distance;
    }
}

function updateSpeed() {
    let speed = parseFloat(document.getElementsByName('tspeed')[0].value);
    if (!speed || !(speed >= 0)) {
        document.getElementsByName('tspeed')[0].value = Math.round(3600 / speedFluss_s100m) / 10;
    } else {
        speedFluss_s100m = 360 / speed;
    }
    speedFluss_m_s = Math.round(1000 / speedFluss_s100m) / 10;
}

function updateAthlet() {
    let speed = parseInt(document.getElementsByName('ts1')[0].value);
    if (!speed || !(speed > 0)) {
        document.getElementsByName('ts1')[0].value = athlet_s1;
    } else {
        athlet_s1 = speed;
    }
    speed = parseInt(document.getElementsByName('ts2')[0].value);
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
    calculate();
}

function calculate() {
    let time1 = document.getElementsByName('ts1')[0].value;
    let time2 = document.getElementsByName('ts2')[0].value;

    let vTime1 = 100 / time1;
    let vTime2 = 100 / time2;
    let vFluss = 100 / speedFluss_s100m;

    let distanceSee = Math.round(distanceFluss_m *
        (1 / (vTime2 + vFluss) - 1 / (vTime1 + vFluss)) / (1 / vTime2 - 1 / vTime1));

    let distanceSeeT = Math.round(distanceFluss_m * vTime1 / (vTime1 + vFluss));

    let stime1 = distanceSee * time1 / 100;
    let stime2 = distanceSee * time2 / 100;
    let ftime1 = Math.round(distanceFluss_m / (vTime1 + vFluss));
    let ftime2 = Math.round(distanceFluss_m / (vTime2 + vFluss));
    if (ftime2 > ftime1) {}
    let fdelta = ftime2 - ftime1;
    if (ftime1 > ftime2) {
        fdelta = ftime1 - ftime2;
    }
    let sdelta = stime2 - stime1;
    if (stime1 > stime2) {
        sdelta = stime1 - stime2;
    }

    let ftime1T = Math.round(distanceSeeT / (vTime1)); // == stime1
    let ftime2T = Math.round(distanceSeeT / (vTime2));
    let fdeltaT = ftime2T - ftime1T;
    if (ftime1T > ftime2T) {
        fdeltaT = ftime1T - ftime2T;
    }

    document.getElementById("_distanceFluss").innerHTML = (distanceFluss_m) + " m";
    document.getElementById("fspeed_ms").innerHTML = (speedFluss_m_s) + " m/s";
    document.getElementById("_distanceSee").innerHTML = (distanceSee) + " m";
    document.getElementById("_distanceSeeT").innerHTML = (distanceSeeT) + " m";

    document.getElementById("_stime_s1").innerHTML = getMinSec(stime1);
    document.getElementById("_stime_s2").innerHTML = getMinSec(stime2);
    document.getElementById("_sdelta_s").innerHTML = getMinSec(sdelta);
    document.getElementById("_ftime_s1").innerHTML = getMinSec(ftime1);
    document.getElementById("_ftime_s2").innerHTML = getMinSec(ftime2);
    document.getElementById("_fdelta_s").innerHTML = getMinSec(fdelta);
    document.getElementById("_ftime_s1T").innerHTML = getMinSec(ftime1T);
    document.getElementById("_ftime_s2T").innerHTML = getMinSec(ftime2T);
    document.getElementById("_fdelta_sT").innerHTML = getMinSec(fdeltaT);
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
