module.exports = {
	siteMetadata: {
		title: 'Amy Goes to Perth',
		description: 'Freelance web developer who lives in Perth with her border collie. Just a few musings and ramblings...',
		siteUrl: 'https://amygoestoperth.com.au',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sass',
		{
			resolve: '@danbruegge/gatsby-plugin-stylelint',
			options: {
				files: ['src/scss/**/*.scss'],
			},
		},
		{
			resolve: 'gatsby-plugin-html-attributes',
			options: {
				lang: 'en',
			},
		},
		// react-axe default setup
		{
			resolve: 'gatsby-plugin-react-axe',
			options: {},
		},
		// Gatsby Colourblind filters
		{
			resolve: 'gatsby-plugin-colorblind-filters',
			options: {
				toggleKey: 'p',
				zIndex: 999,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/blog/img`,
				name: 'uploads',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/img`,
				name: 'images',
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/blog/posts`,
				name: 'markdown-pages',
			},
		},
		{
			resolve: 'gatsby-plugin-google-tagmanager',
			options: {
				id: 'GTM-MDKC4WR',
				includeInDevelopment: true,
			},
		},

		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: '@raae/gatsby-remark-oembed',
					},
					{
						resolve: 'gatsby-remark-autolink-headers',
						options: {
							offsetY: '100',
							icon:
								'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
							maintainCase: false,
							removeAccents: true,
							enableCustomId: true,
						},
					},
					'gatsby-remark-relative-images',
					{
						resolve: 'gatsby-remark-images',
						options: {
							showCaptions: true,
							maxWidth: 1000,
							widthWebp: true,
						},
					},
					{
						resolve: 'gatsby-remark-prismjs',
						options: {
							classPrefix: 'language-',
							// This lets you set up language aliases.  For example, setting this to '{ sh: "bash" }' will let you use the language "sh" which will highlight using the bash highlighter.
							aliases: {},
							showLineNumbers: false,
							noInlineHighlight: true,
							// This adds a new language definition to Prism or extend an already existing language definition. More details on this option can be found under the header "Add new language definition or extend an existing language" below.
							languageExtensions: [],
							// Customize the prompt used in shell output
							prompt: {
								user: 'me',
								host: 'amyskapers.dev',
								global: true,
							},
						},
					},
				],
			},
		},
		'gatsby-plugin-netlify-cms',
	],
}
