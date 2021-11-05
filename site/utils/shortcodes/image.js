const Image = require('@11ty/eleventy-img')

const respImg = (featured = {}) => {
	const sizes = []
	const {src = 'feature/placeholder.png', alt = ''} = featured
	const options = {
		widths: [300, 600, 800, 1000],
		formats: ['jpg', 'webp'],
		outputDir: './_site/img/',
		urlPath: '/img/'
	}
	const imgSrc = `./site/img/${src}`

	Image(imgSrc, options)
	
	const attributes = {
		alt,
		sizes,
		loading: 'lazy',
	}
	const metadata = Image.statsSync(imgSrc, options)
	
	return Image.generateHTML(metadata, attributes)
}

module.exports = respImg