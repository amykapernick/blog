const chunks = (array, size) => {
	const data = []

	for(let i = 0; i < array.length; i += size) {
		data.push(array.slice(i, i + size))
	}

	return data
}

const allTags = (collectionApi) => {
	const posts = collectionApi.getAllSorted().reverse().map(item => item)
	const tags = [...new Set(posts.map(item => item.data.tags).flat().filter(Boolean))]
	const allData = []
	
	tags.map(tag => {
		const tagPosts = posts.filter(post => {
			return post.data.tags?.includes(tag)
		})

		const tagPages = chunks(tagPosts, 12).map((page, i) => {
			return ({
				name: tag,
				posts: page,
				page: i
			})
		})

		allData.push(...tagPages)
	})		

	// console.log(allData)

	return allData
}

module.exports = allTags