# php-composor<br>
在线的php测试环境<br>
服务器：ubuntu<br>
前端：html+javascript+css+node js（安装mongodb和mysql模块，mysql模块暂时没用到，前端数据库用的是node js和mongodb）<br>
后端：php(安装curl模块 sudo apt-get install即可）<br>文件的用途：<br>index.html：项目主页，一个简单的在线php编译器 <br>contact.html：用户提意见的界面<br> suggestions.html:一个管理员查看建议的页面，需要密码456jj123<br>
Server.js:前端服务器的主要功能 包括路由 接受，发送post get请求等<br>
mongodb.js:包括mongodb数据库连接插入和查找功能的实现<br>
mysql.js:包括mysql数据库的查找功能<br>
Main.js:主文件<br>
后端：composor.php:php编译执行的接口<br>
index.php:接受post请求并处理<br>
robot.php:图灵机器人的接口(前端暂未实现)<br>
