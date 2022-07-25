const config = {
	darkDomClass: 'dark-scheme',
	darkLocalStorageKey: 'darkScheme',
	toggleDomClass: 'color-scheme-toggle',
	darkStylesFile: '/static/css/main.css',
	icons: {
		light: '🌔',
		dark: '🌒'
	}
}

const state = {
	schemeButton: document.querySelector('#' + config.toggleDomClass)
}

const [c, s, d] = [config, state, document]

const detectInitialScheme = () => {
	// Check for returning users that saved a colour scheme preference
	const savedColourScheme = localStorage.getItem(c.darkLocalStorageKey)

	if (savedColourScheme === 'dark') {
		switchScheme('dark')
	} else if (savedColourScheme === 'light') {
		switchScheme('light')
	} else if (window.matchMedia) {
		// New/unknown user: use user's browser/OS preferences to infer a good default

		// Initially detect user's colour scheme preference (light by default)
		if (matchMedia('(prefers-color-scheme: dark)').matches) {
			switchScheme('dark')
		}

		// Watch the browser's setting for changing scheme without a refresh
		matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
			if (event.matches) {
				switchScheme('dark')
			} else {
				// Default to light
				switchScheme('light')
			}
		})
	}
}

// Are you ready for the most disgusting hack you've ever seen?
// const applySchemeCss = async () => {
// 	const cssFile = await fetch(c.darkStylesFile)
// 	const cssText = await cssFile.text() /* Okay, this is getting bad */
// 	const darkStyles = cssText.match('@media \(prefers\-color\-scheme: dark\).*$') /* Oh, no */
// 	console.debug(darkStyles)
// }
// applySchemeCss()

const switchScheme = newScheme => {
	if (newScheme === undefined){
		d.body.classList.toggle(c.darkDomClass)
	} else if (newScheme === 'light'){
		d.body.classList.remove(c.darkDomClass)
	} else if (newScheme === 'dark'){
		d.body.classList.add(c.darkDomClass)
	} else {
		throw Error('Unknown colour scheme')
	}

	isDarkScheme = d.body.classList.contains(c.darkDomClass)
	// if (isDarkScheme){
	// 	applySchemeCss()
	// }
	s.schemeButton.innerText = isDarkScheme ? c.icons.light : c.icons.dark
	localStorage.setItem(c.darkLocalStorageKey, isDarkScheme ? 'dark' : 'light')
}

detectInitialScheme()
// Let users manually toggle inside the page, too
s.schemeButton.addEventListener('click', () => {
	switchScheme()
})