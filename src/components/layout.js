import React, { Fragment } from "react"

import Header from './header'
import Footer from './footer'

const Layout = ({children}) => (
    <Fragment>
        <header>{<Header />}</header>
        <main>{children}</main>
        <footer>{<Footer />}</footer>
    </Fragment>
)

export default Layout