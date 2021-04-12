const visible = (data) => {
	const devMode = process.env.ELEVENTY_ENV === `dev`
	const published = !data.draft

	return !!(devMode || published)
}

module.exports = {
	eleventyComputed: {
		permalink: (data) => visible(data) ? `${data.page.fileSlug}/index.html` : false,
		eleventyExcludeFromCollections: (data) => visible(data) ? false : true,
		tags: (data) => {
			const tags = data.categories ? [...data.categories] : []

			return [
				...tags,
				`posts`,
			]
		}
	},
	layout: `templates/post.njk`
}