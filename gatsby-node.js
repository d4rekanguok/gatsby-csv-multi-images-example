/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const types = schema.buildObjectType({
    name: 'DataCsv',
    interfaces: ['Node'],
    extensions: {
      infer: true,
    },
    fields: {
      images: {
        type: '[File]',
        resolve: (src, args, context, info) => {
          const { fieldName } = info
          const paths = src[fieldName]
          const imagePaths = paths.split(',').map(str => str.trim())

          const absolutePaths = imagePaths.map(imagePath => {
            return path.join(__dirname, 'content', imagePath)
          })

          const fileNodes = context.nodeModel.runQuery({
            type: 'File',
            query: {
              filter: {
                absolutePath: {
                  in: absolutePaths
                }
              }
            }
          })

          return fileNodes
        }
      }
    }
  })

  createTypes(types)
}