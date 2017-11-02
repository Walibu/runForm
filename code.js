   
   
let distance = 1000;
let ts10s = 0;

const limit0 = 0;
const limit1 = 70;
const limit2 = 83;
const limit3 = 93;
const limit4 = 103;
const limitX = 999;
const minThreshold = 10; // 10 Meter pro 10s
const maxThreshold = 100; // 100 Meter pro 10s


function initValues() {
    const params = new URLSearchParams(document.location.search.substring(1));
    distance = parseInt(params.get("distance"));
    if (distance && distance > 0) {
        document.getElementsByName('distance')[0].value = distance;
    } else {
        updateDistance();   
    }
    if( supports_html5_storage() == true ) {
        let savedUsers = localStorage.getItem("allUsers");
        let myUsers = null;
        if (savedUsers) {
            myUsers = savedUsers.split(',');
        }
        if (myUsers && myUsers.length > 0) {
            setName(myUsers[0]);
            updateUserList(myUsers);
            initUserData();
            setDeleteButtonName(myUsers[0]);
        } else {
            myUsers = [""];
            localStorage.setItem("allUsers", myUsers);
            updateUserList(myUsers);
            setDeleteButtonName("");
        }
    } else {
        document.getElementById('userchoice').disabled = "disabled";
        document.getElementById('savebutton').disabled = "disabled";
        document.getElementById('deletebutton').disabled = "disabled";
        document.getElementById('userchoice').title = "not supported by browser";
        document.getElementById('savebutton').title = "not supported by browser";
        document.getElementById('deletebutton').title = "not supported by browser";
    }
}
function updateUserList(users) {
    let userList = document.getElementsByName('identityList')[0];
    userList.innerHTML = "";
    for (let i = 0; i < users.length; i++) {
        userList.innerHTML += '<option value="' + users[i] + '">' + users[i] + '</option>\n';
    }
    if (users.length > 1) {
        userList.disabled = "";
        document.getElementById('userList').setAttribute("style", "display:inline;");
    } else {
        userList.disabled = "disabled";
        document.getElementById('userList').setAttribute("style", "display:none;");
    }
}
function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

function updateDistance() {
    distance = document.getElementsByName('distance')[0].value;
    if (!distance || !(distance > 0)) {
        distance = document.getElementsByName('distance')[0].value = 1000;
    }
}
function initUserData() {
    if( supports_html5_storage() == true ) {
        let name = getName();
        
        let savedUserData = localStorage.getItem(name);
        let userData = null;
        if (savedUserData) {
            userData = savedUserData.split(',');
        }
        if (userData && userData.length > 9) {
            document.getElementsByName("veryeasy-min")[0].value = userData[0];
            document.getElementsByName("veryeasy-sec")[0].value = userData[1];
            document.getElementsByName("easy-min")[0].value = userData[2];
            document.getElementsByName("easy-sec")[0].value = userData[3];
            document.getElementsByName("moderate-min")[0].value = userData[4];
            document.getElementsByName("moderate-sec")[0].value = userData[5];
            document.getElementsByName("fast-min")[0].value = userData[6];
            document.getElementsByName("fast-sec")[0].value = userData[7];
            document.getElementsByName("maxspeed-min")[0].value = userData[8];
            document.getElementsByName("maxspeed-sec")[0].value = userData[9];
            if (userData[10] > 0) {
                distance = userData[10];
            } else {
                distance = 1000;
            }
            document.getElementsByName('distance')[0].value = userData[10];
            calc();
        }
    }
}
function saveUserData() {
    calc();
    if (supports_html5_storage() == true ) {
        let myUsers = localStorage.getItem("allUsers").split(',');
        let name = getName();
        if (myUsers) {
            if (!myUsers.includes(name)) {
                myUsers.push(name);
                localStorage.setItem("allUsers", myUsers);
                updateUserList(myUsers);
            }
        } else {
            localStorage.setItem("allUsers", [name]);
            updateUserList([name]);
        }
        selectUserName(name);
        localStorage.setItem(name, [
            document.getElementsByName("veryeasy-min")[0].value,
            document.getElementsByName("veryeasy-sec")[0].value,
            document.getElementsByName("easy-min")[0].value,
            document.getElementsByName("easy-sec")[0].value,
            document.getElementsByName("moderate-min")[0].value,
            document.getElementsByName("moderate-sec")[0].value,
            document.getElementsByName("fast-min")[0].value,
            document.getElementsByName("fast-sec")[0].value,
            document.getElementsByName("maxspeed-min")[0].value,
            document.getElementsByName("maxspeed-sec")[0].value,
            document.getElementsByName('distance')[0].value
            ]
        );
        resetInputData();
    }
}
function resetInputData() {
    setName("");
    setDeleteButtonName("")
    document.getElementsByName("veryeasy-min")[0].value = "";
    document.getElementsByName("veryeasy-sec")[0].value = "";
    document.getElementsByName("easy-min")[0].value = "";
    document.getElementsByName("easy-sec")[0].value = "";
    document.getElementsByName("moderate-min")[0].value = "";
    document.getElementsByName("moderate-sec")[0].value = "";
    document.getElementsByName("fast-min")[0].value = "";
    document.getElementsByName("fast-sec")[0].value = "";
    document.getElementsByName("maxspeed-min")[0].value = "";
    document.getElementsByName("maxspeed-sec")[0].value = "";
}
function selectUserName(name) {
    document.getElementsByName("identityList")[0].value = name;
    setDeleteButtonName(name);
}

function deleteUserData() {
    let deleteName = getName();
    var result = confirm("'" + deleteName + "' löschen?");
    if (result) {
        localStorage.removeItem(deleteName);
        let myUsers = localStorage.getItem("allUsers").split(',');
        localStorage.setItem("allUsers", myUsers.filter(name => name !== deleteName));
        //localStorage.clear();
        initValues();
    }
}

function setColor(name, value, lowerLimit, upperLimit) {
    if (value > lowerLimit && value < upperLimit) {
        document.getElementById(name).style.backgroundColor = "#6dd463";
    } else {
        document.getElementById(name).style.backgroundColor = "lightgrey";
    }
}

function getPace(name) {
    let time = (60 * document.getElementsByName(name + "-min")[0].value + 
        Number(document.getElementsByName(name + "-sec")[0].value));
    if (time > 0) {
        // Meter pro 10 Sekunden
        return 10 * distance / time;
    } else {
        return 0;
    }
}

function getPercent(pace, threshold) {
    if (threshold > 0) {
        return Math.round(pace * 1000 / threshold) / 10;
    } else {
        return 0;
    }
}

function getName() {
    return document.getElementsByName("identity")[0].value
}
function setName(nameStr) {
    document.getElementsByName("identity")[0].value = nameStr;
}
function changeName() {
    let name = document.getElementsByName("identityList")[0].value;
    document.getElementsByName("identity")[0].value = name;
    initUserData();
    setDeleteButtonName(name);
}
function setDeleteButtonName(name) {
    let button = document.getElementById('deletebutton');
    if (name !== "") {
        button.innerHTML = "'" + name + "' löschen";
        button.setAttribute("style", "display:inline;");
    } else {
        button.setAttribute("style", "display:none;");
    }
}

function calc() {
    updateDistance();

    let veryeasy = getPace("veryeasy");
    let easy = getPace("easy");
    let moderate = getPace("moderate");
    let fast = getPace("fast");
    let maxspeed = getPace("maxspeed");
               
    let matchThresholdUp = 0;
    let matchThresholdDown = 0;
    let matchCount = 0;
    let count = 0;
    
    // threshold Wert ist in Meter pro 10 Sekunden, analog der Funktion getPace()
    for (let threshold = minThreshold; threshold < maxThreshold; threshold++) {
        count = 0;
        if (veryeasy < threshold * limit1 / 100) count++;
        if (easy > threshold * limit1 / 100 && easy < threshold * limit2 / 100) count++;
        if (moderate > threshold * limit2 / 100 && moderate < threshold * limit3 / 100) count++;
        if (fast > threshold * limit3 / 100 && fast < threshold * limit4 / 100) count++;
        if (maxspeed > threshold * limit4 / 100) count++;
        if (count > matchCount) {
            matchCount = count;
            matchThresholdUp = threshold;
        }
    }
    matchCount = 0;
    // Gleiche Annäherung wie oben, aber von maxThreshold her Richtung kleinere Werte
    for (let threshold = maxThreshold; threshold > minThreshold; threshold--) {
        count = 0;
        if (veryeasy < threshold * limit1 / 100) count++;
        if (easy > threshold * limit1 / 100 && easy < threshold * limit2 / 100) count++;
        if (moderate > threshold * limit2 / 100 && moderate < threshold * limit3 / 100) count++;
        if (fast > threshold * limit3 / 100 && fast < threshold * limit4 / 100) count++;
        if (maxspeed > threshold * limit4 / 100) count++;
        if (count > matchCount) {
            matchCount = count;
            matchThresholdDown = threshold;
        }
    }
    // Mittelwert von beiden besten gefundenen Werten
    let matchThreshold = (matchThresholdUp + matchThresholdDown) / 2;

    document.getElementById('veryeasy-per').innerHTML = getPercent(veryeasy, matchThreshold) + "%";
    document.getElementById('easy-per').innerHTML = getPercent(easy, matchThreshold) + "%";
    document.getElementById('moderate-per').innerHTML = getPercent(moderate, matchThreshold) + "%";
    document.getElementById('fast-per').innerHTML = getPercent(fast, matchThreshold) + "%";
    document.getElementById('maxspeed-per').innerHTML = getPercent(maxspeed, matchThreshold) + "%";
    
    if (distance == 1000) {
        document.getElementById('veryeasy-pace').innerHTML = "";
        document.getElementById('easy-pace').innerHTML = "";
        document.getElementById('moderate-pace').innerHTML = "";
        document.getElementById('fast-pace').innerHTML = "";
        document.getElementById('maxspeed-pace').innerHTML = "";
    } else {
        document.getElementById('veryeasy-pace').innerHTML = getMinPerKm(veryeasy);
        document.getElementById('easy-pace').innerHTML = getMinPerKm(easy);
        document.getElementById('moderate-pace').innerHTML = getMinPerKm(moderate);
        document.getElementById('fast-pace').innerHTML = getMinPerKm(fast);
        document.getElementById('maxspeed-pace').innerHTML = getMinPerKm(maxspeed);
    }
    
    setColor("veryeasy-per", getPercent(veryeasy, matchThreshold), limit0, limit1);
    setColor("easy-per", getPercent(easy, matchThreshold), limit1, limit2);
    setColor("moderate-per", getPercent(moderate, matchThreshold), limit2, limit3);
    setColor("fast-per", getPercent(fast, matchThreshold), limit3, limit4);
    setColor("maxspeed-per", getPercent(maxspeed, matchThreshold), limit4, limitX);
    
    if (matchCount < 3 || matchThreshold < minThreshold || matchThreshold > maxThreshold) {
        matchThreshold = 0;
    }
    document.getElementById('threshold').innerHTML = getMinPerKm(matchThreshold);
    setColor("threshold", matchThreshold, minThreshold, maxThreshold);
    setIntervallPaceLink(matchThreshold);
}

function setIntervallPaceLink(pace) {
    document.getElementById('linktrainpace').setAttribute('href', './trainingspace.html?threshold=' + pace);
}

function getURLParameter(name) {
    return decodeURIComponent(
        (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
            .exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')
    ) || null;
}

function init() {
    ts10s = getURLParameter("threshold");
    update();
}

function update() {
    document.getElementsByName('ts-min')[0].value = getMinPartPerKm(ts10s);
    document.getElementsByName('ts-sec')[0].value = getSecPartPerKm(ts10s);
    let _1000int = ts10s * 1.04;  // 5k PB
    let _400int = ts10s * 1.08;   // 3k PB
    let _200int = ts10s * 1.12;
    let _1000rep = ts10s * 1.12;
    let _400rep = ts10s * 1.16;
    let _200rep = ts10s * 1.20;
    document.getElementById("_1000int").innerHTML =
        getMinPartPerKm(_1000int) + " : " + getSecPartPerKm(_1000int) +
        "<span> (" + getMinPartPerKm(_1000int) + " : " + getSecPartPerKm(_1000int) + ")</span>";
    document.getElementById("_400int").innerHTML =
        getMinPartPerKm(_400int / 0.4) + " : " + getSecPartPerKm(_400int / 0.4) +
        "<span> (" + getMinPartPerKm(_400int) + " : " + getSecPartPerKm(_400int) + ")</span>";
    document.getElementById("_200int").innerHTML =
        getMinPartPerKm(_200int / 0.2) + " : " + getSecPartPerKm(_200int / 0.2) +
        "<span> (" + getMinPartPerKm(_200int) + " : " + getSecPartPerKm(_200int) + ")</span>";
    document.getElementById("_1000rep").innerHTML =
        getMinPartPerKm(_1000rep) + " : " + getSecPartPerKm(_1000rep) +
        "<span> (" + getMinPartPerKm(_1000rep) + " : " + getSecPartPerKm(_1000rep) + ")</span>";
    document.getElementById("_400rep").innerHTML =
        getMinPartPerKm(_400rep / 0.4) + " : " + getSecPartPerKm(_400rep / 0.4) +
        "<span> (" + getMinPartPerKm(_400rep) + " : " + getSecPartPerKm(_400rep) + ")</span>";
    document.getElementById("_200rep").innerHTML =
        getMinPartPerKm(_200rep / 0.2) + " : " + getSecPartPerKm(_200rep / 0.2) +
        "<span> (" + getMinPartPerKm(_200rep) + " : " + getSecPartPerKm(_200rep) + ")</span>";
        
    document.getElementById("_3kPB").innerHTML =
        getMinPartPerKm(_400int / 3) + " : " + getSecPartPerKm(_400int / 3) +
        "<span> (" + getMinPartPerKm(_400int) + " : " + getSecPartPerKm(_400int) + ")</span>";
    document.getElementById("_5kPB").innerHTML =
        getMinPartPerKm(_1000int / 5) + " : " + getSecPartPerKm(_1000int / 5) +
        "<span> (" + getMinPartPerKm(_1000int) + " : " + getSecPartPerKm(_1000int) + ")</span>";
    document.getElementById("_10kPB").innerHTML =
        getMinPartPerKm(ts10s / 10) + " : " + getSecPartPerKm(ts10s / 10) +
        "<span> (" + getMinPartPerKm(ts10s) + " : " + getSecPartPerKm(ts10s) + ")</span>";
}

function calculate() {
    ts10s = getPace("ts");
    update();
}

function getPace(name) {
    let time = (60 * document.getElementsByName(name + "-min")[0].value + 
        Number(document.getElementsByName(name + "-sec")[0].value));
    if (time > 0) {
        // Meter pro 10 Sekunden
        return 10 * distance / time;
    } else {
        return 0;
    }
}

function getMinPerKm(pace) {
    return getMinPartPerKm(pace) + " : " + getSecPartPerKm(pace);
}

function getSecPartPerKm(pace) {
    if (pace > 0) {
        let secs = Math.round(10000 / pace % 60);
        if (secs < 10) {
            return "0" + secs;
        } else {
            return secs;
        }
    } else {
        return "-";
    }
}

function getMinPartPerKm(pace) {
    if (pace > 0) {
        return Math.floor(10000 / pace / 60);
    } else {
        return "-";
    }
}
