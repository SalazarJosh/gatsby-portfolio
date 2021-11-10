import React from 'react'
import {Link} from 'gatsby'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import {faCoffee} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {faReact} from '@fortawesome/free-brands-svg-icons'

import logo from '../img/logo.svg'

import SocialIcons from './SocialIcons'

const Footer = class extends React.Component {
  componentDidMount() {
    this.handleLoad();
    window.addEventListener('resize', this.handleLoad);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleLoad);
  }

  handleLoad() {
    var footerSpacingDiv = document.getElementById("footer-spacing");

    var footer = document.getElementById("footer");

    var footerHeight;

    if (footer && footer != undefined) {
      footerHeight = footer.offsetHeight;
    }
    if (footerSpacingDiv && footerSpacingDiv != undefined) {
      console.log(footerHeight);
      footerHeight += 12
      footerSpacingDiv.style.paddingBottom = footerHeight + "px";
    }

  }

  render() {
    return (<footer className="footer" id="footer">
      <div className="content">
        <div className="container">
          <div style={{
              maxWidth: '100vw'
          }} className="columns">
            <div className="column is-4">
              <p className="has-text-centered-mobile">
                Made with&nbsp;
                <FontAwesomeIcon icon={faCoffee}/>, &nbsp;
                <FontAwesomeIcon icon={faReact}/>, and XXX &nbsp;
                <FontAwesomeIcon icon={faGithub}/>&nbsp; commits
              </p>
            </div>
            <div className="column is-4 has-text-centered">
              <a href="mailto:joshuaasalazar@gmail.com">JoshuaASalazar@gmail.com</a>
            </div>
            <div className="column is-4 has-text-right has-text-centered-mobile footer-social-icons">
              <SocialIcons></SocialIcons>
            </div>
          </div>
        </div>
      </div>
    </footer>)
  }
}

export default Footer
