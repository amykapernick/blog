import rss from '@astrojs/rss';

export const get = () => rss({
	// `<title>` field in output xml
	title: `Amy's Blog`,
	// `<description>` field in output xml
	description: `Amy's blog about tech, the web and life`,
	// base URL for RSS <item> links
	// SITE will use "site" from your project's astro.config.
	site: import.meta.env.SITE,
	// list of `<item>`s in output xml
	// simple example: generate items for every md file in /src/pages
	// see "Generating items" section for required frontmatter and advanced use cases
	//   Need to change this for proper feed
	items: import.meta.glob('../../posts/**/*.md'),
	// (optional) inject custom xml
	customData: `<language>en-au</language>`,
});


// <?xml version="1.0" encoding="utf-8"?>
// <feed xmlns="http://www.w3.org/2005/atom">
// 	<title>Amy's Kapers</title>
// 	<subtitle>Amy's blog about tech, the web and life</subtitle>
// 	<link href="{{ env.url }}/feed.json" rel="self"/>
// 	<link href="{{ env.url }}"/>
// 	<updated>{{ collections.posts | rssLastUpdatedDate }}</updated>
// 	<id>{{ env.url }}</id>
// 	<author>
// 		<name>Amy Kapernick</name>
// 		<link>https://amyskapers.dev</link>
// 	</author>
// 	{% if collections.posts %}
// 		{%- for post in collections.posts | reverse %}
// 			{% set absolutePostUrl %}{{ post.url | url | absoluteUrl(env.url) }}{% endset %}
// 			<entry>
// 				<title>{{ post.data.title }}</title>
// 				<link href="{{ absoluteposturl }}"/>
// 				<updated>{{ post.date | rssDate }}</updated>
// 				<id>{{ absolutePostUrl }}</id>
// 				<content type="html">{{ post.templateContent | htmlToAbsoluteUrls(absolutePostUrl) }}</content>
// 			</entry>
// 		{%- endfor %}
// 	{% endif %}
	
// </feed>