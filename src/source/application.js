/* koa为了能够简化api。通过将请求对象req和响应对象res封装
 * 并且挂载到context上，并且在context上设置getter和setter
 * 
 * 只提供封装好http上下文、请求、响应，以及基于async/await的中间件容器。
 */

const http = require('http')
const context = require('./context.js');
const request = require('./request.js')
const response = require('./response.js');
const compose2 = require("./middleware.js").compose2;

class Koa {
    // 初始化中间件数组
    constructor () {
        this.middlewares = [];
    }

    listen(...args) {
        const server = http.createServer(async (req, res) => {
            // 构建上下文
            const ctx = this.createContext(req, res)

            // 中间件合成
            const fn = compose2(this.middlewares)
            await fn(ctx)

            res.end(ctx.body)
        })
        server.listen(...args)
    }
    use(middleware){
        this.middlewares.push(middleware);
    }
    // 构建上下文
    createContext(req, res) {
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)
    
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res

        return ctx
    }
}

module.exports = Koa