require('dotenv').config()

const slug = require('./src/filters/slug'),
pluginRss = require('@11ty/eleventy-plugin-rss')

module.exports = (eleventyConfig) => {
	eleventyConfig.setBrowserSyncConfig({
		notify: true,
		watch: true,
	})

	// Plugins
	eleventyConfig.addPlugin(pluginRss)

	// Filters
	eleventyConfig.addFilter('slug', slug)
}
