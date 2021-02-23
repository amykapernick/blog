const replace = (content) => {
	return content.replace(/("*)\/img\//gi, `$1${process.env.SITE_URL}/img/`)
}

module.exports = replace