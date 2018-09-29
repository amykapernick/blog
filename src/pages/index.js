import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

import '../scss/layouts/feed.scss';
import '../scss/layouts/home.scss';
import {Facebook, Twitter} from 'react-feather';
import AmyKate from '../img/amykate.jpg';
import AimHigher from '../img/aimhigher.png';
import Freelance from '../img/freelancers.png';

const profiles = {
    'amykate': {
      'title': 'Amy Goes to Perth',
      'id': 'amykate',
      'image': AmyKate,
      'url': ''
    },
    'AimHigher': {
      'title': 'AimHigher Web Design',
      'id': 'aimhigher',
      'image': AimHigher,
      'url': 'https://aimhigherwebdesign.com.au/'
    },
    'Freelance': {
      'title': "Freelancer's Guide",
      'id': 'freelance',
      'image': Freelance,
      'url': 'https://thefreelance.guide/'
    },
  };

export default class IndexPage extends React.Component {
    render() {
        const { data } = this.props
        const { edges: posts } = data.allMarkdownRemark

        const meta = {
            name: data.site.siteMetadata.title,
            description: data.site.siteMetadata.description,
            slug: data.site.siteMetadata.siteUrl,
        };

        return (
            <Layout meta={meta}>
                <div className="article-feed">
                    {posts.map(({node: post}) => {
                        let articleLink = meta.slug + post.fields.slug,
                            facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=' + articleLink,
                            twitterLink = 'https://twitter.com/home?status=So%20%40amys_kapers%20wrote%20this%20really%20cool%20blog%20post,%20you%20should%20check%20it%20out!%20' + articleLink,
                            author;

                        Object.entries(profiles).forEach(([key, value]) => {
                            if(post.frontmatter.tags.indexOf(profiles[`${key}`]['id']) > -1) {
                                author = profiles[`${key}`];
                            }
                        });

                        if(!author) {
                            author = profiles['amykate']
                        }

                        console.log(post.frontmatter.featuredImage);

                        return (
                            <article id={post.id} key={post.id} className="feed-article">
                                <div className="image-feature">
                                    <img src={post.frontmatter.featuredImage} />
                                </div>
                                <div className="author">
                                    <div className="image-profile">
                                        { author.url !== '' ?
                                            <a href={author.url} target="_blank" rel="nofollow" title={"Link to host blog, " + author.title}>
                                                <img alt="Profile Image" src={author.image} />
                                            </a>
                                        :
                                            <img alt="Profile Image" src={author.image} />
                                        }
                                    </div>
                                </div>
                                <header>
                                    <h2 className="article-title">
                                        <Link id={post.id} to={`/${post.fields.slug}`}>
                                            {post.frontmatter.title}
                                        </Link>
                                    </h2>
                                    <h6 className="date">{post.frontmatter.publishDate}</h6>
                                </header>
                                <div className="excerpt">{post.excerpt}</div>
                                <div className="share-icons">
                                    <a href={facebookLink} target="_blank" className="facebook share-link">{<Facebook />}</a>
                                    <a href={twitterLink} target="_blank" className="twitter share-link">{<Twitter />}</a>
                                </div>
                            </article>
                        )
                    })}
                </div>
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
        site {
            siteMetadata {
                title
                description
                siteUrl
            }
        }
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___updateDate] }
        ) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 400)
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        publishDate(formatString: "DD MMM YYYY")
                        tags,
                        featuredImage
                    }
                }
            }
        }
    }
  `
  