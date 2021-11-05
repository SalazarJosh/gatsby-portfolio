import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    
    return (
      <div className="columns">
        {posts &&
          posts.map(({ node: post }) => (
            <div className="column gs_reveal" key={post.id}>
              <div className="port-item">
                <div className="blogThumnailWrapper">
                  <Link
                    className="title has-text-primary is-size-4"
                    to={post.fields.slug}
                  >
                    <PreviewCompatibleImage
                      imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                      }}
                    />
                  </Link>
                </div>

                <div className="spacer-sm"></div>

                <div className="tagText">
                  {post.frontmatter.tags.map((tag, index, array) => {
                    if (array.length - 1 === index) {
                      return(
                        <span key={tag + `tag`}>
                          {tag}
                        </span>
                      )
                    } else {
                      return(
                        <span key={tag + `tag`}>
                          {tag}, &nbsp;
                        </span>
                      )
                    }
                  })}
                </div>


                <Link
                  className="blogTitle"
                  to={post.fields.slug}
                >
                  {post.frontmatter.title}
                </Link>
              </div>

              <div className="spacer-sm"></div>
            </div>

            /*<div className="is-parent column">
              <article
            className={`blog-list-item tile is-child box notification ${
            post.frontmatter.featuredpost ? 'is-featured' : ''
            }`}
              >
            <header>
            {post.frontmatter.featuredimage ? (
            <div className="featured-thumbnail">
            <PreviewCompatibleImage
            imageInfo={{
            image: post.frontmatter.featuredimage,
            alt: `featured image thumbnail for post ${post.frontmatter.title}`,
            }}
            />
            </div>
            ) : null}
            <p className="post-meta">
            <Link
            className="title has-text-primary is-size-4"
            to={post.fields.slug}
            >
            {post.frontmatter.title}
            </Link>
            <span> &bull; </span>
            <span className="subtitle is-size-5 is-block">
            {post.frontmatter.date}
            </span>
            </p>
            </header>
            <p>
            {post.excerpt}
            <br />
            <br />
            <Link className="button" to={post.fields.slug}>
            Keep Reading →
            </Link>
            </p>
              </article>
            </div>*/
          ))}
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          limit: 3
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                tags
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 500, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
