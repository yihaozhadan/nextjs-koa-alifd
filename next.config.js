/* eslint-disable */
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  webpack: (config, { isServer }) => {
    if (isServer) {
      const alifdStyles = /@alifd\/*\/.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(alifdStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: alifdStyles,
        use: 'null-loader',
      })
    }
    return config
  },
})