const slugify = (string) => {
	return string.replace(/ /g, '-').toLowerCase()
}

module.exports = (item) => {
	if(item?.data?.external) {
		return item.data.external
	}

	if(typeof item == 'string') {
		return slugify(item)
	}
	

	return `/${item.fileSlug}`
}