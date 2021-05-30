const allItems = (collectionApi) => {
	const content = collectionApi.getAllSorted().reverse()
	const types = ['posts', 'video', 'podcasts']
	// console.log(content[0].data.tags)
	return content.filter(item => item.data.tags.some(tag => types.indexOf(tag !== -1)))
}

module.exports = allItems