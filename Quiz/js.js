var questions = {
    "q0": {
        "q": "What kind of weapon is a falchion?",
        "a1": "A sword",
        "a2": "A bow",
        "a3": "A hammer",
        "a4": "A pistol",
        "a": "A sword",
        "id": 0
    },
    "q1": {
        "q": "What is another word for lexicon?",
        "a1": "Dictionary",
        "a2": "Language",
        "a3": "Vocabulary",
        "a4": "Group of a languages words",
        "a": "Dictionary",
        "id": 1
    },
    "q2": {
        "q": "What is the world's longest river?",
        "a1": "Amazon",
        "a2": "Volga",
        "a3": "Nile",
        "a4": "Rio Grande",
        "a": "Amazon",
        "id": 2
    },
    "q3": {
        "q": "What is the world's largest island?",
        "a1": "Greenland",
        "a2": "Great Britain",
        "a3": "Cuba",
        "a4": "Hawai'i",
        "a": "Greenland",
        "id": 3
    },
    "q4": {
        "q": "What is the diameter of Earth?",
        "a1": "8000 miles",
        "a2": "8000 kilometers",
        "a3": "8000 meters",
        "a4": "8000 kilograms",
        "a": "8000 miles",
        "id": 4
    },
    "q5": {
        "q": "What is the capital of Turkeye?",
        "a1": "Ankara",
        "a2": "Istanbul",
        "a3": "Tokyo",
        "a4": "Moscow",
        "a": "Ankara",
        "id": 5
    },
    "q6": {
        "q": "What is the oldest programming language?",
        "a1": "ASSEMBLY",
        "a2": "C",
        "a3": "COBOL",
        "a4": "BASIC",
        "a": "ASSEMBLY",
        "id": 6
    },
    "q7": {
        "q": "Which browser has the most users?",
        "a1": "Google Chrome",
        "a2": "Safari",
        "a3": "Firefox",
        "a4": "Internet Explorer",
        "a": "Google Chrome",
        "id": 7
    }
}

var nrq = Object.keys(questions).length;
var used = new Array(nrq).fill(0);
console.log(used);
var nr = 0;
var score = 0;
var alist = document.getElementsByClassName("answer");

function getQuestion() {
    var x = Math.floor(Math.random() * nrq);
    while (used[x] != 0) {
        x = Math.floor(Math.random() * nrq);
    }
    used[x] = 1;
    return questions["q" + x];
}

function start() {

    document.getElementById("start").style.display = "none";
    document.getElementById("reset").style.visibility = "hidden";
    var x = document.getElementById("glp");

    for (let i = 0; i < alist.length; i++) {
        alist[i].style.visibility = "visible";
        alist[i].innerText = "";
    }
    x.innerText = "Good Luck Player!";
    var q = getQuestion();
    startGame(q);
}

function startGame(obj) {
    nr = nr + 1;
    var canswer = obj["a"];
    var qst = document.getElementById("question");
    var question = obj["q"];

    var al = [obj["a1"], obj["a2"], obj["a3"], obj["a4"]];
    var asd = 4;
    for (var i = 0; i < 4; i++) {
        var x = Math.floor(Math.random() * asd);
        alist[i].innerText = al[x];
        al.splice(x, 1);
        asd = asd - 1;
    }
    qst.innerText = question;

    for (var i = 0; i < alist.length; i++) (function (i) {
        alist[i].onclick = function () {
            if (alist[i].innerText == canswer) {
                score = score + 1;
            }
            if (nr < nrq) {
                var q = getQuestion();
                startGame(q);
            }
            else {
                document.getElementsByTagName("h1")[0].innerText = "Congratulations, you scored " + score + " out of " + nrq;
                nr = 0;
                score = 0;
                document.getElementById("reset").style.visibility = "visible";
                document.getElementById("question").innerText = "";
                for (let i = 0; i < alist.length; i++) {
                    alist[i].style.visibility = "hidden";
                }
                used = new Array(nrq).fill(0);
            }
        }
    })(i);
}