const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const output = getConfig().output || {}

  actions.setWebpackConfig({
    output,
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        utils: path.resolve(__dirname, 'src/utils'),
        hooks: path.resolve(__dirname, 'src/hooks'),
      },
    },
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })

    createNodeField({ node, name: 'slug', value: slug })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  // Get All Markdown File For Paging
  const queryAllMarkdownData = await graphql(
    `
      {
        allMarkdownRemark(
          sort: {
            order: DESC
            fields: [frontmatter___date, frontmatter___title]
          }
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `,
  )

  // Handling GraphQL Query Error
  if (queryAllMarkdownData.errors) {
    reporter.panicOnBuild(`Error while running query`)
    return
  }

  // Import Post Template Component
  const PostTemplateComponent = path.resolve(
    __dirname,
    'src/templates/post_template.tsx',
  )

  // Page Generating Function
  const generatePostPage = ({
    node: {
      fields: { slug },
    },
  }) => {
    const pageOptions = {
      path: slug,
      component: PostTemplateComponent,
      context: { slug },
    }

    createPage(pageOptions)
  }

  // Generate Post Page And Passing Slug Props for Query
  queryAllMarkdownData.data.allMarkdownRemark.edges.forEach(generatePostPage)
}

// // Transform Markdown File to Page
// exports.createPages = async ({ actions, graphql, reporter }) => {
//   const { createPage } = actions

//   // Get All Markdown File For Paging
//   const getAllMarkdownQuery = await graphql(
//     `
//       {
//         allMarkdownRemark(
//           sort: {
//             order: DESC
//             fields: [frontmatter___date, frontmatter___title]
//           }
//         ) {
//           edges {
//             node {
//               fields {
//                 slug
//               }
//               frontmatter {
//                 title
//               }
//             }
//           }
//         }
//       }
//     `,
//   )

//   // Handle errors
//   if (getAllMarkdownQuery.errors) {
//     reporter.panicOnBuild(`Error while running query`)
//     return
//   }

//   // Import Template Files for Blog and Portfolio Item Page
//   const BlogPostItemTemplate = Path.resolve(
//     __dirname,
//     'src.page_template/BlogPostItemTemplate.tsx',
//   )
//   const BlogPostListTemplate = path.resolve(
//     __dirname,
//     'src/page_template/BlogPostListTemplate.tsx',
//   )

//   //Create Post List
//   const allPost = getAllMarkdownQuery.data.allMarkdownRemark.edges
//   const totalPage = Math.ceil(allPost.length / 10)

//   for (let index = 1; index <= totalPage; index++) {
//     createPage({
//       path: `/blog/${index}`,
//       component: BlogPostListTemplate,
//       context: {
//         skip: 10 * (index - 1),
//         totalPage,
//         currentPage: index,
//       },
//     })
//   }

//   // Create Pages Through Markdown Files
//   allPost.forEach(
//     (
//       {
//         node: {
//           fields: { slug },
//         },
//       },
//       index,
//     ) => {
//       createPage({
//         path: slug,
//         component: BlogPostItemTemplate,
//         context: {
//           slug,
//           prev:
//             index === 0
//               ? null
//               : {
//                   slug: allPost[index - 1].node.fields.slug,
//                   title: allPost[index - 1].node.frontmatter.title,
//                 },
//           next:
//             index === allPost.length - 1
//               ? null
//               : {
//                   slug: allPost[index + 1].node.fields.slug,
//                   title: allPost[index + 1].node.frontmatter.title,
//                 },
//         },
//       })
//     },
//   )
// }

// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions
//   createPage({
//     path: '/using-dsg',
//     component: require.resolve('./src/templates/using-dsg.js'),
//     context: {},
//     defer: true,
//   })
// }

// const path = require('path')

// // Setup Import Alias
// exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
//   const output = getConfig().output || {}

//   actions.setWebpackConfig({
//     output,
//     resolve: {
//       alias: {
//         components: path.resolve(__dirname, 'src/components'),
//         utils: path.resolve(__dirname, 'src/utils'),
//         hooks: path.resolve(__dirname, 'src/hooks'),
//       },
//     },
//   })
// }
