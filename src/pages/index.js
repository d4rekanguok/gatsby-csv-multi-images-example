import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const images = data.dataCsv.images.map(img => img.childImageSharp.original.src)
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      {images.map(src => (<img alt="cat images" src={src} />))}
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomeImages {
    dataCsv {
      images {
        childImageSharp {
          original {
            src
          }
        }
      }
    }
  }
`