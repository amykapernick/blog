require('dotenv').config()

const slug = require('./src/filters/slug'),
pluginRss = require('@11ty/eleventy-plugin-rss')

module.exports = (eleventyConfig) => {
	eleventyConfig.setBrowserSyncConfig({
		notify: true,
		watch: true,
	})
	eleventyConfig.addPassthroughCopy('admin')
	eleventyConfig.addPassthroughCopy({'src/img': 'img'})

	// Plugins
	eleventyConfig.addPlugin(pluginRss)

	// Filters
	eleventyConfig.addFilter('slug', slug)
}
