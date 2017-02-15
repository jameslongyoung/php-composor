/**
 * Created by 24965 on 2017/2/10.
 */
var mysql=require("mysql");
var connection=mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"root",
    database:"users"
});
function mysql_connect() {
    connection.connect(function (err) {
        if(err)
        {
            console.log(err.toString());
        }
    });
}

exports.mysql_insert=function mysql_insert(data) {
        mysql_connect();
        connection.query("insert into suggestions(suggest,tel,date) values (?,?,?)",data,function (error,result) {
            if(error)
            {
                console.log(error);
            }
        });
        connection.end();
}

