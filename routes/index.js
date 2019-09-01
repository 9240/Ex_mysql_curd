var express = require('express');
var router = express.Router();
var db = require('../db/index')

var resData = {
  code:0,
  msg:""
}

// 权限控制
router.all('*',(req,res,next)=>{
  if(req.cookies.uuid){
    next()
  }else{
    if(req.url == '/classList' || req.url == '/addClass' || req.url == '/edit' || req.url == '/querySingle' || req.url == '/delClass'){
      res.redirect('/login')
    }
    next()
  }
})

/* 首页 */
router.get('/', (req, res, next)=>{
  res.render('index', { title: '首页',email:req.cookies.email});
});

// 课程列表页
router.get('/classList',(req,res,next)=>{
  res.render('classList',{title:"课程列表",email:req.cookies.email})
})

// 添加课程页
router.get('/addClass',(req,res,next)=>{
  res.render('addClass',{title:"添加新课",email:req.cookies.email})
})

// 登录页
router.get('/login',(req,res,next)=>{
  res.render('login',{title:"登录",email:req.cookies.email})
})

// 关于页
router.get('/about',(req,res,next)=>{
  res.render('about',{title:"关于",email:req.cookies.email})
})

// 编辑页
router.get('/edit',(req,res,next)=>{
  db.connection.query(`select * from class where classid = '${req.query.classid }'`, function (error, results, fields) {
    if (error) throw error;
    res.render('edit',{title:"编辑",email:req.cookies.email,classItem:results})
  });
})

// 注册页
router.get('/register',(req,res,next)=>{
  res.render('register',{title:"注册",email:req.cookies.email})
})

// 查询单个接口
router.get('/querySingle',(req,res,next)=>{
  db.connection.query(`select * from class where id = '${req.cookies.uuid}' and classTitle like '%${req.query.classTitle}%'`, function (error, results, fields) {
    if (error) throw error;
    if(results.length>0){
      resData.code = 200;
      resData.msg = results;
      res.json(resData)
    }else{
      resData.code = 400;
      resData.msg = "无数据";
      res.json(resData)
    }
  });
})


// 添加课程接口
router.post('/addClass',(req,res,next)=>{
  db.connection.query(`insert into class (classid,id,classTitle,detail) values ('${db.uuidv1()}','${req.cookies.uuid}','${req.body.classTitle}','${req.body.detail}')`, function (error, results, fields) {
    if (error) throw error;
    if(results.fieldCount == 0){
      resData.code = 200;
      resData.msg = "添加成功"
      res.json(resData)
    }else{
      resData.code = 400;
      resData.msg = "添加失败"
      res.json(resData)
    }
  });
})

// 编辑课程接口
router.post('/editClass',(req,res,next)=>{
  db.connection.query(`update class set classTitle='${req.body.classTitle}',detail = '${req.body.detail}' where classid='${req.query.classid}'`, function (error, results, fields) {
    if (error) throw error;
    if(results.fieldCount == 0){
      resData.code = 200;
      resData.msg = "编辑成功"
      res.json(resData)
    }else{
      resData.code = 400;
      resData.msg = "编辑失败"
      res.json(resData)
    }
  });
})

// 登录接口
router.post('/login',(req,res,next)=>{
  db.connection.query(`select * from user where email = '${req.body.email}' and passwd = '${req.body.passwd}'`, function (error, results, fields) {
    if (error) throw error;
    if(results[0]&&results[0].id){
      res.cookie('uuid',results[0].id)
      res.cookie('email',req.body.email)
      resData.code = 200;
      resData.msg = "登录成功";
      res.json(resData)
    }else{
      resData.code = 400;
      resData.msg = "你还未注册";
      res.json(resData)
    }
  });
})

// 注册接口
router.post('/register',(req,res,next)=>{
  db.connection.query(`select * from user where email = '${req.body.email}'`, function (error, results, fields) {
    if (error) throw error;
    if(results.length == 0){
      db.connection.query(`insert into user (id,email,passwd) values ('${db.uuidv1()}','${req.body.email}','${req.body.passwd}')`, function (error, results, fields) {
        if (error) throw error;
        if(results.fieldCount == 0){
          resData.code = 200;
          resData.msg = "注册成功"
          res.json(resData)
        }else{
          resData.code = 400;
          resData.msg = "注册失败"
          res.json(resData)
        }
      });
    }else{
      resData.code = 401;
      resData.msg = "该邮箱已被注册"
      res.json(resData)
    }
  });
})

// 删除课程接口
router.get('/delClass',(req,res,next)=>{
  db.connection.query(`delete from class where classid='${req.query.classid}'`, function (error, results, fields) {
    if (error) throw error;
    if(results.fieldCount == 0){
      resData.code = 200;
      resData.msg = "删除成功"
      res.json(resData)
    }else{
      resData.code = 400;
      resData.msg = "删除失败"
      res.json(resData)
    }
  });
})


// mysql测试页
router.get('/mysqltest',(req,res,next)=>{
  db.connection.query(`select * from test1`, function (error, results, fields) {
    if (error) throw error;
    res.render('mysqltest',{title:'test',users:results})
  });
})

//查询单个用户接口
router.get('/query',(req,res,next)=>{
  db.connection.query(`select * from test1 where id ='${req.query.userid}'`, function (error, results, fields) {
    if (error) throw error;
    resData.code = 200;
    resData.msg = results
    res.json(resData)
  });
})

//修改单个用户接口
router.post('/update',(req,res,next)=>{
  db.connection.query(`update test1 set username = '${req.body.username}', age ='${req.body.age}', height ='${req.body.height}', weight ='${req.body.weight}' where id ='${req.body.userid}'`, function (error, results, fields) {
    if (error) throw error;
    resData.code = 200;
    resData.msg = results
    res.json(resData)
  });
})

//新增数据接口
router.post('/adduser',(req,res,next)=>{
  db.connection.query(`insert into test1 (id,username,age,height,weight) values ('${db.uuidv1()}','${req.body.username}',${req.body.age},${req.body.height},${req.body.weight})`, function (error, results, fields) {
    if (error) throw error;
    resData.code = 200;
    resData.msg = results
    res.json(resData)
  });
})

//删除数据接口
router.get('/deluser',(req,res,next)=>{
  db.connection.query(`delete from test1 where id ='${req.query.userid}'`, function (error, results, fields) {
    if (error) throw error;
    resData.code = 200;
    resData.msg = results
    res.json(resData)
  });
})


// 多表查询
router.get('/queryAll',(req,res,next)=>{
  db.connection.query(`select * from user`, function (error, results, fields) {
    if (error) throw error;
    results.forEach((item,index) => {
      db.connection.query(`select * from class where id = '${item.id}'`, function (error, subResults, fields) {
        if (error) throw error;
        item['detail'] = subResults
        if(results.length == index+1){
          resData.code = 200;
          resData.msg = results
          res.json(resData)
        }
      });
    })
  });
})
module.exports = router;
