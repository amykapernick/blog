const pa11y = require('pa11y'),
	fs = require('file-system')

runTest()

async function runTest() {
	try {
		const results = await Promise.all([
			pa11y('http://localhost:8000', {
				standard: 'WCAG2AA',
				actions: [],
				screenCapture: `screen capture ${__dirname}/results/basic-a11y_home_mobile.png`,
				viewport: {
					width: 320,
					height: 480,
					deviceScaleFactor: 2,
					isMobile: true,
				},
			}),
			pa11y('http://localhost:8000', {
				standard: 'WCAG2AA',
				actions: [],
				screenCapture: `screen capture ${__dirname}/results/basic-a11y_home_desktop.png`,
				viewport: {
					width: 1280,
					height: 1024,
					deviceScaleFactor: 1,
					isMobile: false,
				},
			}),
			pa11y('http://localhost:8000/setting-up-a-windows-computer-for-dev', {
				standard: 'WCAG2AA',
				actions: [],
				screenCapture: `screen capture ${__dirname}/results/basic-a11y_post_mobile.png`,
				viewport: {
					width: 320,
					height: 480,
					deviceScaleFactor: 2,
					isMobile: true,
				},
			}),
			pa11y('http://localhost:8000/setting-up-a-windows-computer-for-dev', {
				standard: 'WCAG2AA',
				actions: [],
				screenCapture: `screen capture ${__dirname}/results/basic-a11y_post_desktop.png`,
				viewport: {
					width: 1280,
					height: 1024,
					deviceScaleFactor: 1,
					isMobile: false,
				},
			}),
		])

		fs.writeFile('tests/results/basic-a11y.json', JSON.stringify(results), err => {
			console.log(err)
		})
	} catch (err) {
		console.error(err.message)
	}
}
