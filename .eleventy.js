require('dotenv').config()

const slug = require('./src/filters/slug')

module.exports = (eleventyConfig) => {
	eleventyConfig.setBrowserSyncConfig({
		notify: true,
		watch: true,
	})

	// Filters
	eleventyConfig.addFilter('slug', slug)
}
