import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {Link as BlogLink} from 'react-router-dom'
import Prismic from 'prismic-javascript';
import {Link, RichText, Date} from 'prismic-reactjs';

//Resources
import '../../scss/layouts/feed.scss';
import {Facebook, Twitter} from 'react-feather';
import HeaderImage from '../../img/rottnest-lighthouse-2500.jpg';
import AmyKate from '../../img/amykate.jpg';
import AimHigher from '../../img/aimhigher.png';
import Freelance from '../../img/freelancers.png';

const profiles = {
  'amykate': {
    'title': 'Amy Goes to Perth',
    'id': 'amykate',
    'image': AmyKate,
    'url': ''
  },
  'AimHigher': {
    'title': 'AimHigher Web Design',
    'id': 'aimhigher',
    'image': AimHigher,
    'url': 'https://aimhigherwebdesign.com.au'
  },
  'Freelance': {
    'title': "Freelancer's Guide",
    'id': 'freelance',
    'image': Freelance,
    'url': ''
  },
};

const siteUrl = 'https://amygoestoperth.com.au/';

class Meta extends Component {
  render() {
      let name = 'Amy Goes to Perth';
      let description ="24 year old web developer who lives in Perth and has a border collie. Just a few musings";
      let slug = '/';
      let image = HeaderImage;
      return (
          <Helmet>
              <title>{name}</title>
              <meta name="description" content={description} />
              <link rel="canonical" href={siteUrl + slug} />

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
      );
  }
};

export class Feed extends Component {
  constructor() {
    super();
    this.state = {
      results: null
    };
  };

  componentWillMount() {
    const apiEndpoint = 'https://amygoestoperth.prismic.io/api/v2';
  
    Prismic.api(apiEndpoint).then(api => {
      api.query(Prismic.Predicates.at('document.type', 'blog_post'), 
        {orderings: '[document.first_publication_date desc]'}
      ).then(response => {
        if (response) {
          this.setState({results: response.results})
        }
      });
    });
  }

  render() {
    let posts, items;

    if (this.state.results) {
      posts = this.state.results;
      items = posts.map((item) => (
        <Item details={item} key={item.id} />
      ));
    };
    

    return (        
      <div>
        <Meta />
        <div className="article-feed">
          {items}
        </div>
      </div>
    );
  }
};

const Item = ({details}) => {
  let articleLink = siteUrl + details.uid;
  let facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=' + articleLink;
  let twitterLink = 'https://twitter.com/home?status=So%20%40amys_kapers%20wrote%20this%20really%20cool%20blog%20post,%20you%20should%20check%20it%20out!%20' + articleLink;

  let pubDate;
  if(details.data.custom_publish_date) {
    pubDate = details.data.custom_publish_date;
  }
  else {
    pubDate = details.first_publication_date
  };
  let d = Date(pubDate);
  let date = d.getDate() + ' ' + d.toLocaleString("en", { month: "long"  }) + ' ' + d.getFullYear();

  let featureImage = details.data.featured_image.url;
  let profileImage, excerpt, profileUrl;
  let tags = details.tags;

  if (tags.indexOf(profiles.AimHigher.id) > -1) {
    profileImage = profiles.AimHigher.image;
    profileUrl = profiles.AimHigher.url;
  }
  else if (tags.indexOf(profiles.Freelance.id) > -1) {
    profileImage = profiles.Freelance.image;
    profileUrl = profiles.Freelance.url;
  }
  else {
    profileImage = profiles.amykate.image;
    profileUrl = profiles.amykate.url;
  };

  if(details.data.body.length > 0 && details.data.body[0].primary) {
    let s = details.data.body[0].primary.text[0].text;
    excerpt = s.substring(0, Math.min(s.length, 200)) + '...';
  };

  return (
    <article id={details.uid} key={details.id} className="feed-article">
      {featureImage !== '' &&
        <div className="image-feature">
          <img alt="Article Featured Image" src={featureImage} />
        </div>
      }
      <div className="author">
        <div className="image-profile">
          { profileUrl !== '' ?
            <a href={profileUrl} target="_blank" rel="nofollow">
              <img alt="Profile Image" src={profileImage} />
            </a>
          :
            <img alt="Profile Image" src={profileImage} />
          }
        </div>
      </div>
      <header>
        <h2 className="article-title">
          <BlogLink id={details.uid} to={`/${details.uid}`}>
            {details.data.title[0].text}
          </BlogLink>
        </h2>
        <h6 className="date"><time dateTime={date}>{date}</time></h6>
      </header>
      <div className="excerpt">{excerpt}</div>
      <div className="share-icons">
          <a href={facebookLink} target="_blank" className="facebook share-link">{<Facebook />}</a>
          <a href={twitterLink} target="_blank" className="twitter share-link">{<Twitter />}</a>
      </div>
    </article>
  );
};