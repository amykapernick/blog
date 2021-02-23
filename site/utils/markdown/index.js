const markdownIt = require('markdown-it')
const markdownFigures = require('markdown-it-implicit-figures')
const mdFigCaption = require('./figures')
const markdownItAttrs = require('markdown-it-attrs')

const options = {
	html: true,
	breaks: true,
	linkify: true,
}

const figOptions = {
	figcaption: true,
	copyAttrs: true
}

const attrOpts = {
	leftDelimiter: '{',
  rightDelimiter: '}',
  allowedAttributes: ['alt']
}

const markdown = markdownIt(options).use(markdownItAttrs)

module.exports = markdown