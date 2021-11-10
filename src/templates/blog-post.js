import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  date,
  helmet,
  featuredimage
}) => {  
  const PostContent = contentComponent || Content

  return (
    <section className="section blogPage">
      {helmet || ''}
      <div className="spacer-md"></div>
      <div className="container content">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <h1 className="title blog-title is-size-2 has-text-weight-bold has-text-centered">
              {title}
            </h1>
            <div className="has-text-centered">
              <ul className="blog-taglist">
                {tags.map((tag) => (
                  <li key={tag + `tag`}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                  </li>
                ))}
              </ul>
              <span className="blog-date">{date}</span>
            </div>
            <div className="spacer-md"></div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <PreviewCompatibleImage
              imageInfo={{
                image: featuredimage,
                alt: `low poly self portrait`,
              }}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <div className="spacer-sm"></div>
            <p className="blog-description">{description}</p>
            <PostContent content={content} />
          </div>
        </div>
        <div className="columns">
          <div className="column is-8 is-offset-2">
            SHARE ON
          </div>
        </div>
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <div className="spacer-md"></div>
            UP next
            TEST
            <div className="spacer-md"></div>

          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  helmet: PropTypes.object,
  featuredimage: PropTypes.string
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        featuredimage={post.frontmatter.featuredimage}
        date={post.frontmatter.date}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
