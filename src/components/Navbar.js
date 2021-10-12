import React from 'react'
import {Link} from 'gatsby'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'
import {faLinkedin} from '@fortawesome/free-brands-svg-icons'
import {faCodepen} from '@fortawesome/free-brands-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'

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
          </div>
        </div>
      </div>
    </nav>)
  }
}

export default Navbar
