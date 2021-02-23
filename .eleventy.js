require('dotenv').config()

const slug = require('./site/src/filters/slug'),
pluginRss = require('@11ty/eleventy-plugin-rss')
const excerpt = require('eleventy-plugin-excerpt');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const image = './site/utils/image.js'
const markdown = require('./site/utils/markdown/index.js')
const markdownIt = require('markdown-it')
const markdownFigures = require('markdown-it-implicit-figures')

module.exports = (eleventyConfig) => {
	eleventyConfig.setBrowserSyncConfig({
		notify: false,
		watch: true,
		logFileChanges: false,
		logPrefix: "Blog"
	})
	eleventyConfig.setQuietMode(true);

	eleventyConfig.setTemplateFormats(['html', 'md', 'njk', 'png', 'jpg', 'css'])

	// Markdown
	eleventyConfig.setLibrary('md', markdown)


	eleventyConfig.addPassthroughCopy('site/admin')
	eleventyConfig.addPassthroughCopy({'site/src/img': 'img'})

	// Plugins
	eleventyConfig.addPlugin(pluginRss)
	eleventyConfig.addPlugin(excerpt)
	eleventyConfig.addPlugin(syntaxHighlight, {
		// e.g. Use syntax highlighters in njk and md Eleventy templates (not liquid)
		// templateFormats: ["njk", "md"],
		alwaysWrapLineHighlights: true,
		trim: true,
		lineSeparator: "<br>",
	});

	// Filters
	eleventyConfig.addFilter('slug', slug)
	eleventyConfig.addNunjucksFilter("feedContent", (content) => {
		// console.log(content)

		return content
	});

	

	// Other Config
	return {
		dir: {
			input: "site"
		},
	}
}
