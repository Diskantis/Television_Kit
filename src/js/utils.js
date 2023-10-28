const elements = {
  language: localStorage.getItem('lang') ? localStorage.getItem('lang') : document.getElementsByTagName("html")[0].getAttribute("lang"),
  time: document.querySelector('.time'),
  data: document.querySelector('.date'),
  email: document.querySelector('#email'),
  password: document.querySelector('#password'),

  // hamburger: document.querySelector('.hamburger-circle'),
}

export const DaysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Су', 'Вс'];
export const Months =['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];


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
  const weekdayRus = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

  elements.data.textContent = `${weekdayRus[dayWeek]}, ${dayNum} ${monthRus[month]}`
}

// HAMBURGER & MENU
// export function createHamburger() {
//   const hamburger = document.createElement('div');
//   hamburger.classList.add('hamburger-circle');
//   hamburger.innerHTML = `
//     <div class="hamburger-line">
//       <span></span>
//       <span></span>
//       <span></span>
//     </div>
//   `
//   document.querySelector('.hamburger-circle').replaceWith(hamburger)
// }

// VALIDATION
// export function isValid(value) {
//   return value.length >= 10
// }

// MODAL WINDOWS
export function createModal(title, content) {
  const overlay = document.createElement('div')
  overlay.classList.add('overlay')
  document.querySelector('body').append(overlay)

  const modal = document.createElement('div')
  modal.classList.add('modal')

  modal.innerHTML = `
    <div class="modal-content">${content}</div>
  `
  document.querySelector('.authentication').append(modal)
  // elements.email.style.borderColor = '#ff2e2e'
  // elements.password.style.borderColor = '#ff2e2e'
  // mui.overlay('on', modal)

}