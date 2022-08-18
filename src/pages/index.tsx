import React, { FunctionComponent, useMemo } from 'react'
import CategoryList, { CategoryListProps } from 'components/Main/CategoryList'
import Introduction from 'components/Main/Introduction'
import PostList, { PostType } from 'components/Main/PostList'
import { graphql } from 'gatsby'
import { PostListItemType } from 'types/PostItem.types'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import queryString, { ParsedQuery } from 'query-string'
import Template from 'components/Common/Template'
import styled from '@emotion/styled'

type IndexPageProps = {
  location: {
    search: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
      publicURL: string
    }
  }
}

const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
`

const CategoryListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

const TagDiv = styled.span`
  font-weight: bold;
  font-size: 25px;
  position: relative;
  bottom: -5vh;
  border-bottom: 2px solid silver;
  padding: 10px 60px;
`

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges },
    file: {
      childImageSharp: { gatsbyImageData },
      publicURL,
    },
  },
}) {
  const parsed: ParsedQuery<string> = queryString.parse(search)
  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'All'
      : parsed.category

  const categoryList = useMemo(
    () =>
      edges.reduce(
        (
          list: CategoryListProps['categoryList'],
          {
            node: {
              frontmatter: { categories },
            },
          }: PostType,
        ) => {
          categories.forEach(category => {
            if (list[category] === undefined) list[category] = 1
            else list[category]++
          })

          list['All']++

          return list
        },
        { All: 0 },
      ),
    [],
  )

  return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}
    >
      <Introduction profileImage={gatsbyImageData} />
      <MainWrapper>
        <PostList selectedCategory={selectedCategory} posts={edges} />
        <CategoryListWrapper>
          <TagDiv>Tags</TagDiv>
          <CategoryList
            selectedCategory={selectedCategory}
            categoryList={categoryList}
          />
        </CategoryListWrapper>
      </MainWrapper>
    </Template>
  )
}

export default IndexPage

export const getPostList = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
      publicURL
    }
  }
`
// thumbnail {
//   childImageSharp {
//     gatsbyImageData(width: 768, height: 400)
//   }
// }
