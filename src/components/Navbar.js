import React from 'react'
import {Link} from 'gatsby'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'
import {faLinkedin} from '@fortawesome/free-brands-svg-icons'
import {faCodepen} from '@fortawesome/free-brands-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'

import SocialIcons from './SocialIcons'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: ''
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState({
      active: !this.state.active
    },
    // after state has been updated,
    () => {
      // set the class in state for the navbar accordingly
      this.state.active
        ? this.setState({navBarActiveClass: 'is-active'})
        : this.setState({navBarActiveClass: ''})
    })
  }

  render() {
    return (<nav className="navbar is-transparent" role="navigation" aria-label="main-navigation">
      <div className="container">
        <div className="navbar-brand">

          {/* Hamburger menu */}
          <div className={`navbar-burger burger ${this.state.navBarActiveClass}`} data-target="navMenu" role="menuitem" tabIndex={0} onKeyPress={() => this.toggleHamburger()} onClick={() => this.toggleHamburger()}>
            <span/>
            <span/>
            <span/>
          </div>
        </div>
        <div id="navMenu" className={`navbar-menu ${this.state.navBarActiveClass}`}>
          <div className="navbar-start has-text-centered">
            <Link className="navbar-item" to="/">
              Home
            </Link>
            <Link className="navbar-item" to="/blog">
              Blog
            </Link>
            <Link className="navbar-item" to="/about">
              Talks
            </Link>
          </div>
          <div className="navbar-end has-text-centered">
            <SocialIcons></SocialIcons>
          </div>
        </div>
      </div>
    </nav>)
  }
}

export default Navbar
