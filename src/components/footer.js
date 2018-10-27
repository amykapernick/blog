import React from 'react';

import '../scss/partials/footer.scss';

//Resources
import { Codepen, GitHub, Facebook, Twitter, Instagram, Globe } from 'react-feather';

const menuItems = [
    {
        'name': 'codepen',
        'icon': () => <Codepen />,
        'url': 'https://codepen.io/aimhigherwebdesign-amy/',
    },
    {
        'name': 'github',
        'icon': () => <GitHub />,
        'url': 'https://github.com/amykapernick/amygoestoperth',
    },
    {
        'name': 'facebook',
        'icon': () => <Facebook />,
        'url': 'https://www.facebook.com/aimhigherwebdesign',
    },
    {
        'name': 'twitter',
        'icon': () => <Twitter />,
        'url': 'https://twitter.com/amys_kapers',
    },
    {
        'name': 'instagram',
        'icon': () => <Instagram />,
        'url': 'https://www.instagram.com/amys_kapers/',
    },
    {
        'name': 'website',
        'icon': () => <Globe />,
        'url': 'https://aimhigherwebdesign.com.au',
    },
];

const Footer = () => {
    const renderNavItems = () => (
        <>
            {menuItems.map((navItem) => (
                <a
                    key={navItem.name}
                    href={navItem.url}
                    className={`social-link ${navItem.name}`}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    {navItem.icon()}
                </a>
            ))}
        </>
    );

    return (
        <footer className="main">
            <nav className="social">
                {renderNavItems()}
            </nav>
        </footer>
    )
}

export default Footer