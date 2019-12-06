import React, { Fragment, useState } from 'react'
import Helmet from 'react-helmet'

import Header from './header'
import Footer from './footer'

import '../scss/content.scss'
import '../scss/global.scss'
import '../scss/modes.scss'

import HeaderImage from '../img/rottnest-lighthouse-2500.jpg'
import Favicon from '../img/favicon.jpg'

const Layout = ({ children, meta }) => (
	<Fragment>
		<Meta {...meta} />
		<header className="main">
			{<ColourModes />}
			{<Header />}
		</header>
		<main className="main">{children}</main>
		<footer className="main">{<Footer />}</footer>
	</Fragment>
)

const ColourModes = () => {
	const [mode, setMode] = useState(window.localStorage.getItem('mode')),
		toggleModes = currentMode => {
			setMode(currentMode)
			document.querySelector('body').className = ''
			document.querySelector('body').classList.add(currentMode)
			window.localStorage.setItem('mode', currentMode)
		}

	return (
		<ul className="modes">
			<Helmet
				bodyAttributes={{
					class: mode,
				}}
			/>
			<li>
				<button className="light" onClick={() => toggleModes('light')}>
					🌞<span>Light Mode</span>
				</button>
			</li>
			<li>
				<button className="dark" onClick={() => toggleModes('dark')}>
					🌛<span>Dark Mode</span>
				</button>
			</li>
			<li>
				<button className="wizard" onClick={() => toggleModes('wizard')}>
					🧙‍♂️<span>Harry Potter Mode</span>
				</button>
			</li>
		</ul>
	)
}

const Meta = ({ name, description, slug, image }) => {
	const siteUrl = 'https://amygoestoperth.com.au'

	if (!image) {
		image = HeaderImage
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
	)
}

export default Layout
