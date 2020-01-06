const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

require('dotenv').config()
exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions

	console.log(process.env.NODE_ENV)

	return graphql(`
		{
			allContentfulBlogPost {
				edges {
					node {
						slug
						id
					}
				}
			}
		}
	`).then(result => {
		if (result.errors) {
			result.errors.forEach(e => console.error(e.toString()))
			return Promise.reject(result.errors)
		}

		const posts = result.data.allContentfulBlogPost.edges

		posts.forEach(edge => {
			const id = edge.node.id
			// if (edge.node.frontmatter.draft && process.env.NODE_ENV !== 'development') {
			// 	return
			// } else {
			createPage({
				path: edge.node.slug,
				component: path.resolve(`src/templates/blogTemplate.js`),
				// additional data can be passed via context
				context: {
					id,
				},
			})
			// }
		})
	})
}

// exports.onCreateNode = ({ node, actions, getNode }) => {
// 	const { createNodeField } = actions
// 	fmImagesToRelative(node)

// 	if (node.internal.type === `MarkdownRemark`) {
// 		const value = createFilePath({ node, getNode })
// 		createNodeField({
// 			name: `slug`,
// 			node,
// 			value,
// 		})
// 	}
// }
