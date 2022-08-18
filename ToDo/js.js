var input = $('#input')
var ul = $('#listul')
var textobject = {}
var values = []
var keys = []

if (localStorage.getItem("texts")) {
    var textobject = JSON.parse(localStorage.getItem("texts"))
    var values = Object.values(textobject)
    var keys = Object.keys(textobject)
    for (const value of values) {
        CreateElInit(value)
    }
}

var remButtons = document.getElementsByClassName('btnremove')
var iv = values.length

// On pressing 'Enter' form input to work as a click on the 'Add' button
input.on('keyup', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        $('#btn').click()
    }
})

// Remove element
function removeItem() {
    for (var i = 0; i < remButtons.length; i++) (function (i) {
        remButtons[i].onclick = function () {
            this.parentNode.parentNode.removeChild(this.parentNode)
            setNewVar(i)
        }
    })(i);
}
removeItem()

// Variable updates after an element is removed
function setNewVar(x) {
    var toRem = keys[x]
    delete textobject[toRem]
    keys = Object.keys(textobject)
    values = Object.values(textobject)
    iv = keys.length
    //console.log(values)
    //console.log(keys)
    remButtons = document.getElementsByClassName('btnremove')
    localStorage.setItem('texts', JSON.stringify(textobject))
    removeItem()
}

// Insert new line after 85 to 100 characters
function newText(text) {
    var ok = 0
    var t = ""
    var ln = text.length
    while (text[ln - 1] == ' ') {
        ln--
    }
    for (var i = 0; i < ln; i++) {
        if (i != 0 && i % 100 > 85 && ok == 0) {
            if (text[i] == ' ') {
                t = t + "<br>"
                ok = 1
            }
        }
        if (i == 100) {
            ok = 0;
        }
        t = t + text[i]
    }
    return t
}

// Add elements from localstorage
function CreateElInit(text) {
    const li = $('<li></li>')
    const btnrem = $('<button></button>')
    btnrem.addClass('btnremove')
    btnrem.append('Remove')
    var ntext = newText(text)
    if (ntext != '') {
        li.append(ntext)
        li.append(btnrem)
        ul.append(li)
    }
}

// Verify if input is empty or not
function CheckIf() {
    x = input.val()
    if (x != '') {
        CreateEl(x)
    }
}
// Add element from input
function CreateEl(text) {
    const li = $('<li></li>')
    const btnrem = $('<button></button>')
    btnrem.attr('class', 'btnremove')
    btnrem.append('Remove')
    var ntext = newText(text)
    if (ntext != '') {
        li.append(ntext)
        li.append(btnrem)
        ul.append(li)
        textobject[JSON.stringify(iv)] = text
        values = Object.values(textobject)
        keys = Object.keys(textobject)
        iv = keys.length
        remButtons = document.getElementsByClassName('btnremove')
        localStorage.setItem('texts', JSON.stringify(textobject))
    }
    input.val('')
    removeItem()
}
function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

var media1 = $('#media1')
var breakrow = document.createElement('br')

var date = new Date()
var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var dayArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
var today = date.getDate()
var nrDaysInMonth = daysInMonth(date.getFullYear(), date.getMonth() + 1)
$('#month').append(monthArr[date.getMonth()])
media1.append(monthArr[date.getMonth()])
media1.innerHTML += "<br>"
$('#year').append(date.getFullYear())
$('#day').append(dayArr[date.getDay() - 1])
media1.append(dayArr[date.getDay() - 1])
media1.innerHTML += "<br>"

// Shortcuts for the name of the days of the week
for (var i = 0; i < dayArr.length; i++) {
    const wd = document.createElement('div')
    wd.className = 'weekdays'
    var x = ''
    if (dayArr[i] == 'Monday') {
        x = 'M'
    }
    else if (dayArr[i] == 'Tuesday') {
        x = 'Tu'
    }
    else if (dayArr[i] == 'Wednesday') {
        x = 'W'
    }
    else if (dayArr[i] == 'Thursday') {
        x = 'Th'
    }
    else if (dayArr[i] == 'Friday') {
        x = 'F'
    }
    else if (dayArr[i] == 'Saturday') {
        x = 'Sa'
    }
    else if (dayArr[i] == 'Sunday') {
        x = 'Su'
    }
    wd.innerText = x
    $('#weekdays').append(wd)
}


// Calculates the first day of month (0-6, Mon-Sun)
function fdayofmonth(y, m) {
    var firstDay = new Date(y, m, 1);
    var fday = firstDay.getDay() - 1
    return fday
}

function loadDays(nrtoskip) {
    for (var i = 1; i <= nrtoskip; i++) {
        $('#days').append($('<div></div>').addClass('daystoskip'))
    }
    for (let d = 1 + nrtoskip; d <= nrDaysInMonth + nrtoskip; d++) {
        if (d == today + nrtoskip) {
            $('#days').append($('<div></div>').attr('id', 'dayToday').addClass('days').append(JSON.stringify(d - nrtoskip)))
            media1.innerHTML += "<br>"
        }
        else {
            $('#days').append($('<div></div>').addClass('days').append(JSON.stringify(d - nrtoskip)))
        }
    }
}

fday = fdayofmonth(date.getFullYear(), date.getMonth())
loadDays(fday)


// Clock
function showTime() {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";

    if (h == 0) {
        h = 12;
    }

    if (h > 12) {
        h = h - 12;
        session = "PM";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("time").innerText = time;
    document.getElementById("time").textContent = time;

    setTimeout(showTime, 1000);

}

showTime();

