const slugify = require('slugify')

module.exports = (string, replacement = '-') => slugify(string, {
	replacement,
	lower: true,
	remove: /[*+~.()'"!:@#]/g
})