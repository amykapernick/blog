require('dotenv').config()

const fetch = require('node-fetch'),
 syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight"),
{ DateTime } = require('luxon'),
markdownIt = require('markdown-it'),
 markdownItAnchor = require('markdown-it-anchor'),
embedSpotify = require('eleventy-plugin-embed-spotify'),
embedTwitch = require('eleventy-plugin-embed-twitch'),
embedVimeo = require('eleventy-plugin-vimeo-embed'),
embedYoutube = require('eleventy-plugin-youtube-embed'),
embedCanIUse = require('@alexcarpenter/eleventy-plugin-caniuse'),
excerpt = require('eleventy-plugin-excerpt'),
svgContents = require("eleventy-plugin-svg-contents"),
markdownFigures = require('markdown-it-implicit-figures')

const slugs = (string) => (string.toLowerCase().replace(/(#|:|!|\?)/g, '').replace(/\s/g, '-').replace(/--/g, '-'))

module.exports = function(eleventyConfig) {
	eleventyConfig.addFilter('readableDate', dateObj => {
		return DateTime.fromJSDate(dateObj).toFormat('dd LLL yyyy')
	})

	eleventyConfig.addFilter('shortDate', dateObj => {
		console.log(dateObj)
		return DateTime.fromJSDate(dateObj).toFormat('dd LLL')
	})

	eleventyConfig.addFilter('machineDate', dateObj => {
		return DateTime.fromJSDate(dateObj).toFormat('yyyy-MM-dd')
	})
	
	eleventyConfig.addNunjucksFilter('author', data => {
		if(data.categories.includes('AimHigher')) {
			return `<a href="https://aimhigherweb.design/blog" target="_blank" rel="nofollow">
				<img src="/img/aimhigher.png" alt="Logo for AimHigher" /></a>`
		}
		else if (data.external && data.author) {
			return `<a href="${data.external}" target="_blank" rel="nofollow">
				<img src="${data.author}" alt="Profile image for external website" /></a>`
		}
		else {
			return `<a href="https://amyskapers.dev" target="_blank" rel="nofollow">
				<img src="/img/amy-quokka.jpg" alt="Profile Image for Amy Kapernick" /></a>`
		}
	})

	eleventyConfig.addFilter('vardump', data => {
		console.log(data)

		return 'Check Console'
	})

	eleventyConfig.addShortcode('slug', (title) => {
		return slugs(title)
	})

	eleventyConfig.addShortcode('posturl', (site, title) => {
		title = title || ''

		return `${site}/${slugs(title)}`
	})

	eleventyConfig.addShortcode('tweet', (tweet) => {
		return fetch(`https://publish.twitter.com/oembed?url=${tweet}`).then(res => res.json()).then(data => data.html)
	})

	eleventyConfig.addShortcode('insta', (insta) => {
		return fetch(`https://api.instagram.com/oembed?url=${insta}`).then(res => res.json()).then(data => data.html.replace(/max-width:\d+px/, ''))
	})

	eleventyConfig.addPlugin(syntaxHighlight)
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
		.use(markdownItAnchor, {
			permalink: true,
			permalinkBefore: true,
			permalinkSymbol: '<svg viewBox="0 0 512 512" width="512" height="512"><g><path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"/></g></svg><span>Link to Header</span>'
		})
		.use(markdownFigures, {
			figcaption: true,
		})
		.use(require('markdown-it-code-embed'), {
			user: 'amys_kapers'
		})
	)

	eleventyConfig.setBrowserSyncConfig({
		notify: true,
		watch: true,
	})


}
