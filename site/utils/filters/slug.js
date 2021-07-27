module.exports = (post) => {
	if(post?.data?.external) {
		return post.data.external
	}

	return `/${post.fileSlug}`
}