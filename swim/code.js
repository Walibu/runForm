/* Walibu
   MIT licence */
   
let distanceSee_m = 300;
let speedFluss_s100m = 60;
let athlet_s1 = 67;
let athlet_s2 = 95;


function init() {
    let speed = getURLParameter("speedFluss_s100m");
    if (speed) {
        speedFluss_s100m = speed;
    }
    updateDistance();
    updateSpeed();
    updateAthlet();
}

function updateDistance() {
    let distance = document.getElementsByName('tdistance')[0].value;
    if (!distance || !(distance > 0)) {
        document.getElementsByName('tdistance')[0].value = distanceSee_m;
    }
}

function updateSpeed() {
    let speed = document.getElementsByName('tspeed')[0].value;
    if (!speed || !(speed > 0)) {
        document.getElementsByName('tspeed')[0].value = speedFluss_s100m;
    }
}

function updateAthlet() {
    let speed = document.getElementsByName('ts1')[0].value;
    if (!speed || !(speed > 0)) {
        document.getElementsByName('ts1')[0].value = athlet_s1;
    }
    speed = document.getElementsByName('ts2')[0].value;
    if (!speed || !(speed > 0)) {
        document.getElementsByName('ts2')[0].value = athlet_s2;
    }
}

function getURLParameter(name) {
    return decodeURIComponent(
        (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
            .exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')
    ) || null;
}

function calculate() {
    update();
}

function update() {
    let ftime1 = document.getElementsByName('ts1')[0].value;
    let ftime2 = document.getElementsByName('ts2')[0].value;
    let fdelta = 30;
    let stime1 = 200;
    let stime2 = 300;
    let sdelta = 30;
    let distanceFluss = distanceSee_m * speedFluss_s100m / 10;

    document.getElementById("_distanceFluss").innerHTML = "<span>" + (distanceFluss) + " m</span>";
    document.getElementById("_distanceSee").innerHTML = "<span>" + (distanceSee_m) + " m</span>";

    document.getElementById("_ftime_s1").innerHTML = "<span>" + (ftime1) + " s</span>";
    document.getElementById("_ftime_s2").innerHTML = "<span>" + (ftime2) + " s</span>";
    document.getElementById("_fdelta_s").innerHTML = "<span>" + (fdelta) + " s</span>";
    document.getElementById("_stime_s1").innerHTML = "<span>" + (stime1) + " s</span>";
    document.getElementById("_stime_s2").innerHTML = "<span>" + (stime2) + " s</span>";
    document.getElementById("_sdelta_s").innerHTML = "<span>" + (sdelta) + " s</span>";
}
