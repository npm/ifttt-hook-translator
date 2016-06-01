var http = require('http')
var url = require('url')
var request = require('request')

var server = http.createServer(function(req,res){
  console.log(JSON.stringify({date:new Date(),method:req.method,url:req.url}))

  if(req.url.indexOf('/hooks') !== 0 || req.method != 'POST') {
    respond(req,res)
    return
  } 

  var buf = []
  req.on('data',function(b){
    buf.push(b)
  }).on('end',function(){
    var body = json(Buffer.concat(buf))

    if(!body) {
      return reject(req,res,400,'json plz')
    }

    handle(req,res,body)
  })

})

server.listen(process.env.port||80,function(err){
  if(err) throw err
  console.log('listening on '+this.address().port)
})


function handle(req,res,body){

  var parsed = url.parse(req.url,true)
  var data = parsed.query


  var makeurl = 'https://maker.ifttt.com/trigger/'+data.event+'/with/key/'+data.makerKey

  console.log('triggering> ',makeurl)

  var event = (body.event||'unknown').split(':').pop()

  request.post(makeurl,{body:JSON.stringify({value1:body.name,value2:event,value3:JSON.stringify(body.change)}),headers:{'content-type':'application/json'}},function(err,res,body){
    console.log(err)
    console.log(res.statusCode)
    console.log(body)
  })

  respond(req,res,200,[body,data])
}


function respond(req,res,code,message){
  req.on('error',noop).on('data',noop)
  res.statusCode = code||404
  res.on('error',noop).end(JSON.stringify(message||'nope'))
}

function noop(){}

function json(b){
  try{
    return JSON.parse(b)
  } catch(e){
    
  }
}
