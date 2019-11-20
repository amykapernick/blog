import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Img from 'gatsby-image'

import '../scss/layouts/feed.scss'
import { Facebook, Twitter } from 'react-feather'
import AmyKate from '../img/amykate.jpg'
import AimHigher from '../img/aimhigher.png'
import Freelance from '../img/freelancers.png'

const profiles = {
	'Amy Goes To Perth': {
		title: 'Amy Goes to Perth',
		id: 'amykate',
		image: AmyKate,
		url: 'https://amygoestoperth.com.au/',
	},
	AimHigher: {
		title: 'AimHigher Web Design',
		id: 'aimhigher',
		image: AimHigher,
		url: 'https://aimhigherwebdesign.com.au/',
	},
	'The Freelance Guide': {
		title: "Freelancer's Guide",
		id: 'freelance',
		image: Freelance,
		url: 'https://thefreelance.guide/',
	},
}

export default class IndexPage extends React.Component {
	render() {
		const { data } = this.props,
			{ edges: posts } = data.allMarkdownRemark,
			meta = {
				name: data.site.siteMetadata.title,
				description: data.site.siteMetadata.description,
				slug: data.site.siteMetadata.siteUrl,
			}

		return (
			<Layout meta={meta}>
				<h1 className="hidden">Amy Goes to Perth</h1>
				<div className="article-feed">
					{posts.map(({ node: post }) => {
						if (new Date(post.frontmatter.publishDate) > new Date()) {
							return
						}
						const author = profiles[post.frontmatter.mainBlog],
							articleLink = author.url + post.fields.slug,
							facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${articleLink}`,
							twitterLink = `https://twitter.com/home?status=So%20%40amys_kapers%20wrote%20this%20really%20cool%20blog%20post,%20you%20should%20check%20it%20out!%20${articleLink}`

						return (
							<article key={post.id} className={`feed-article ${post.frontmatter.draft ? 'draft' : ''}`}>
								<Img className="image-feature" fixed={post.frontmatter.featuredImage.childImageSharp.fixed} />
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
										<Link to={`${post.fields.slug.replace('/blog/posts', '')}`}>{post.frontmatter.title}</Link>
									</h2>
									<time className="date">{post.frontmatter.publishDate}</time>
								</header>
								<div className="excerpt">{post.excerpt}</div>
								<div className="share-icons">
									<a href={facebookLink} target="_blank" className="facebook share-link">
										{<Facebook />}
										<span>Share article to Facebook (opens in new tab)</span>
									</a>
									<a href={twitterLink} target="_blank" className="twitter share-link">
										{<Twitter />}
										<span>Share article to Twitter (opens in new tab)</span>
									</a>
								</div>
							</article>
						)
					})}
				</div>
			</Layout>
		)
	}
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
		allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___updateDate] }) {
			edges {
				node {
					id
					excerpt(pruneLength: 400)
					fields {
						slug
					}
					frontmatter {
						title
						draft
						publishDate(formatString: "DD MMM YYYY")
						mainBlog
						tags
						featuredImage {
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
