import React from "react"
import Helmet from 'react-helmet'

import Header from './header'
import Footer from './footer'

import '../scss/content.scss'
import '../scss/global.scss'

import HeaderImage from '../img/rottnest-lighthouse-2500.jpg'

const Layout = ({ children, meta }) => (
    <>
        <Meta {...meta} />
        <Header />
        <main className="main">{children}</main>
        <Footer />
    </>
)

const Meta = ({ name, description, slug, image = HeaderImage }) => {
    let siteUrl = 'https://amygoestoperth.com.au';

    return (
        <Helmet>
            <title>{name}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={siteUrl + slug} />

            {/* Facebook */}
            <meta property="og:url" content={siteUrl + slug} />

            <meta property="og:title" content={name} />
            <meta property="og:image" content={image} />
            <meta property="og:description" content={description} />

            {/* Twitter */}
            <meta name="twitter:url" content={siteUrl + slug} />
            <meta name="twitter:title" content={name} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default Layout