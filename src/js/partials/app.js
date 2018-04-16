import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';


//Resources
import '../../scss/content.scss';

//Components
import {Feed} from '../layouts/feed.js';
import {Article} from '../layouts/article.js';

export class App extends Component {
  render() {
    window.onscroll = function() {
      if(document.documentElement.scrollTop > 50) {
          document.getElementById('root').classList.add('scrolled');
      }
      else {
          document.getElementById('root').classList.remove('scrolled');
      };
  };

    return (        
        <Fragment>
          <Route path="/" exact component={Feed} />
          <Route path="/:id" component={Article} />
        </Fragment>
    );
  }
};