const Image = require('@11ty/eleventy-img')

const respImg = async (src = 'feature/placeholder.png', alt) => {
	const imgFolder = './site/img/',
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

	console.log(metadata)
	
	return Image.generateHTML(metadata, attributes)
}

module.exports = respImg