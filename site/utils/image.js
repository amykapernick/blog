const Image = require('@11ty/eleventy-img')

const respImg = async (src, alt) => {
	const imgFolder = './site/src/img/',
	sizes = [],
	metadata = await Image(`${imgFolder}${src}`, {
		widths: [300, 600],
		formats: ['jpg', 'webp'],
		outputDir: './_site/img/',
		urlPath: '/img/'
	}),
	attributes = {
		alt,
		sizes,
		loading: 'lazy',
	}
	
	return Image.generateHTML(metadata, attributes)
}

module.exports = {
	respImg
}