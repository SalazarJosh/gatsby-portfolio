import React from 'react'
import { Link } from 'gatsby'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import {faCoffee} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {faReact} from '@fortawesome/free-brands-svg-icons'

import logo from '../img/logo.svg'

import SocialIcons from './SocialIcons'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="content">
          <div className="container">
            <div style={{ maxWidth: '100vw' }} className="columns">
              <div className="column is-4">
                <p>
                  Made with <FontAwesomeIcon icon={faHeart}/>, <FontAwesomeIcon icon={faCoffee}/>, and XXX <FontAwesomeIcon icon={faGithub}/> commits
                </p>
                <p>
                  Powered by <FontAwesomeIcon icon={faReact}/>
                </p>
              </div>
              <div className="column is-4 has-text-centered">
                <a href="mailto:joshuaasalazar@gmail.com">JoshuaASalazar@gmail.com</a>
              </div>
              <div className="column is-4 social has-text-right">
                <SocialIcons></SocialIcons>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
