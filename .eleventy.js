require('dotenv').config()

module.exports = function(eleventyConfig) {
	eleventyConfig.setBrowserSyncConfig({
		notify: true,
		watch: true,
	})
}
