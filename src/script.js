import { Idea } from './idea'
import { createMod, checkValid } from './dops'
import { getAuthenEmailPass, getAuthen } from './authen'
import './main.css'

const form = document.forms[0];
const int = form.querySelector('input');
const btn = form.querySelector('button');
const goBtn = document.querySelector('.btn-pos')

document.addEventListener('DOMContentLoaded', () => {
	Idea.createIdeas()
})

form.addEventListener('submit', submitForm);

goBtn.onclick = function() {
	createMod('Вход', getAuthen())
	document.querySelector('#modal-form').addEventListener('submit', function(e) {
		e.preventDefault();

		const btnAuth = document.querySelector('.btn-auth')

		btnAuth.setAttribute('disabled', 'disabled')

		const email = e.target.querySelector('#email-int').value
		const pass = e.target.querySelector('#pass-int').value

		getAuthenEmailPass(email, pass)
			.then(Idea.tawk)
			.then(createAfterAuth)
			.then(() => btnAuth.removeAttribute('disabled'))
	})
}

function createAfterAuth(content) {
	if (typeof content === 'string') {
		createMod('Ошибка', content)
	} else {
		createMod('Список идей:', Idea.toHTML(content))
	}
}



int.addEventListener('input', function() {
	if (!checkValid(int.value))
		btn.setAttribute('disabled', 'disabled')
	else
		btn.removeAttribute('disabled')

})

function submitForm(e) {
	e.preventDefault();

	if (checkValid(int.value)) {
		const idObject = {
			text: int.value.trim(),
			date: new Date().toJSON()
		}

		btn.setAttribute('disabled', 'disabled')

		// request
		Idea.create(idObject)
			.then(() => {
				console.log('Question', idObject)

				int.value = ''
				int.className = ''
			})
	}


}