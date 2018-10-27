import { COLOURS } from '../../scss/tokens';
import styled from 'react-emotion';

const FOOTER_HEIGHT = '15vh';

export const Footer = styled.footer`
    background: #fff;
    background: rgba(#fff, 0.5);
    font-size: 15px;
    height: auto;
    min-height: ${FOOTER_HEIGHT};
    padding: 10px;
    position: relative;
    bottom: 0;
    text-align: right;
    width: 100vw;
    z-index: 5;

    @media screen and (min-width: 768px) {
        font-size: 1em;
        padding: 5vh 0;
    }
`;

export const SocialNav = styled.nav`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 20px;

    @media screen and (min-width: 768px) {
        margin: 0 0 0 auto;
        width: 50%;
    }
`;

export const SocialLink = styled.a`
    color: rgba(${COLOURS.BLUE50}, 0.5);

    @media screen and (min-width: 768px) {
        svg {
            height: 5vh;
        }
    }

    svg {
        height: 30px;
        max-height: 40px;
        width: auto;
    }

    &:active, &:hover, &:focus {
        color: ${COLOURS.BLUE50};
    }
`;

export const ShareLink = styled(SocialLink)`
    &:active, &:hover, &:focus {
        color: rgba(${COLOURS.BLUE50}, 0.5);
    }
`;
