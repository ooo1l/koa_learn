/* http服务，处理http请求request，处理http响应response
 * 中间件容器，中间件的加载，中间件的执行
 * 
 * AOP 面向切面编程（对描述复杂业务逻辑）
 */

const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    const start = new Date().getTime()
    console.log(`start ${ctx.url}`)
    await next()
    const end = new Date().getTime()
    console.log(`请求耗时${parseInt(end-start)}ms`)
})

app.use(async (ctx, next) => {
    ctx.body = 'hello koa2'
    await next()
})

app.use(async (ctx, next) => {
    if(ctx.url === '/html') {
        ctx.type = 'text/html;charset=utf-8'
        ctx.body = '<b>？？？</b>'
    }
    await next()
})


app.listen(3000)
console.log("[demo] start-quick is starting at port 3000");