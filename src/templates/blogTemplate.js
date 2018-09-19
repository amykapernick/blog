import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

export const BlogPostTemplate = ({content, description, title, slug, publishDate, updateDate}) => {
    return (
        <article>
            <h1>{title}</h1>
            <p>{publishDate}</p>
            {publishDate != updateDate && <p>{updateDate}</p>}
            <p>{slug}</p>
            <h2>Meta Description</h2>
            <p>{description}</p>
            <h2>Excerpt</h2>
            <h2>Post content</h2>
            <div dangerouslySetInnerHTML={{__html: content}}></div>
        </article>
    )
}

BlogPostTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    description: PropTypes.string,
    title: PropTypes.string,
}

const BlogPost = ({ data }) => {
    const { markdownRemark: post } = data

    const blogPost = {
        content: post.html,
        description: post.frontmatter.description,
        title: post.frontmatter.title,
        slug: post.fields.slug,
        publishDate: post.frontmatter.publishDate,
        updateDate: post.frontmatter.updateDate
    }

    return (
        <Layout>
        <BlogPostTemplate {...blogPost} />
        </Layout>
    )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
    query BlogPostByID($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            fields {
                slug
            }
            html
            frontmatter {
                publishDate(formatString: "DD MMM YYYY")
                updateDate(formatString: "DD MMM YYYY")
                title
                description
            }
        }
    }
`
