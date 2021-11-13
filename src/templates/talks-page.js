import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="talks-page">
      <div className="container">
        <div className="spacer-md"></div>
        <h1 className="page-header">
          Talks.
        </h1>
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <div className="section">
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
        <div className="columns talks-logo-container">
          <div className="column is-2 talks-logo-container">
            <PreviewCompatibleImage
              imageInfo={{
                  image: '/img/UCDA-Logo-PNG3.png',
                  alt: `UCDA Logo`,
                  className: 'talks-logo'
              }}
            />

          </div>
          <div className="column is-2 talks-logo-container">
            <PreviewCompatibleImage
              imageInfo={{
                  image: '/img/logo-dark.png',
                  alt: `UCDA Logo`,
                  className: 'talks-logo'
              }}
            />
          </div>
          <div className="column is-2 talks-logo-container">
            <PreviewCompatibleImage
              imageInfo={{
                  image: '/img/an-event-apart-logo.png',
                  alt: `UCDA Logo`,
                  className: 'talks-logo'
              }}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <div className="section">
              <p>My most avid trait is navigating the nuances of midwestern goodbyes. I also love chatting about all things web. Please say hi and let's have a chat about typography, a big project you’re working on, or a cool new JavaScript library you’re playing with.</p>

              <p className="text-highlight">I’m always interested in speaking opportunities so please feel free to reach out.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`