const elements = {
  language: localStorage.getItem('lang') ? localStorage.getItem('lang') : document.getElementsByTagName("html")[0].getAttribute("lang"),
  time: document.querySelector('.time'),
  data: document.querySelector('.date'),
  hamburger: document.querySelector('.hamburger'),
}

export const DaysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Су', 'Вс'];

// SHOW TIME
export function showTime() {
  const date = new Date();
  elements.time.textContent = date.toLocaleTimeString();
  setTimeout(showTime, 1000);
}


// SHOW DATE
export function showDate() {
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
export function addHamburgerClickHandler() {
  elements.hamburger.addEventListener('click', e => {
    e.stopPropagation();
    toggleMenu();
  });
}

const  toggleMenu = () => {
  elements.hamburger.classList.toggle('active');
}


// VALIDATION
export function isValid(value) {
  return value.length >= 10
}

// MODAL WINDOWS
export function createModal(title, content) {
  const modal = document.createElement('div')
  modal.classList.add('modal')

  modal.innerHTML = `
    <h1>${title}</h1>
    <div class="modal-content">${content}</div>
  `
  mui.overlay('on', modal)
}