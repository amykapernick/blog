const Plugin = require('markdown-it-regexp');


const mdFigCaption = Plugin(
	/!\[([^\]]*)\]\(([^(\)| )]*) *([^(\))]*)*\)/,
	(match, utils) => {
		const [_, alt, src, caption] = match

		const html = `
			<figure>
				<img src="${src}" alt="${alt}" />
				<figcaption>${caption}</figcaption>
			</figure>
		`

		console.log({alt, src, caption})
        
        return html;
    }
)

module.exports = mdFigCaption;