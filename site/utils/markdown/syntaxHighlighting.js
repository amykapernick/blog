const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

const config = {
	alwaysWrapLineHighlights: true,
	trim: true,
	lineSeparator: "<br>",
}

module.exports = [syntaxHighlight, config]