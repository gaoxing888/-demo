let http = require('http');
let fs = require('fs');
let url = require('url');

//获取轮播图  /sliders
let sliders = require('./sliders');

//封装一个读取数据的方法
function read(cb) {
  fs.readFile('./book.json', 'utf8', function (err, data) {
    if (err || data.length == 0) {
      cb([]);  //如果有错误或者文件没长度 传一个空数组
    } else {
      cb(JSON.parse(data));//将读出来的内容转化成对象
    }
  })
}

//封装一个写数据的方法
function write(data, cb) {
  fs.writeFile('./book.json', JSON.stringify(data), cb)
}
let pageSize=5;//每页显示5个
http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", ' 3.2.1')
  if (req.method == "OPTIONS") return res.end();
  /*让options请求快速返回*/
  let {pathname, query} = url.parse(req.url, true);  //true把query转化成对象
  if (pathname == '/sliders') {
    res.setHeader('Content-type', "application/json;charset=utf8");
    setTimeout(()=>{
      return res.end(JSON.stringify(sliders));
    },3000)
    return;
  }
  if (pathname == '/hot') {
    read(function (books) {
      let hot = books.reverse().slice(0, 6);
      res.setHeader('Content-type', "application/json;charset=utf8");
      res.end(JSON.stringify(hot))
    });
    return;
  }
  if (pathname == '/book') {   //对书的增删改查  用restful风格来写
    let id = parseInt(query.id);//取出的是字符串
    switch (req.method) {   //?id=1
      case'GET':
        if (!isNaN(id)) {  //查询一个
          read(function (books) {
            let book = books.find(item => item.bookId === id);
            if (!book) book = {};//如果没找到则是undefined
            res.setHeader('Content-type', "application/json;charset=utf8");
            res.end(JSON.stringify(book))
          })
        } else {  //获取所有图书
          read(function (books) {
            res.setHeader('Content-type', "application/json;charset=utf8");
            res.end(JSON.stringify(books.reverse()))
          })
        }
        break;
      case'POST':
        let str='';
        req.on('data',function (chunk) {
          str+=chunk;
        });
        req.on('end',()=>{
          let book=JSON.parse(str);
          read(function (books) {  //添加id
            book.bookId=books.length?books[books.length-1].bookId+1:1;
            books.push(book); //将数据放到books中,将books放到内存中
            write(books,function () {
              res.end(JSON.stringify(book))
            })
          })
        });
        break;
      case'PUT':
        if(id){  //获取了当前要修改的id
          let str='';
          req.on('data',chunk=>{
            str+=chunk;
          });
          req.on('end',()=>{
            let book=JSON.parse(str);//book要改成什么样子
            read(function (books) {
              books= books.map(item=>{
                if(item.bookId==id){   //找到id相同的那一本书
                  return book
                }
                return item  //其他书正常返回即可
              });
              write(books,function () {   //将数据写回json中
                res.end(JSON.stringify(book))
              })
            })
          })
        }
        break;
      case'DELETE':
        read(function (books) {
          books = books.filter(item => item.bookId != id);
          write(books, function () {
            res.end(JSON.stringify({})); //删除返回空对象
          })
        });
        break;
    }
    return;
  }
  if(pathname=='/page'){
    let offset=parseInt(query.offset)|| 0;
    read(function (books) {
      //每次在偏移的基础上增加5条
      let result=books.reverse().slice(offset,offset+pageSize) ;
      let hasMore=true;//默认有更多
      if(books.length<offset+pageSize){ //但是已经显示的数目 大于总共条数
        hasMore=false
      }
          res.end(JSON.stringify({hasMore,books:result}))
    });
    return;
  }
  fs.stat('.'+pathname,function (err,stats) {
    if(err){
      res.statusCode=404;
      res.end('not found')
    }else {
      if(stats.isDirectory()){
        let p=require('path').join('.'+pathname+'./index.html')
        fs.createReadStream(p).pipe(res)
      }else {
        fs.createReadStream('.'+pathname).pipe(res)
      }
    }
  })
}).listen(3000, () => {
  console.log('监听成功');
});
