import {DaysOfWeek, showDate, showTime} from "./utils";
import '../sass/pages/main.scss'

const elements = {
    language: localStorage.getItem('lang') ? localStorage.getItem('lang') : document.getElementsByTagName("html")[0].getAttribute("lang"),
    time: document.querySelector('.time'),
    data: document.querySelector('.date'),
    hamburger: document.querySelector('.hamburger'),
    menu: document.querySelector('.nav-menu'),
    calendar: document.querySelector('.calendar'),
    mount: document.querySelector('.mount'),
    week: document.querySelector('.select-week_current'),
    // date_name_week: document.querySelectorAll('.custom-select__city-address'),
}


window.onload = function () {
    console.log('Hi, Zajkov Mikhail')
    showTime();
    showDate();
    addHamburgerClickHandler()
    startCalendar();
    selectWeeks();
}


// HAMBURGER & MENU
function addHamburgerClickHandler() {
    elements.hamburger.addEventListener('click', e => {
        e.stopPropagation();
        toggleMenu();
    });
}

const toggleMenu = () => {
    elements.hamburger.classList.toggle('active');
    elements.menu.classList.toggle('active');
    elements.calendar.classList.toggle('active');
    console.log("Привет")
}


// CALENDAR
let Cal = function(divId) {
    //Сохраняем идентификатор div
    this.divId = divId;

    // Дни недели с понедельника
    // this.DaysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Су', 'Вс'];

    // Месяцы начиная с января
    this.Months =['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    //Устанавливаем текущий месяц, год
    let d = new Date();
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();
};

// Переход к следующему месяцу
Cal.prototype.nextMonth = function() {
    if ( this.currMonth === 11 ) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
    }
    else {
        this.currMonth = this.currMonth + 1;
    }
    this.showCurr();
};

// Переход к предыдущему месяцу
Cal.prototype.previousMonth = function() {
    if ( this.currMonth === 0 ) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
    }
    else {
        this.currMonth = this.currMonth - 1;
    }
    this.showCurr();
};

// Показать текущий месяц
Cal.prototype.showCurr = function() {
    this.showMonth(this.currYear, this.currMonth);
};

// Показать месяц (год, месяц)
Cal.prototype.showMonth = function(y, m) {
    let // Первый день недели в выбранном месяце
        firstDayOfMonth = new Date(y, m, 7).getDay()
        // Последний день выбранного месяца
        , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
        // Последний день предыдущего месяца
        , lastDayOfLastMonth = m === 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();

    // Запись выбранного месяца и года
    elements.mount.innerText = this.Months[m] + ' ' + y

    let html = '<table>';

    // заголовок дней недели
    html += '<tr class="days-name">';
    for(let i = 0; i < DaysOfWeek.length; i++) {
        html += '<td>' + DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';

    // Записываем дни
    let i = 1;
    do {
        let dow = new Date(y, m, i).getDay();
        // Начать новую строку в понедельник
        if ( dow === 1 ) {
            html += '<tr>';
        }
        // Если первый день недели не понедельник показать последние дни предыдущего месяца
        else if ( i === 1 ) {
            html += '<tr>';
            let k = lastDayOfLastMonth - firstDayOfMonth+1;
            for(let j = 0; j < firstDayOfMonth; j++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
        }
        // Записываем текущий день в цикл
        let chk = new Date();
        let chkY = chk.getFullYear();
        let chkM = chk.getMonth();
        if (chkY === this.currYear && chkM === this.currMonth && i === this.currDay) {
            html += '<td class="today">' + i + '</td>';
        } else {
            html += '<td class="normal">' + i + '</td>';
        }
        // закрыть строку в воскресенье
        if ( dow === 0 ) {
            html += '</tr>';
        }
        // Если последний день месяца не воскресенье, показать первые дни следующего месяца
        else if ( i === lastDateOfMonth ) {
            let k=1;
            for(dow; dow < 7; dow++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
        }
        i++;
    }while(i <= lastDateOfMonth);

    // Конец таблицы
    html += '</table>';

    // Записываем HTML в div
    document.getElementById(this.divId).innerHTML = html;
};

function startCalendar() {
    // Начать календарь
    let c = new Cal("divCal");
    c.showCurr();

    // Привязываем кнопки «Следующий» и «Предыдущий»
    getId('btnNext').onclick = function() {
        c.nextMonth();
    };
    getId('btnPrev').onclick = function() {
        c.previousMonth();
    };
}

// Получить элемент по id
function getId(id) {
    return document.getElementById(id);
}


// SCHEDULE
//Устанавливаем текущую неделю
Date.prototype.getWeek = function(start) {
    start = start || 1;
    let today = new Date(this.setHours(0, 0, 0, 0));
    let day = today.getDay() - start;
    let date = today.getDate() - day;

    let MoDate = new Date(today.setDate(date));
    let TuDate = new Date(today.setDate(date + 1));
    let WeDate = new Date(today.setDate(date + 2));
    let ThDate = new Date(today.setDate(date + 3));
    let FrDate = new Date(today.setDate(date + 4));
    let SaDate = new Date(today.setDate(date + 5));
    let SuDate = new Date(today.setDate(date + 6));
    return [MoDate, TuDate, WeDate, ThDate, FrDate, SaDate, SuDate];
}

function selectWeeks() {

    let dow = new Date().getDate()
    console.log(dow)

    const Dates = new Date().getWeek();

    elements.week.innerText = Dates[0].toLocaleDateString() + ' - '+ Dates[6].toLocaleDateString()
    const date_format = { day: '2-digit', month: '2-digit'}
    document.querySelectorAll('.day-date').forEach((e, n) => {
        e.innerText = `${DaysOfWeek[n]}. ${Dates[n].toLocaleDateString(elements.language, date_format)}`;
    });
}



// // Переход к следующему месяцу
// const nextMonth = function() {
//     if ( this.currMonth === 11 ) {
//         this.currMonth = 0;
//         this.currYear = this.currYear + 1;
//     }
//     else {
//         this.currMonth = this.currMonth + 1;
//     }
//     this.showCurr();
// };

// // Переход к предыдущему месяцу
// Cal.prototype.previousMonth = function() {
//     if ( this.currMonth === 0 ) {
//         this.currMonth = 11;
//         this.currYear = this.currYear - 1;
//     }
//     else {
//         this.currMonth = this.currMonth - 1;
//     }
//     this.showCurr();
// };