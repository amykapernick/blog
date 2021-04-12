const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

const config = {
	alwaysWrapLineHighlights: true,
	trim: true,
	lineSeparator: "<br>",
	templateFormats: ["njk", "md"]
}

module.exports = [syntaxHighlight, config]