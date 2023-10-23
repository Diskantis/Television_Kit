import {showDate, showTime, addHamburgerClickHandler, createModal} from "./js/utils";
import {authWithEmailAndPassword} from "./js/auth";
import {Question} from "./js/question";
import './sass/pages/app.scss'


window.onload = function () {
  showTime();
  showDate();
  addHamburgerClickHandler();
}


document.addEventListener('submit', authFormHandler, {once: true})


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
  } else {
    window.location.href = 'pages/main.html';
    // createModal( "Список вопросов", Question.listToHTML(content))
  }
}