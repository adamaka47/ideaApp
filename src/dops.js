export function checkValid(val) {
	return val.length >=  5 && val.length <= 240
}

export function createMod(header, body) {
	const modal = document.createElement('div');
	modal.classList.add('modal');

	const innerHtml = 	` 

		<h2>${header}</h2>
		<div class="modal-body">
			${body}
		</div>

	`

	modal.innerHTML = innerHtml;

	mui.overlay('on', modal)
}