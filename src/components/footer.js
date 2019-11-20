import React from 'react'

import '../scss/partials/footer.scss'

// Resources
import { Codepen, GitHub, Facebook, Twitter, Instagram, Globe } from 'react-feather'

const menuItems = [
		{
			name: 'codepen',
			icon: <Codepen />,
			url: 'https://codepen.io/aimhigherwebdesign-amy/',
		},
		{
			name: 'github',
			icon: <GitHub />,
			url: 'https://github.com/amykapernick/amygoestoperth',
		},
		{
			name: 'facebook',
			icon: <Facebook />,
			url: 'https://www.facebook.com/aimhigherwebdesign',
		},
		{
			name: 'twitter',
			icon: <Twitter />,
			url: 'https://twitter.com/amys_kapers',
		},
		{
			name: 'instagram',
			icon: <Instagram />,
			url: 'https://www.instagram.com/amys_kapers/',
		},
		{
			name: 'website',
			icon: <Globe />,
			url: 'https://aimhigherwebdesign.com.au',
		},
	],
	Footer = () => <FooterMenu />,
	FooterMenu = () => {
		const navItems = menuItems.map(navItem => {
			return (
				<a href={navItem.url} key={navItem.name} target="_blank" className={'social-link ' + navItem.name}>
					{navItem.icon}
					<span>Link to {navItem.name}</span>
				</a>
			)
		})

		return <nav className="social">{navItems}</nav>
	}

export default Footer
