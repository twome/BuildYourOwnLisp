if (window.matchMedia){
	// Initially detect user's colour scheme preference (light by default)
	if (matchMedia('(prefers-color-scheme: dark)').matches) {
		document.body.classList.add('dark-scheme')
	}

	// Watch the browser's setting for changing scheme without a refresh
	matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
		if (event.matches) {
			document.body.classList.add('dark-scheme')
		} else {
			// Default to light
			document.body.classList.remove('dark-scheme')
		}
	})
}

// Let users manually toggle inside the page, too
let colorSchemeToggleElement = document.querySelector('#color-scheme-toggle')
colorSchemeToggleElement.addEventListener('click', () => {
	document.body.classList.toggle('dark-scheme')
})