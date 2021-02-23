require('dotenv').config()

const slug = require('./site/utils/filters/slug'),
pluginRss = require('@11ty/eleventy-plugin-rss')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const eleventyRemark = require('@fec/eleventy-plugin-remark')
const remarkOptions = require('./site/utils/markdown/index.js')

module.exports = (eleventyConfig) => {
	eleventyConfig.setBrowserSyncConfig({
		notify: false,
		watch: true,
		logFileChanges: false,
		logPrefix: "Blog"
	})
	eleventyConfig.setQuietMode(true);

	eleventyConfig.setTemplateFormats(['html', 'md', 'njk', 'png', 'jpg', 'css'])


	eleventyConfig.addPassthroughCopy('site/admin')
	eleventyConfig.addPassthroughCopy('site/img/**/*.{gif,mp4}')

	// Plugins
	eleventyConfig.addPlugin(pluginRss)
	eleventyConfig.addPlugin(syntaxHighlight, {
		alwaysWrapLineHighlights: true,
		trim: true,
		lineSeparator: "<br>",
	});
	eleventyConfig.addPlugin(eleventyRemark, remarkOptions)

	// Filters
	eleventyConfig.addFilter('slug', slug)
	eleventyConfig.addNunjucksFilter("feedContent", (content) => {
		// console.log(content)

		return content
	});

	

	// Other Config
	return {
		dir: {
			input: "site",
			markdownTemplateEngine: 'njk'
		},
	}
}
