import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'
import {faLinkedin} from '@fortawesome/free-brands-svg-icons'
import {faCodepen} from '@fortawesome/free-brands-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'

const SocialIcons = class extends React.Component {
  render() {
    return (
      <>
        <a className="navbar-item" href="https://twitter.com/josalaza" target="_blank" rel="noopener noreferrer">
          <span className="icon">
            <FontAwesomeIcon icon={faTwitter}/>
          </span>
        </a>
        <a className="navbar-item" href="https://www.linkedin.com/in/joshuasalazar1/" target="_blank" rel="noopener noreferrer">
          <span className="icon">
            <FontAwesomeIcon icon={faLinkedin}/>
          </span>
        </a>
        <a className="navbar-item" href="https://codepen.io/joshsalazar" target="_blank" rel="noopener noreferrer">
          <span className="icon">
            <FontAwesomeIcon icon={faCodepen}/>
          </span>
        </a>
        <a className="navbar-item" href="https://github.com/SalazarJosh" target="_blank" rel="noopener noreferrer">
          <span className="icon">
            <FontAwesomeIcon icon={faGithub}/>
          </span>
        </a>
      </>
    )
  }
}

export default SocialIcons
