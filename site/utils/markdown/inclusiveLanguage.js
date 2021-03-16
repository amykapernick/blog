const inclusiveLanguage = require('../../../plugins/eleventy-plugin-inclusive-language/')

const words = [
	'simply',
	'obviously',
	'basically',
	'of course',
	'clearly',
	'just',
	'everyone knows',
	'however',
	'easy',
	'so'
]

const exclude = [
	'./site/posts/women-in-tech-my-story',
	'./site/posts/**/*-a-retrospective.md',
	'./site/posts/a-cultural-agenda.md',
	'./site/posts/a-week-wallet-free.md',
	'./site/posts/all-the-balls-in-the-air.md',
	'./site/posts/an-origin-story.md',
	'./site/posts/being-a-more-sustainable-you.md',
	'./site/posts/ddd-perth-2018.md',
	'./site/posts/developers-developers-developers.md',
	'./site/posts/farewell-to-cssconf-au.md',
	'./site/posts/frocktober.md',
	'./site/posts/global-diversity-cfp-day-2020.md',
	'./site/posts/happy-birthday-to-me.md',
	'./site/posts/jaoo-for-yow-brisbane.md',
	'./site/posts/ndc-minnesota-2019.md',
	'./site/posts/never-gonna-give-you-up-never-gonna-let-you-down.md',
	'./site/posts/on-submitting-to-conferences.md',
	'./site/posts/online-dating-and-rental-houses.md',
	'./site/posts/this-is-your-first-post.md',
	'./site/posts/women-in-tech-my-story.md',
	'./site/posts/yeow-for-yow-west.md',
]

const options = {
	templateFormats: ['md'],
	words,
	exclude
}



module.exports = [inclusiveLanguage, options]