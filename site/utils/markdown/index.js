const path = require('path');

const eleventyRemark = require('@fec/eleventy-plugin-remark')
const gfm = require('remark-gfm')
const github = require('remark-github')
const hint = require('remark-hint')
const oembed = require('remark-oembed')
const squeeze = require('remark-squeeze-paragraphs')
const external = require('remark-external-links')
const a11yEmoji = require('@fec/remark-a11y-emoji')
const attr = require('remark-attr')
const rehype = require('remark-rehype')
const rehypeRaw = require('rehype-raw');
const slug = require('remark-slug')
const stringify = require('rehype-stringify')
const autoLink = require('remark-autolink-headings')
const remark = require('remark')
const html = require('remark-html')
const images = require('@fec/remark-images')
const section = require('remark-sectionize')
const highlight = require('remark-highlight.js')

const processCaption = (markdown) => {
	const caption = remark()
    .use(html)
    .processSync(markdown)
    .toString()

	return caption
}

const options = {
	enableRehype: false,
	plugins: [
		// gfm,
		// github,
		hint,
		// {
		// 	plugin: oembed,
		// 	options: {
		// 		syncWidget: true,
		// 		asyncImg: true,
		// 	}
		// },
		section,
		{
			plugin: highlight,
			options: {

			}
		},
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
				imageSizes: [300, 600, 800],
				elasticContainer: false,
				blurredBackground: false,
				processCaption
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
		  squeeze,
	]
}

module.exports = [eleventyRemark, options]