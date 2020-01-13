export function getAuthen() {
	return 	` 
		<form class="mui-form" id="modal-form">
		  <div class="mui-textfield mui-textfield--float-label">
		    <input type="email" id="email-int" required>
		    <label for="email-int">Email...</label>
		  </div>
		  <div class="mui-textfield mui-textfield--float-label">
		    <input type="password" id="pass-int" required>
		    <label for="pass-int">Password...</label>
		  </div>
		  <button type="submit" class="mui-btn mui-btn--raised mui-btn--danger btn-auth">Войти</button>
		</form>
	`
}


export function getAuthenEmailPass(email, password) {
	const apiKey = 'AIzaSyCVI51maYLpZlCexgBplQUuXCTQD8wQWtA';
	return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
		method: 'POST',
		body: JSON.stringify({
			email,
			password,
			returnSecureToken: true
		}),
		headers: {
			'Content-type': 'application/json'
		}
	})
		.then(info => info.json())
		.then(info => info.idToken)
}