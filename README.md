# nextjs-koa-alifd
NextJS + KoaJS + Alibaba Fusion Design samples. [NextJS](https://nextjs.org/) is an open source React framework. [KoaJS](https://koajs.com/) is a web framework for Node.js. [Alibaba Fusion Design](https://github.com/alibaba-fusion/next) is a configurable component library for web built on React. This project aims to demo a full stack base on ReactJS and NodeJS. It mostly focuses on Web application client or frontend samples. It also provides some samples regrding Web application client and server communication.

## Basic babel and webpack setup
Install _babel-plugin-import_ and setup plugin in [.babelrc](/.babelrc).
```json
"plugins": [
    [
      "babel-plugin-import",
      {
        "libraryName": "@alifd/next",
        "style": true
      }
    ]
  ]
```

Sass loader is required to load _Alifd_ CSS. Here is Webpack configuration in [next.config.js](/next.config.js)
```javascript
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  webpack: (config, { isServer }) => {
    if (isServer) {
      const alifdStyles = /@alifd\/*\/style.*?/
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
```

## Feature

Browser Compatibility, Responsive, Sever Side Rendering, Dashboard, Charts.