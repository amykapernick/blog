const gallery = require('./imageGalleries')

const postContent = (content) => {
	let post = content.replace(/<p><\/p>/g, '')

	post = gallery(post)

	return post
}

module.exports = postContent