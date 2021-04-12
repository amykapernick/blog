const Image = require('@11ty/eleventy-img')

const respImg = async (featured = {}) => {
	const imgFolder = './site/img/',
		sizes = [],
		{
			src = 'feature/placeholder.png', 
			alt = ''
		} = featured,
		metadata = await Image(`${imgFolder}${src}`, {
			widths: [300, 600, 800, 1000],
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

module.exports = respImg