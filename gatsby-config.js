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
              path: `${__dirname}/src`,
              name: 'images',
            },
        },
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/blog/posts`,
                name: "markdown-pages",
            },
        },
        `gatsby-plugin-twitter`,
        {
            resolve: `gatsby-plugin-google-tagmanager`,
            options: {
              id: "GTM-MDKC4WR",
              includeInDevelopment: true,
            },
        },
        {
            resolve: `gatsby-remark-images`,
            options: {
                showCaptions: true,
                maxWidth: 1000,
                widthWebp: true,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
              plugins: [
                {
                  resolve: `gatsby-remark-oembed`,
                },
                {
                    resolve: 'gatsby-remark-copy-linked-files',
                    options: {
                      destinationDir: 'blog',
                    }
                }
              ]
            }
        },
        'gatsby-plugin-netlify-cms'
    ],
}