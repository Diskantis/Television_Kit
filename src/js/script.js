
const elements = {
    language: localStorage.getItem('lang') ? localStorage.getItem('lang') : document.getElementsByTagName("html")[0].getAttribute("lang"),
    time: document.querySelector('.time'),
    data: document.querySelector('.date'),
    hamburger: document.querySelector('.hamburger'),
    menu: document.querySelector('.nav-menu'),
    calendar: document.querySelector('.calendar-wrapper'),
    mount: document.querySelector('.mount'),
    week: document.querySelector('.select-week_current'),

}

window.onload = function () {
    console.log('Hi, Zajkov Mikhail')
    showTime();
    showDate();
    addHamburgerClickHandler();
    startCalendar();
    selectWeeks();
}

// SHOW TIME
function showTime() {
    const date = new Date();
    elements.time.textContent = date.toLocaleTimeString();
    setTimeout(showTime, 1000);

}


// SHOW DATE
function showDate() {
    const date = new Date();
    let dayWeek = date.getDay();
    let dayNum = date.getDate();
    let month = date.getMonth();
    const monthRus = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    const monthBel = ["студзеня", "лютага", "сакавiка", "красавiка", "мая", "червеня", "лiпеня", "жнiвеня", "верасеня", "кастрычнiка", "лiстапада", "снежаня"];
    const weekdayRus = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const weekdayBel = ["Нядзеля", "Панядзелак", "Аўторак", "Серада", "Чацвер", "Пятніца", "Субота",];

    // "Воскресенье, 16 мая" / "Sunday, May 16" / "Нядзеля, 16 траўня"
    if (elements.language === 'en') {
        const options = {weekday: 'long', day: 'numeric', month: 'long'};
        elements.data.textContent = date.toLocaleDateString(elements.language, options) // 'ru-RU', 'be-BE'
    } else if (elements.language === 'ru') {
        elements.data.textContent = `${weekdayRus[dayWeek]}, ${dayNum} ${monthRus[month]}`
    } else if (elements.language === 'be') {
        elements.data.textContent = `${weekdayBel[dayWeek]}, ${dayNum} ${monthBel[month]}`
    }
}

// HAMBURGER & MENU
const addHamburgerClickHandler = () => {
    elements.hamburger.addEventListener('click', e => {
        e.stopPropagation();
        toggleMenu();
    });

    // document.addEventListener('click', e => {
    //     let target = e.target;
    //     let its_hamburger = target === elements.hamburger;
    //     let menu_is_active = elements.menu.classList.contains('active');
    //
    //     if (!its_hamburger && menu_is_active) {
    //         e.stopPropagation();
    //         toggleMenu();
    //     }
    // })
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
    this.DaysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Су', 'Вс'];

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
    for(let i = 0; i < this.DaysOfWeek.length; i++) {
        html += '<td>' + this.DaysOfWeek[i] + '</td>';
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

const startCalendar = () => {
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
    start = start || 0;
    let today = new Date(this.setHours(0, 0, 0, 0));
    let day = today.getDay() - start;
    let date = today.getDate() - day;

    let StartDate = new Date(today.setDate(date));
    let EndDate = new Date(today.setDate(date + 6));
    return [StartDate, EndDate];
}

const selectWeeks = () => {
    // Запись выбранного месяца и года
    const Dates = new Date().getWeek();
    elements.week.innerText = Dates[0].toLocaleDateString() + ' - '+ Dates[1].toLocaleDateString()
}


