const absoluteImages = require('../markdown/absoluteImages')

const feedContent = (content) => {

	return 	absoluteImages(content)

}

module.exports = feedContent