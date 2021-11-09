import React from 'react'
import {Helmet} from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './styles/all.sass'
import useSiteMetadata from './SiteMetadata'
import {withPrefix} from 'gatsby'

const TemplateWrapper = ({children}) => {
  var brandColorVariableExists = getComputedStyle(document.documentElement).getPropertyValue("--brandColor"); // #999999
  if(!brandColorVariableExists){
    document.documentElement.style.setProperty("--brandColor", "rgba(221,24, 24, 1)")
  }
  
  const {title, description} = useSiteMetadata()
  return (<div className="footer-spacing" id="footer-spacing">
    <Helmet>
      <html lang="en"/>
      <title>{title}</title>
      <meta name="description" content={description}/>

      <link rel="apple-touch-icon" sizes="180x180" href={`${withPrefix('/')}img/apple-touch-icon.png`}/>
      <link rel="icon" type="image/png" href={`${withPrefix('/')}img/favicon-32x32.png`} sizes="32x32"/>
      <link rel="icon" type="image/png" href={`${withPrefix('/')}img/favicon-16x16.png`} sizes="16x16"/>

      <link rel="mask-icon" href={`${withPrefix('/')}img/safari-pinned-tab.svg`} color="#ff4400"/>
      <meta name="theme-color" content="#fff"/>

      <meta property="og:type" content="business.business"/>
      <meta property="og:title" content={title}/>
      <meta property="og:url" content="/"/>
      <meta property="og:image" content={`${withPrefix('/')}img/og-image.jpg`}/>
      <script src="https://threejs.org/build/three.min.js"></script>
      <script src="https://unpkg.com/delaunator@3.0.2/delaunator.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/ScrollTrigger.min.js"></script>
    </Helmet>
    <Navbar/>
    <div className="site-wrapper">{children}</div>
    <Footer/>
  </div>)
}

export default TemplateWrapper
