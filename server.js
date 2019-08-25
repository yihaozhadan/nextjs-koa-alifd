const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  router.get('/dashboard/monitor', async ctx => {
    await app.render(ctx.req, ctx.res, '/dashboard/monitor', ctx.query)
    ctx.respond = false
  })

  router.get('/profile/:page', async ctx => {
    switch(page) {
      case 'general':
          await app.render(ctx.req, ctx.res, '/profile/general', ctx.query)
          break
      case 'basic':
          await app.render(ctx.req, ctx.res, '/profile/basic', ctx.query)
    }
    ctx.respond = false
  })

  router.get('/chart/:page', async ctx => {
    switch(page) {
      case 'general':
          await app.render(ctx.req, ctx.res, '/chart/general', ctx.query)
          break
      case 'basic':
          await app.render(ctx.req, ctx.res, '/chart/basic', ctx.query)
    }
    ctx.respond = false
  })

  router.get('/table/:page', async ctx => {
    switch(page) {
      case 'general':
          await app.render(ctx.req, ctx.res, '/table/general', ctx.query)
          break
      case 'basic':
          await app.render(ctx.req, ctx.res, '/table/basic', ctx.query)
    }
    ctx.respond = false
  })

  router.get('/list/:page', async ctx => {
    switch(page) {
      case 'general':
          await app.render(ctx.req, ctx.res, '/list/general', ctx.query)
          break
      case 'basic':
          await app.render(ctx.req, ctx.res, '/list/basic', ctx.query)
    }
    ctx.respond = false
  })

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})