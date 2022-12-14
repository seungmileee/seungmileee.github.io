import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { PostFrontmatterType } from 'types/PostItem.types'
import Template from 'components/Common/Template'
import PostHead from 'components/Post/PostHead'
import PostContent from 'components/Post/PostContent'
import CommentWidget from 'components/Post/CommentWidget'
import Outline from 'components/Post/Outline'
import styled from '@emotion/styled'

export type PostPageItemType = {
  node: {
    html: string
    frontmatter: PostFrontmatterType
    tableOfContents: string
  }
}

type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: PostPageItemType[]
    }
  }
  location: {
    href: string
  }
}

const PostContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
  location: { href },
}) {
  const {
    node: {
      html,
      frontmatter: {
        title,
        summary,
        date,
        categories,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
          publicURL,
        },
      },
      tableOfContents,
    },
  } = edges[0]

  return (
    <Template title={title} description={summary} url={href} image={publicURL}>
      <div className="blog-template-container">
        <PostHead
          title={title}
          date={date}
          categories={categories}
          thumbnail={gatsbyImageData}
        />
        <PostContentWrapper>
          <PostContent html={html} />
          <Outline content={tableOfContents} />
        </PostContentWrapper>
        <CommentWidget />
      </div>
    </Template>
  )
}

export default PostTemplate

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
              publicURL
            }
          }
          tableOfContents
        }
      }
    }
  }
`

// query queryMarkdownDataBySlug($slug: String) {
//   allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
//     edges {
//       node {
//         html
//         frontmatter {
//           title
//           summary
//           date(formatString: "YYYY.MM.DD.")
//           categories
//           thumbnail {
//             childImageSharp {
//               gatsbyImageData
//             }
//             publicURL
//           }
//         }
//       }
//     }
//   }
// }
