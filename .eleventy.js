require('dotenv').config()

const slug = require('./site/src/filters/slug'),
pluginRss = require('@11ty/eleventy-plugin-rss')
const excerpt = require('eleventy-plugin-excerpt');

module.exports = (eleventyConfig) => {
	eleventyConfig.setBrowserSyncConfig({
		notify: false,
		watch: true,
		logFileChanges: false,
		logPrefix: "Blog"
	})
	eleventyConfig.setQuietMode(true);

	eleventyConfig.addPassthroughCopy('site/admin')
	eleventyConfig.addPassthroughCopy({'site/src/img': 'img'})

	// Plugins
	eleventyConfig.addPlugin(pluginRss)
	eleventyConfig.addPlugin(excerpt)

	// Filters
	eleventyConfig.addFilter('slug', slug)

	// Markdown

	// Other Config
	return {
		dir: {
			input: "site"
		},
		markdownTemplateEngine: 'njk'
	}
}
