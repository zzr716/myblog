var router = require('koa-router')();
var userModel = require('../model/mysql.js')
var md5 = require('md5')
// 显示表单
router.get('/signup', async(ctx, next) => {
    await ctx.render('signup', {})
})
// 处理表单
router.post('/signup', async(ctx, next) => {
    console.log(ctx.request.body)
    var user = {
        name: ctx.request.body.name,
        pass: ctx.request.body.password,
        repeatpass: ctx.request.body.repeatpass
    }
    // koa数据查询 await 数据库应用独立 模型对象backend
    // Users表的模型对象，负责向数据库的查找，
    // api 应用层
    // UserModel 是Model层
    // node.js 导步 拟人化
    await userModel.findDataByName(user.name).then(result => {
        console.log(result)
        // ctx.body = {
        //     data: 3
        // }
        if (result.length) {
            // 用户已存在
            ctx.body = {
                data: 1
            }
        } else if (user.pass !== user.repeatpass || user.pass == '') {
            ctx.body = {
                data: 2
            }
        } else {
            // 注册成功
            ctx.body = {
                data: 3
            }
            userModel.insertData([ctx.request.body.name, md5(ctx.request.body.password)])
        }
    })
    // 注册有多种情况 ，先静态的表达 前端调完
    // 接口url，返回的数据格式及意义
    // url为/signup post
    // data 3成功 2表示密码错误 1表示用户名已经存在
    // ctx.body = {
    //     // 3表示注册成功
    //     data: 3
    // }
})
module.exports = router