import React from 'react';
import { Footer as FooterMenu, SocialNav, SocialLink, ShareLink } from './footer.styles';
import { Codepen, GitHub, Facebook, Twitter, Instagram, Globe } from 'react-feather';

const menuItems = [
    {
        'name': 'codepen',
        'icon': <Codepen />,
        'url': 'https://codepen.io/aimhigherwebdesign-amy/',
    },
    {
        'name': 'github',
        'icon': <GitHub />,
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

const Footer = () => {
    const renderNavItems = () => {
        return (
            <>
                {menuItems.map(navItem => {
                    const LinkComponent = navItem === 'share' ? ShareLink : SocialLink;

                    return (
                        <LinkComponent
                            href={navItem.url}
                            key={navItem.name}
                            target="_blank"
                            rel="noopener noreferrer">
                            {navItem.icon}
                        </LinkComponent>
                    );
                })}
            </>
        );
    };

    return (
        <FooterMenu>
            <SocialNav>
                {renderNavItems()}
            </SocialNav>
        </FooterMenu>
    )
}

export default Footer