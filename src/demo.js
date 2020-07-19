const Koa = require('./source/koa.js')
const Router = require('./source/router.js')
const app = new Koa()
const router = new Router()

// router
router.get('/index', async ctx => {
    ctx.body = 'index page'
})
router.get('/post', async ctx => {
    ctx.body = 'post page'
})
router.get('/list', async ctx => {
    ctx.body = 'list page'
})
router.post('/index', async ctx => {
    ctx.body = 'index post page'
})

app.use(router.routes())

// middleware
app.use(async (ctx, next) => {
    ctx.body = 'ccc2l:'
    await next()
})

app.use(async (ctx, next) => {
    ctx.body += '1'
    await next()
    ctx.body += '5'
})

app.use(async (ctx, next) => {
    ctx.body += '2'
    await next()
    ctx.body += '4'
})

app.use(async (ctx, next) => {
    ctx.body += '3'
})

app.listen(3001, () => {
    console.log('listen at 3001~')
})

