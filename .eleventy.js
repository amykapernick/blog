require('dotenv').config()

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight"),
{ DateTime } = require('luxon'),
markdownIt = require('markdown-it'),
 markdownItAnchor = require('markdown-it-anchor')
embedInstagram = require("eleventy-plugin-embed-instagram"),
embedSpotify = require('eleventy-plugin-embed-spotify'),
embedTwitch = require('eleventy-plugin-embed-twitch'),
embedVimeo = require('eleventy-plugin-vimeo-embed'),
embedYoutube = require('eleventy-plugin-youtube-embed'),
embedCanIUse = require('@alexcarpenter/eleventy-plugin-caniuse'),
excerpt = require('eleventy-plugin-excerpt')

module.exports = function(eleventyConfig) {
	eleventyConfig.addFilter('readableDate', dateObj => {
		return DateTime.fromJSDate(dateObj).toFormat('dd LLL yyyy')
	})

	eleventyConfig.addFilter('shortDate', dateObj => {
		return DateTime.fromJSDate(dateObj).toFormat('dd LLL')
	})

	eleventyConfig.addFilter('machineDate', dateObj => {
		return DateTime.fromJSDate(dateObj).toFormat('yyyy-MM-dd')
	})

	eleventyConfig.addPlugin(syntaxHighlight)
	eleventyConfig.addPlugin(embedInstagram)
	eleventyConfig.addPlugin(embedSpotify)
	eleventyConfig.addPlugin(embedTwitch)
	eleventyConfig.addPlugin(embedVimeo)
	eleventyConfig.addPlugin(embedYoutube)
	eleventyConfig.addPlugin(embedCanIUse)
	eleventyConfig.addPlugin(excerpt);

	eleventyConfig.addPassthroughCopy('img')
	eleventyConfig.addPassthroughCopy('fonts')
	eleventyConfig.addPassthroughCopy('js')

	eleventyConfig.setTemplateFormats(['html', 'md', 'js', 'njk', 'png', 'jpg', 'css'])

	eleventyConfig.addWatchTarget('./_includes/scss/')
	eleventyConfig.addWatchTarget('index.njk')



	eleventyConfig.setLibrary('md', markdownIt({
		html: true,
		breaks: true,
		linkify: true
	}).use(markdownItAnchor, {permalink: false}))

	eleventyConfig.setBrowserSyncConfig({
		notify: true,
		watch: true,
	})

	eleventyConfig.setLibrary('md', markdownIt({
		html: true,
		breaks: true
	}))


}
