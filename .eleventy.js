require('dotenv').config()

const {
	browserSyncConfig, 
	templateFormats,
	config
} = require('./site/_config/index.js')

const pluginRss = require('@11ty/eleventy-plugin-rss')
const svgContents = require('eleventy-plugin-svg-contents')
const eleventyRemark = require('./site/utils/markdown/index.js')
const slug = require('./site/utils/filters/slug')
const feedContent = require('./site/utils/filters/feedContent')
const postContent = require('./site/utils/markdown/postContent')
const formatDate = require('./site/utils/filters/date')
const image = require('./site/utils/shortcodes/image')
const excerpt = require('./site/utils/markdown/excerpt')
const socialShare = require('./site/utils/filters/socialShare')
const svg = require('./site/utils/plugins/svg')
const content = require('./site/utils/content/all')
const allTags = require('./site/utils/content/tags.js')

module.exports = (eleventyConfig) => {
	eleventyConfig.setBrowserSyncConfig(browserSyncConfig)
	eleventyConfig.setQuietMode(true);
	eleventyConfig.setTemplateFormats(templateFormats)
	eleventyConfig.addWatchTarget('site/src/scss/**/*')

	// Passthrough Copy
	eleventyConfig.addPassthroughCopy('site/admin')
	eleventyConfig.addPassthroughCopy('site/img/**/*.{gif,mp4}')
	eleventyConfig.addPassthroughCopy({'site/src/fonts': 'fonts'})
	eleventyConfig.addPassthroughCopy({'site/src/img': 'img'})

	// Plugins
	eleventyConfig.addPlugin(pluginRss)
	eleventyConfig.addPlugin(...eleventyRemark);
	eleventyConfig.addPlugin(...svg)
	eleventyConfig.addPlugin(svgContents)

	eleventyConfig.setFrontMatterParsingOptions(excerpt)

	// Filters
	eleventyConfig.addFilter('slug', slug)
	eleventyConfig.addFilter('formatDate', formatDate)
	eleventyConfig.addFilter('feedContent', feedContent);
	eleventyConfig.addFilter('postContent', postContent)
	eleventyConfig.addFilter('socialShare', socialShare)
	eleventyConfig.addFilter(`keys`, obj => Object.keys(obj));
	eleventyConfig.addFilter(`debug`, data => {
		return `<script>console.log('${JSON.stringify(data)}')</script>`
	});

	// Custom Collections
	eleventyConfig.addCollection('content', (collectionApi) => {
		return content(collectionApi)
	})
	eleventyConfig.addCollection('tags', (collectionApi) => {
		return allTags(collectionApi)
	})

	// Shortcodes
	eleventyConfig.addNunjucksShortcode('image', image)

	
	return {
		...config
	}
}
