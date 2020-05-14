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
excerpt = require('eleventy-plugin-excerpt'),
svgContents = require("eleventy-plugin-svg-contents")
// markdownFigures = require('markdown-it-implicit-figures')

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
	
	eleventyConfig.addNunjucksFilter('author', data => {
		if(data.categories.includes('AimHigher')) {
			return `<a href="https://aimhigherweb.design/blog" target="_blank" rel="nofollow">
				<img src="/img/aimhigher.png"/></a>`
		}
		else if (data.external && data.author) {
			return `<a href="${data.external}" target="_blank" rel="nofollow">
				<img src="${data.author}"/></a>`
		}
		else {
			return `<a href="https://amyskapers.dev" target="_blank" rel="nofollow">
				<img src="/img/amy-quokka.jpg"/></a>`
		}
	})

	eleventyConfig.addFilter('vardump', data => {
		console.log(data)

		return 'Check Console'
	})

	eleventyConfig.addPlugin(syntaxHighlight)
	eleventyConfig.addPlugin(embedInstagram)
	eleventyConfig.addPlugin(embedSpotify)
	eleventyConfig.addPlugin(embedTwitch)
	eleventyConfig.addPlugin(embedVimeo)
	eleventyConfig.addPlugin(embedYoutube)
	eleventyConfig.addPlugin(embedCanIUse)
	eleventyConfig.addPlugin(excerpt);
	eleventyConfig.addPlugin(svgContents);


	eleventyConfig.addPassthroughCopy('img')
	eleventyConfig.addPassthroughCopy('fonts')
	eleventyConfig.addPassthroughCopy('js')

	eleventyConfig.setTemplateFormats(['html', 'md', 'js', 'njk', 'png', 'jpg', 'css'])

	eleventyConfig.addWatchTarget('./_includes/scss/')
	eleventyConfig.addWatchTarget('index.njk')



	eleventyConfig.setLibrary('md', 
		markdownIt({
			html: true,
			breaks: true,
			linkify: true
		})
		.use(markdownItAnchor, {permalink: false})
		// .use(markdownFigures, {
		// 	dataType: false,  // <figure data-type="image">, default: false
		// 	figcaption: false,  // <figcaption>alternative text</figcaption>, default: false
		// 	tabindex: false, // <figure tabindex="1+n">..., default: false
		// 	link: false // <a href="img.png"><img src="img.png"></a>, default: false
		//   })
	)

	eleventyConfig.setBrowserSyncConfig({
		notify: true,
		watch: true,
	})


}
