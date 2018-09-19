import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

export default class IndexPage extends React.Component {
    render() {
        const { data } = this.props
        const { edges: posts } = data.allMarkdownRemark

        return (
            <Layout>
            {posts.map(({node: post}) => (
                <article>
                    <h1>{post.frontmatter.title}</h1>
                    <p>{post.frontmatter.publishDate}</p>
                    <p>{post.fields.slug}</p>
                    <h2>Meta Description</h2>
                    <p>{post.frontmatter.description}</p>
                    <h2>Excerpt</h2>
                    <p>{post.excerpt}</p>
                    <h2>Post content</h2>
                    <div dangerouslySetInnerHTML={{__html: post.html}}></div>
                </article>
            ))} 
            </Layout>
        )
    }
}

IndexPage.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}
  
export const pageQuery = graphql`
    query IndexQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___updateDate] }
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            fields {
                slug
            }
            html
            frontmatter {
              title
              publishDate(formatString: "DD MMM YYYY")
              description
            }
          }
        }
      }
    }
  `
  