import {showDate, showTime, createModal} from "./js/utils";
import {authWithEmailAndPassword} from "./js/auth";
import {Question} from "./js/question";
import './sass/pages/app.scss'


window.onload = function () {
  showTime();
  showDate();
  addInputEmailClickHandler();
  addInputPasswordClickHandler()
}

const elements = {
  email: document.querySelector('#email'),
  password: document.querySelector('#password'),
  label_email: document.querySelector('.label_email'),
  label_password: document.querySelector('.label_password'),
}

function addInputEmailClickHandler() {
  document.addEventListener('focusin', e => {
    e.stopPropagation();
    if (e.target === elements.email) {
      elements.label_email.classList.add('no_empty')
    } else {
      inputFormEmptyEmail();
    }
  })
}

function addInputPasswordClickHandler() {
  document.addEventListener('click', e => {
    e.stopPropagation();
    if (e.target === elements.password) {
      elements.label_password.classList.add('no_empty')
    } else {
      inputFormEmptyPassword();
    }
  })
}

function inputFormEmptyEmail() {
  if (elements.email.value !== '') {
    elements.label_email.classList.add('no_empty')
  } else {
    elements.label_email.classList.remove('no_empty')
  }
}

function inputFormEmptyPassword() {
  if (elements.password.value !== '') {
    elements.label_password.classList.add('no_empty')
  } else {
    elements.label_password.classList.remove('no_empty')
  }
}

document.addEventListener('submit', authFormHandler, {once: true});

function authFormHandler(event) {
  event.preventDefault()

  const btn = event.target.querySelector('button')
  const email = event.target.querySelector('#email').value
  const password = event.target.querySelector('#password').value
  console.log(email)

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
  } else {
    document.querySelector('#email').value = '';
    document.querySelector('#password').value = '';

    window.location.href = 'pages/main.html';
    document.querySelector('#email').value = '';
    document.querySelector('#password').value = '';
    // createModal( "Список вопросов", Question.listToHTML(content))
  }
}