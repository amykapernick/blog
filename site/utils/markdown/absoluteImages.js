const replace = (content) => {
	return content.replace(/"\/img\//gi, `${process.env.SITE_URL}/img/`)
}

module.exports = replace