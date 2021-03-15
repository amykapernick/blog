const inclusiveLanguage = require('@11ty/eleventy-plugin-inclusive-language')

const words = [
	'simply',
	'obviously',
	'basically',
	'of course',
	'clearly',
	'just',
	'everyone knows',
	'however',
	'easy',
	'so'
]

const options = {
	templateFormats: ['md'],
	words
}

module.exports = [inclusiveLanguage, words]