const visible = (data) => {
	const devMode = process.env.ELEVENTY_ENV === `dev`
	const published = !data.draft

	return !!(devMode || published)
}

module.exports = {
	eleventyComputed: {
		permalink: (data) => visible(data) ? false : `{{title | slug}}/index.html`,
		eleventyExcludeFromCollections: (data) => visible(data) ? false : true,
	},
	layout: `layouts/post.njk`,
	tags: [
		`posts`
	]
}