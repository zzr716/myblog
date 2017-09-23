var mysql = require('mysql');
var config = require('../config/default.js')
var pool = mysql.createPool({
    // 运维住机房
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
})
let query = function( sql, values ) {
    
      return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
          if (err) {
            resolve( err )
          } else {
            connection.query(sql, values, ( err, rows) => {
    
              if ( err ) {
                reject( err )
              } else {
                resolve( rows )
              }
              connection.release()
            })
          }
        })
      })
    
    }

let findDataByName = function (name) {
    // 拼装业务sql 查询结果
    let _sql = `
        SELECT * FROM users
            where name="${name}"
            `;
    return query(_sql);
   
}
// 添加注册用户
let insertData = function (value) {
    let _sql = `INSERT into users(name, pass) 
     values(?,?);`
    return query(_sql, value)
}
module.exports = {
    findDataByName,
    insertData
}
