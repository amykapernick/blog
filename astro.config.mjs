import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
import rehypeFigure from './src/utils/rehypeFigure';
import externalLinks from "rehype-external-links";
import captions from 'remark-captions'

export default defineConfig({
	site: 'https://blog.amyskapers.dev',
	markdown: {
		syntaxHighlight: 'prism',
		rehypePlugins: [
			[externalLinks, { rel: ['noopener', 'noreferrer'], target: '_blank' }],
			[rehypeFigure, { allImages: true, useTitle: true }],
			'rehype-picture',
		],
		remarkPlugins: [
			['remark-oembed', { syncWidget: true, asyncImg: true }],
			[captions, {
				external: {
					code: 'Code:'
				}
			}],
			'remark-hint',
			'remark-squeeze-paragraphs',
		],
		extendDefaultPlugins: true,
	},
	integrations: [sitemap(), image({
		serviceEntryPoint: '@astrojs/image/sharp'
	})]
});