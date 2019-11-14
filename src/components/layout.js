import React, { Fragment } from "react";
import Helmet from "react-helmet";

import Header from "./header";
import Footer from "./footer";

import "../scss/content.scss";
import "../scss/global.scss";

import HeaderImage from "../img/rottnest-lighthouse-2500.jpg";
import Favicon from "../img/favicon.jpg";

const Layout = ({ children, meta }) => (
  <Fragment>
    <Meta {...meta} />
    <header className="main">{<Header />}</header>
    <main className="main">{children}</main>
    <footer className="main">{<Footer />}</footer>
  </Fragment>
);

const Meta = ({ name, description, slug, image }) => {
  let siteUrl = "https://amygoestoperth.com.au";

  if (!image) {
    image = HeaderImage;
  }

  return (
    <Helmet>
      <title>{name}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={siteUrl + slug} />
      <link rel="shortcut icon" href={Favicon} />
      <link rel="icon" sizes="192x192" href={Favicon} />
      <link rel="apple-touch-icon" href={Favicon} />
      <meta name="theme-color" content="#1C75BC" />
      <link rel="mask-icon" href={Favicon} color="#1C75BC" />
      <base href="/" />

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

export default Layout;
