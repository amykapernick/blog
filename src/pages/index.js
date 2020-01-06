import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Img from 'gatsby-image'

import '../scss/layouts/feed.scss'
import { Facebook, Twitter } from 'react-feather'
import AmyKate from '../img/amykate.jpg'
import AimHigher from '../img/aimhigher.png'
import Freelance from '../img/freelancers.png'
import Owl from '../img/owl.svg'

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

export default class IndexPage extends React.Component {
	render() {
		const { data } = this.props,
			{ edges: posts } = data.allContentfulBlogPost,
			meta = {
				name: data.site.siteMetadata.title,
				description: data.site.siteMetadata.description,
				slug: data.site.siteMetadata.siteUrl,
			}

		return (
			<Layout meta={meta}>
				<h1 className="hidden">{data.site.siteMetadata.title}</h1>
				<div className="article-feed">
					{posts.map(({ node: post }) => {
						// if (!post.frontmatter.draft || process.env.NODE_ENV == 'development') {
						return <Article {...post} key={post.contentful_id} />
						// }
					})}
				</div>
			</Layout>
		)
	}
}

const Article = ({ title, tags, publishDate, slug, blog, updatedAt, body, contentful_id, featuredImage, featured }) => {
	// if (new Date(frontmatter.publishDate) > new Date()) {
	// 	return
	// }

	let author = profiles['Amy Goes to Perth']

	if (blog) {
		if (blog.includes('The Freelance Guide')) {
			author = profiles['Freelance Guide']
		} else if (blog.includes('AimHigher')) {
			author = profiles['AimHigher']
		}
	}

	const articleLink = `${author.url}${slug}`,
		facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${articleLink}`,
		twitterLink = `https://twitter.com/home?status=So%20%40amys_kapers%20wrote%20this%20really%20cool%20blog%20post,%20you%20should%20check%20it%20out!%20${articleLink}`,
		image = featuredImage.localFile

	return (
		<article key={contentful_id} className={`feed-article ${featured && 'featured'}`}>
			<div className="image-feature">
				<Img fixed={image.childImageSharp.fixed} />
			</div>
			<div className="author">
				<div className="image-profile">
					{author.url !== '' ? (
						<a href={author.url} target="_blank" rel="nofollow" title={'Link to host blog, ' + author.title}>
							<img alt="Profile Image" src={author.image} />
						</a>
					) : (
						<img alt="Profile Image" src={author.image} />
					)}
				</div>
			</div>
			<header>
				<h2 className="article-title">
					<Link to={`${slug.replace('/blog/posts', '')}`}>{title}</Link>
				</h2>

				<time className="date">{publishDate}</time>
			</header>
			<div className="excerpt">{body.childMarkdownRemark.excerpt}</div>
			<div className="share-icons">
				<a href={facebookLink} target="_blank" className="facebook share-link">
					{<Facebook />}
					<span>Share article to Facebook (opens in new tab)</span>
				</a>
				<a href={twitterLink} target="_blank" className="twitter share-link">
					<span className="twitter">
						<Twitter />
					</span>
					<span className="owl">
						<Owl />
					</span>
					<span>Share article to Twitter (opens in new tab)</span>
				</a>
			</div>
		</article>
	)
}

export const pageQuery = graphql`
	query IndexQuery {
		site {
			siteMetadata {
				title
				description
				siteUrl
			}
		}
		allContentfulBlogPost(sort: { order: DESC, fields: updatedAt }) {
			edges {
				node {
					title
					tags
					publishDate(formatString: "DD MMM YYYY")
					contentful_id
					slug
					blog
					updatedAt(formatString: "DD MMM YYYY")
					description {
						description
					}
					body {
						childMarkdownRemark {
							excerpt(format: PLAIN, pruneLength: 400)
						}
					}
					featuredImage {
						localFile {
							childImageSharp {
								fixed(width: 500) {
									...GatsbyImageSharpFixed_withWebp
								}
							}
						}
					}
				}
			}
		}
	}
`
