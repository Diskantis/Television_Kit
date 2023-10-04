let language = localStorage.getItem('lang') ? localStorage.getItem('lang') : document.getElementsByTagName("html")[0].getAttribute("lang");
const time = document.querySelector('.time');
const data = document.querySelector('.date');

// SHOW TIME
showTime();
// getSlideNext()

function showTime() {
    const date = new Date();
    time.textContent = date.toLocaleTimeString();
    setTimeout(showTime, 1000);
    showDate();
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
    if (language === 'en') {
        const options = {weekday: 'long', day: 'numeric', month: 'long'};
        data.textContent = date.toLocaleDateString(language, options) // 'ru-RU', 'be-BE'
    } else if (language === 'ru') {
        data.textContent = `${weekdayRus[dayWeek]}, ${dayNum} ${monthRus[month]}`
    } else if (language === 'be') {
        data.textContent = `${weekdayBel[dayWeek]}, ${dayNum} ${monthBel[month]}`
    }
}