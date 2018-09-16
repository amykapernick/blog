import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';


//Import components
import { Header } from './js/partials/header.js';
import { App } from './js/partials/app.js';
import { Footer } from './js/partials/footer.js';

//Resources
import './scss/global.scss';

const customHistory = createBrowserHistory();


class Main extends React.Component {
	render() {
		return (
			<Router history={customHistory}>
				<div>
					<header id="header">{<Header />}</header>
					<div id="main">{<App />}</div>
					<footer id="footer">{<Footer />}</footer>
				</div>
			</Router>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));