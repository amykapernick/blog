import React from 'react';

import '../scss/partials/footer.scss';

//Resources
import {Codepen, Github, Facebook, Twitter, Instagram, Globe} from 'react-feather';


const menuItems = [
    {
        'name': 'codepen',
        'icon': <Codepen />,
        'url': 'https://codepen.io/aimhigherwebdesign-amy/',
    },
    {
        'name': 'github',
        'icon': <Github />,
        'url': 'https://github.com/amykapernick/amygoestoperth',
    },
    {
        'name': 'facebook',
        'icon': <Facebook />,
        'url': 'https://www.facebook.com/aimhigherwebdesign',
    },
    {
        'name': 'twitter',
        'icon': <Twitter />,
        'url': 'https://twitter.com/amys_kapers',
    },
    {
        'name': 'instagram',
        'icon': <Instagram />,
        'url': 'https://www.instagram.com/amys_kapers/',
    },
    {
        'name': 'website',
        'icon': <Globe />,
        'url': 'https://aimhigherwebdesign.com.au',
    },
];

const Footer = () => (
    <FooterMenu />
)

const FooterMenu = () => {
    let navItems = menuItems.map((navItem) => {
        return(
            <a href={navItem.url} key={navItem.name} target="_blank" className={'social-link ' + navItem.name}>
                {navItem.icon}
            </a>
        );
    });

    return (
        <nav className="social">
            {navItems}
        </nav>
    )
}

export default Footer