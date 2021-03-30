const visible = (data) => {
	const devMode = process.env.ELEVENTY_ENV === `dev`
	const published = !data.draft

	return !!(devMode || published)
}

module.exports = {
	eleventyComputed: {
		eleventyExcludeFromCollections: (data) => visible(data) ? false : true,
	},
	permalink: false,
	tags: [
		`posts`,
		'videos'
	]
}