module.exports = {
    siteMetadata: {
        title: 'Amy Goes to Perth',
        description: 'Freelance web developer who lives in Perth with her border collie. Just a few musings and ramblings...',
        siteUrl: 'https://amygoestoperth.com.au'
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
              path: `${__dirname}/src/img`,
              name: 'images',
            },
        },
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/pages/blog`,
                name: "markdown-pages",
            },
        },
        `gatsby-plugin-twitter`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
              plugins: [
              ]
            }
        },
        'gatsby-plugin-netlify-cms'
    ],
}