const allItems = (collectionApi) => {
	const content = collectionApi.getAllSorted().reverse()
	const types = ['posts', 'videos', 'podcasts']
	const allFiltered = content.filter(item => types.some(type => item.data.tags?.includes(type)))

	return allFiltered
}

module.exports = allItems