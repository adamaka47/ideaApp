export class Idea {
	static create(idea) {
		return fetch('https://ideasff-app.firebaseio.com/ideas.json', {
			method: 'POST',
			body: JSON.stringify(idea),
			headers: {
				'Content-type': 'application/json'
			}
		})
			.then(info => info.json())
			.then(info => {
				idea.id = info.name;
				return idea;
			})
			.then(addToLS)
			.then(Idea.createIdeas)
	}

	static createIdeas() {
		const ideas = getFromLS()
		let html = ideas.length ? ideas.map(trfIdea).join('')
			: `<div class="mui--text-headline">Идей не найдено!</div>`

		const list = document.querySelector('#all');
		list.innerHTML =  html;
	}

	static toHTML(ideas) {
		return ideas.length ? `<ol class="listIdeas">${ideas.map(idea => `<li>${idea.text}</li>`).join('')}</ol>`
			: `<p>Идей здесь нет...</p>`
	}

	static tawk(token) {
		if (!token) {
			return Promise.resolve('<span class="invalid">Нет токена!</span>')
		}
		return fetch(`https://ideasff-app.firebaseio.com/ideas.json?auth=${token}`)
			.then(info => info.json())
			.then(ideas => {
				if (ideas && ideas.error) {
					return `<span class="invalid">${ideas.error}</span>`
				}
				return ideas ? Object.keys(ideas).map(key => ({
					...ideas[key],
					id: key
				})) : []
			})
	}
}

function addToLS(idea) {

	const allIdeas = getFromLS();
	allIdeas.push(idea)
	localStorage.setItem('ideas', JSON.stringify(allIdeas))

}

function getFromLS() {
	return JSON.parse(localStorage.getItem('ideas') || '[]')
}


function trfIdea(idea) {

	return ` 

		<div class="mui--text-dark-secondary">
			${new Date(idea.date).toLocaleDateString()}
			${new Date(idea.date).toLocaleTimeString()}
		</div>
		<div>
		  ${idea.text}
		</div>

	`

}