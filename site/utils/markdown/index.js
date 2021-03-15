const path = require('path');

const eleventyRemark = require('@fec/eleventy-plugin-remark')
const gfm = require('remark-gfm')
const github = require('remark-github')
const hint = require('remark-hint')
const kbd = require('remark-kbd')
const oembed = require('@agentofuser/remark-oembed')
const squeeze = require('remark-squeeze-paragraphs')
const external = require('remark-external-links')
const a11yEmoji = require('@fec/remark-a11y-emoji')
const abbr = require('remark-abbr')
const attr = require('remark-attr')
const rehype = require('remark-rehype')
const rehypeRaw = require('rehype-raw');
const slug = require('rehype-slug')
const stringify = require('rehype-stringify')
const autoLink = require('remark-autolink-headings')
const sanitise = require('rehype-sanitize')
const images = require('@fec/remark-images')

const options = {
	enableRehype: false,
	plugins: [
		// github,
		hint,
		// kbd,
		// oembed,
		squeeze,
		{
			plugin: external,
			options: {
				target: '_blank',
				rel: 'nofollow',
				protocols: ['http', 'https'],
			}
		},
		a11yEmoji,
		slug,
		{
			plugin: autoLink,
			options: {
				behavior: 'prepend',
				linkProperties: {
					ariaHidden: 'true', 
					tabIndex: -1
				}
			}
		},
		{
		    plugin: images,
		    options: {
				srcDir: path.join(__dirname, '../../../site'),
				targetDir: path.join(__dirname, '../../../_site'),
				figureClassName: '',
				pictureClassName: '',
				imgClassName: '',
				figCaptionClassName: '',
				loadingPolicy: 'lazy',
				imageSizes: [320, 640, 960],
				elasticContainer: true,
				blurredBackground: true
		    },
		  },
		  {
			plugin: rehype,
			options: { 
				allowDangerousHtml: true 
			},
		  },

		  rehypeRaw,
		  stringify,	
	]
}

module.exports = [eleventyRemark, options]