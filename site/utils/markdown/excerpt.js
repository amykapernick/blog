const remark = require('remark')
const strip = require('strip-markdown')

const excerpt = (file, options) => {
	if(!file?.data?.excerpt) {
		const content = file.content
			.split('\n')
			.filter(i => i !== '')
			.slice(0, 1)
			.join('')

		file.data.excerpt = remark().use(strip).processSync(content).toString()
	}
	
}

module.exports = {
	excerpt
}