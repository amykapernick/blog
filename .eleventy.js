require('dotenv').config()

const slug = require('./site/src/filters/slug'),
pluginRss = require('@11ty/eleventy-plugin-rss')

module.exports = (eleventyConfig) => {
	eleventyConfig.setBrowserSyncConfig({
		notify: true,
		watch: true,
	})
	eleventyConfig.addPassthroughCopy('site/admin')
	eleventyConfig.addPassthroughCopy({'site/src/img': 'img'})

	// Plugins
	eleventyConfig.addPlugin(pluginRss)

	// Filters
	eleventyConfig.addFilter('slug', slug)

	// Other Config
	return {
		dir: {
			input: "site"
		},
		markdownTemplateEngine: 'njk'
	}
}
