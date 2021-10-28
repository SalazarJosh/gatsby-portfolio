import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <div className="spacer-md"></div>
          <h1 className="page-header">
            Blog.
          </h1>
          <section className="section">
            <div className="container">
              <div className="content">
                <BlogRoll />
              </div>
            </div>
          </section>
        </div>

      </Layout>
    )
  }
}
