import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

export const BlogPostTemplate = ({content, description, title}) => {
    return (
        <section className="section">
            <h1>{title}</h1>
            <p>{description}</p>
            <div>{content}</div>
        </section>
    )
}

BlogPostTemplate.propTypes = {
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        description={post.frontmatter.description}
        title={post.frontmatter.title}
      />
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
      html
      frontmatter {
        publishDate(formatString: "DD MMMM YYYY")
        updateDate(formatString: "DD MMMM YYYY")
        title
        description
      }
    }
  }
`
