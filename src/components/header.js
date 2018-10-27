import React from 'react';

//Resources
import '../scss/partials/header.scss';

import HeaderImage from '../img/rottnest-lighthouse-2500.jpg';

const Header = () => (
    <header className="main">
        <div id="site-header" className="site-header">
            <a href="/">
                <img alt="Rottnest Island Lighthouse and the beach" src={HeaderImage} className="header-image" />
                <h1 className="site-title">Amy Goes to Perth</h1>
            </a>
        </div>
    </header>
)


export default Header