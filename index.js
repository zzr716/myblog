const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const path = require('path');
const router = require('koa-router');
const views = require('koa-views')
var koaStatic = require('koa-static')
const config = require('./config/default.js')
app.use(koaStatic(path.join(__dirname, './public')))
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))
app.use(bodyParser())
app.use(require('./routers/signup.js').routes())
app.listen(config.port);
console.log(
    `listening on port ${config.port}`
)