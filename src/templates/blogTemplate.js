import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

import '../scss/layouts/article.scss'
import '../scss/partials/prismjs_dark.scss'
import { Facebook, Twitter } from 'react-feather'
import AmyKate from '../img/amykate.jpg'
import AimHigher from '../img/aimhigher.png'
import Freelance from '../img/freelancers.png'

const profiles = {
	'Amy Goes to Perth': {
		title: 'Amy Goes to Perth',
		id: 'amykate',
		image: AmyKate,
		url: 'https://amygoestoperth.com.au',
	},
	AimHigher: {
		title: 'AimHigher Web Design',
		id: 'aimhigher',
		image: AimHigher,
		url: 'https://aimhigherwebdesign.com.au',
	},
	'Freelance Guide': {
		title: "Freelancer's Guide",
		id: 'freelance',
		image: Freelance,
		url: 'https://thefreelance.guide',
	},
}

const BlogPost = ({ data }) => {
	const { contentfulBlogPost: post } = data,
		blogPost = {
			content: post.body.childMarkdownRemark.html,
			title: post.title,
			slug: post.slug,
			publishDate: post.publishDate || post.createdAt,
			updateDate: post.updatedDate || post.publishDate || post.updatedAt,
			tags: post.tags,
			siteUrl: data.site.siteMetadata.siteUrl,
		},
		meta = {
			name: post.title + ' | ' + data.site.siteMetadata.title,
			description: post.description.description,
			slug: data.site.siteMetadata.siteUrl + post.slug,
			image: post.featuredImage.file.url,
		}

	return (
		<Layout meta={meta}>
			<BlogPostTemplate {...blogPost} />
		</Layout>
	)
}

export const BlogPostTemplate = ({ content, title, slug, blog, tags, publishDate, updateDate, siteUrl }) => {
	const articleLink = `${siteUrl}${slug}`,
		facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${articleLink}`,
		twitterLink = `https://twitter.com/home?status=So%20%40amys_kapers%20wrote%20this%20really%20cool%20blog%20post,%20you%20should%20check%20it%20out!%20${articleLink}`

	let author = profiles['Amy Goes to Perth']

	if (blog) {
		if (blog.includes('The Freelance Guide')) {
			author = profiles['Freelance Guide']
		} else if (blog.includes('AimHigher')) {
			author = profiles['AimHigher']
		}
	}

	const intro = (
		<div className="share-icons">
			<a href={facebookLink} target="_blank" className="facebook share-link">
				{<Facebook />}
				<span>Share article to Facebook (opens in new tab)</span>
			</a>
			<a href={twitterLink} target="_blank" className="twitter share-link">
				{<Twitter />}
				<span>Share article to Twitter (opens in new tab)</span>
			</a>
			<div className="author">
				{author.url !== '' ? (
					<a href={author.url + slug} target="_blank" rel="nofollow" title={'Link to host blog, ' + author.title}>
						<img alt="Profile Image" src={author.image} />
					</a>
				) : (
					<img alt="Profile Image" src={author.image} />
				)}
			</div>
		</div>
	)

	return (
		<article className="article-content article content">
			<header>
				<h1>{title}</h1>
				<div className="article-intro">
					{intro}
					<time className="date" dateTime={updateDate}>
						{updateDate}
					</time>
				</div>
			</header>
			<div dangerouslySetInnerHTML={{ __html: content }} />
			<Link to="/" className="back end">
				Back to Article Feed
			</Link>
		</article>
	)
}

export default BlogPost

export const pageQuery = graphql`
	query BlogPostByID($id: String!) {
		site {
			siteMetadata {
				title
				siteUrl
			}
		}
		contentfulBlogPost(id: { eq: $id }) {
			title
			tags
			publishDate(formatString: "DD MMM YYYY")
			updatedAt(formatString: "DD MMM YYYY")
			updatedDate(formatString: "DD MMM YYYY")
			createdAt(formatString: "DD MMM YYYY")
			slug
			blog
			description {
				description
			}
			body {
				childMarkdownRemark {
					html
				}
			}
			featuredImage {
				file {
					url
				}
			}
		}
	}
`
