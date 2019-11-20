const pa11y = require('pa11y'),
	fs = require('file-system')

pa11y('http://localhost:8000/', {
	standard: 'WCAG2AA',
	actions: [
		`screen capture ${__dirname}/results/basic-a11y_home.png`,
		'navigate to http://localhost:8000/template',
		`screen capture ${__dirname}/results/basic-a11y_post.png`,
	],
	// Log what's happening to the console
	screenCapture: `${__dirname}/results/basic-a11y.png`,
	// Options go here
})
	.then(async results => {
		fs.writeFile('tests/results/basic-a11y.json', JSON.stringify(results), err => {
			console.log(err)
		})
	})
	.catch(err => {
		console.log(err)
	})
