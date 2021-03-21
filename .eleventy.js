require('dotenv').config()

const {
	browserSyncConfig, 
	templateFormats,
	config
} = require('./site/_config/index.js')

const pluginRss = require('@11ty/eleventy-plugin-rss')
const eleventyRemark = require('./site/utils/markdown/index.js')
const slug = require('./site/utils/filters/slug')
const feedContent = require('./site/utils/filters/feedContent')
const syntaxHighlight = require('./site/utils/markdown/syntaxHighlighting')
const inclusiveLanguage = require('./site/utils/markdown/inclusiveLanguage')
const postContent = require('./site/utils/markdown/postContent')

module.exports = (eleventyConfig) => {
	eleventyConfig.setBrowserSyncConfig(browserSyncConfig)
	eleventyConfig.setQuietMode(true);
	eleventyConfig.setTemplateFormats(templateFormats)

	// Passthrough Copy
	eleventyConfig.addPassthroughCopy('site/admin')
	eleventyConfig.addPassthroughCopy('site/img/**/*.{gif,mp4}')

	// Plugins
	eleventyConfig.addPlugin(pluginRss)
	eleventyConfig.addPlugin(...syntaxHighlight);
	eleventyConfig.addPlugin(...eleventyRemark);
	eleventyConfig.addPlugin(...inclusiveLanguage)

	// Filters
	eleventyConfig.addFilter('slug', slug)
	eleventyConfig.addFilter("feedContent", feedContent);
	eleventyConfig.addFilter('postContent', postContent)

	
	return {
		...config
	}
}
