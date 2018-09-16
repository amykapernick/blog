import React from "react"
import { graphql } from "gatsby"

export default function Template({data}) {
    const { markdownRemark } = data // data.markdownRemark holds our post data
    const { frontmatter } = markdownRemark
    return (
        <div className="blog-post-container">
            <div className="blog-post">
                <h1>{frontmatter.title}</h1>
                <h2>{frontmatter.publishDate}</h2>
            </div>
        </div>
    )
}

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            frontmatter {
                publishDate(formatString: "DD MMM YYYY")
                title
            }
        }
    }
`