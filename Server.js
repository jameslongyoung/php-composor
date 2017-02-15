/**
 * Created by 24965 on 2017/2/9.
 */
var http=require('http');
var fs=require('fs');
var url=require('url');
var querystring=require('querystring');
var mongodb=require("./mongodb.js");
exports.Server_start=function () {
    http.createServer(function (request,response) {
        function response_msg(pathname) {
            fs.readFile(pathname.substr(1),function (error,data) {
                if(error)
                {
                    response.writeHead(404, {'Content-Type': 'text/html'});
                }
                else
                {
                    response.writeHead(200, {
                        "Content-Type": "text/html;charset=utf-8"
                    });
                    response.write(data.toString());
                }
                response.end();
            });
        }
        var pathname=url.parse(request.url).pathname;
        if(pathname=="/")
        {
            fs.exists("index.html",function (exists) {
                if(exists)
                {
                    response_msg("/index.html");
                }
                else
                {
                    fs.exists("index.htm",function (exists) {
                        if(exists)
                        {
                            response_msg("/index.htm");
                        }
                    })
                }
            });
        }
        else if(pathname.indexOf("Server.js")!=-1)
        {
            var post_str="";
            request.on('data',function (chunk) {
                post_str+=chunk;
            });
            request.on('end',function (chunk) {
                response.writeHead(200, {
                    "Content-Type": "text/html;charset=utf-8"
                });
                var result_data=querystring.parse(post_str);
                var suggest_json={
                    suggestions:result_data["suggestions"],
                    Date:new Date().toDateString().substr(4),
                    Contact:""
                };
                if(result_data["tel"]!="")
                {
                    suggest_json.Contact=result_data["tel"];
                }
                mongodb.insert_data(suggest_json);
                var str="<script>"+"alert('提交成功')"+"</script>";
                response.write(str);
                var str2="<script>"+"self.location='contact.html'; "+"</script>";
                response.write(str2);
            })
        }
        else if(pathname.indexOf("post.js")!=-1)
        {
            var post_str=[];
            request.on('data',function (chunk) {
                post_str.push(chunk);
            });
            request.on('end',function (chunk) {
                var post_data=Buffer.concat(post_str);
                var opt = {
                    method: "POST",
                    host: "60.205.212.43",
                    port: 80,
                    path: "/TuringRobot/index.php",
                    headers: {
                        "Content-Type": 'application/json',
                        "charset":"UTF-8"
                    }
                };
                var req=http.request(opt,function (res) {
                    if(res.statusCode==200)
                    {
                        var body=[];
                        res.on('data',function (chunk) {
                            body.push(chunk);
                        });
                        res.on('end',function (chunk) {
                            var whole=Buffer.concat(body);
                            response.write(whole.toString("utf-8"));
                            response.end();
                           console.log(whole.toString("utf-8"));
                        })
                    }
                }).on("error",function (err) {
                    console.log("error:"+err);
                });
                req.write(post_data.toString());
                req.end();
              //  console.log(post_data.toString());

            });
      //      console.log(querystring.parse(post_str));
            response.writeHead(200, {
                "Content-Type": "text;charset=utf-8"
            });
        }
        else if(pathname.indexOf("find.js")!=-1)
        {
            var params = url.parse(request.url,true);
            var search_condition={
                Date:params.query.date.toString()
            };
           mongodb.find_data(search_condition,function (result) {
               response.writeHead(200, {
                   "Content-Type": "text;charset=utf-8"
               });
               response.write('<head><meta charset="utf-8"/></head>');
               response.write("<table border='1px'>");
               response.write("<tr>"+"<td>建议</td><td>联系方式</td></tr>");
               for(var i=0;i<result.length;i++)
               {
                   response.write("<tr>"+"<td>"+result[i].suggestions+"</td>");
                   response.write("<td>"+result[i].Contact+"</td>"+"</tr>");
               }
               response.write("</table>");
               response.end();
               
           });

        }
        else
        {
            response_msg(pathname);
        }
    }).listen(80);
}
