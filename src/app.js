import {showDate, showTime, createModal} from "./js/utils";
import {authWithEmailAndPassword} from "./js/auth";
import {Question} from "./js/question";
import './sass/pages/app.scss'


const elements = {
  email: document.querySelector('#email'),
  password: document.querySelector('#password'),
  label_email: document.querySelector('.label_email'),
  label_password: document.querySelector('.label_password'),
}

window.onload = function () {
  showTime();
  showDate();
  addInputClickHandler(elements.email, elements.label_email);
  addInputClickHandler(elements.password, elements.label_password);
}


function addInputClickHandler(field, label) {
  document.addEventListener('click', e => {
    e.stopPropagation();
    if (e.target === field) {
      field.style.borderColor = '#69ff2e'
      label.classList.add('no_empty')
    } else {
      label.classList.remove('no_empty')
      field.style.borderColor = '#2196F3'
    }
  })

  document.addEventListener('click', () => {
    if (field.value !== '') {
      field.style.borderColor = '#69ff2e'
      label.classList.add('no_empty')
    }
  })
}

document.addEventListener('submit', authFormHandler, {once: true});

function authFormHandler(event) {
  event.preventDefault()

  const btn = event.target.querySelector('button')
  const email = event.target.querySelector('#email').value
  const password = event.target.querySelector('#password').value

  authWithEmailAndPassword(email, password)
    .then(token => {
      return Question.fetch(token)
    })
    .then(renderModalAfterAuth)
    .then(() => btn.disabled = false)
}

function renderModalAfterAuth(content) {
  if (typeof content === "string") {
    createModal( "Ошибка!", content)
    elements.email.style.borderColor = '#ff2e2e'
    elements.password.style.borderColor = '#ff2e2e'
    document.addEventListener("click", () => {
      document.querySelector('.overlay').remove();
      document.querySelector('.modal').remove();
      window.location.href = 'index.html';
    })
  } else {
    window.location.href = 'pages/main.html';
    document.querySelector('#email').value = '';
    document.querySelector('#password').value = '';
    // createModal( "Список вопросов", Question.listToHTML(content))
  }
}

