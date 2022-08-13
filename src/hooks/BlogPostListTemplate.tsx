// import React, { FunctionComponent } from 'react'
// import { graphql } from 'gatsby'
// import Layout from 'components/templates/Layout'
// import { CategoryListProps } from 'components/molecules/CategoryList'
// import { PostListProps } from 'components/organisms/PostList'
// import { PaginationProps } from 'components/organisms/Pagination'
// import BlogPostList from 'components/templates/BlogPostList'

// interface BlogPostListTemplateProps {
//   data: {
//     edges: PostListProps
//     imageSharp: {
//       fixed: {
//         src: string
//       }
//     }
//   }
//   pageContext: CategoryListProps &
//     PaginationProps & {
//       category: string
//       selectedCategory: boolean
//     }
//   location: {
//     href: string
//   }
// }

// const BlogPostListTemplate: FunctionComponent<BlogPostListTemplateProps> =
//   function ({ data, pageContext, location: { href } }) {
//     const blogPostListMetaData = {
//       title: 'Dev Log List',
//       description: '지금까지 활동하면서 작성한 Dev Log 목록',
//       image: data.imageSharp.fixed.src,
//       url: href,
//     }

//     return (
//       <Layout {...blogPostListMetaData}>
//         <BlogPostList list={data.edges} context={pageContext} />
//       </Layout>
//     )
//   }

// export default BlogPostListTemplate

// export const blogCategoryQuery = graphql`
//   fragment MarkdownData on MarkdownRemark {
//     frontmatter {
//       title
//       summary
//       data
//       categories
//       thumbnail {
//         childImageSharp {
//           fluid(maxWidth: 180, maxHeight: 130, fit: INSIDE, quality: 100) {
//             ...GatsbyImageSharpFluid_withWebp
//           }
//         }
//       }
//     }
//     fields {
//       slug
//     }
//   }

//   query blogListQuery($skip: Int!) {
//     allMarkdownRemark(
//       sort: { order: DESC, fields: [frontmatter__data, frontmatter__title] }
//       skip: $skip
//       limit: 10
//     ) {
//       edges {
//         node {
//           ...MarkdownData
//         }
//       }
//     }
//     imageSharp(fixed: { originalName: { eq: "main_image.jpeg" } }) {
//       fixed {
//         src
//       }
//     }
//   }
// `
