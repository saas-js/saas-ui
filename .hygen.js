const inflection = require('inflection')
const path = require('path')

const packageDir = 'packages'

const camelizePath = (name, lower = true) =>
  inflection.camelize(name, lower).replace(/::/g, '/')
const pluralizeProp = (name) => inflection.pluralize(name)

const camelizeQuery = (name, lower = false) =>
  inflection.camelize(name, lower).replace(/::/g, '/')
const pluralizeQuery = (name) => inflection.pluralize(name)

module.exports = {
  templates: `${__dirname}/templates`,
  helpers: {
    camelizedPathName: (name, lower = true) => camelizePath(name, lower),
    camelizedBaseName: (name, lower = false) =>
      path.parse(camelizePath(name, lower)).base,
    baseName: (name) => path.parse(name).base,
    dirName: (name) => path.parse(name).dir,
    pluralizePageProp: (name) => pluralizeProp(name),
    camelizedQueryHook: (name, plural) => {
      const query = plural ? pluralizeQuery(name) : name
      const camelizedQuery = camelizeQuery(query)

      return `use${camelizedQuery}Query`
    },
    filename: (name) => {
      return inflection.dasherize(name)
    },
    packageDir: (org, name) => {
      if (org === '') org = 'saas-ui'
      return path.join(
        packageDir,
        `${inflection.dasherize(org)}-${inflection.dasherize(name)}`,
      )
    },
  },
}
