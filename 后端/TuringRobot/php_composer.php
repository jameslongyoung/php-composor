<?php
/**
 * Created by PhpStorm.
 * User: 24965
 * Date: 2017/2/11
 * Time: 21:04
 */
    class php_composer
    {
        function compose($data,$user)
        {
           // $data=$_GET["data"];
           // $user=$_SERVER['REMOTE_ADDR'];
            $file_name=$user.".php";
            if(file_exists('php_file/'.$file_name))
            {
                $php_file=fopen("php_file/".$file_name,"w") or die("no access authority");
                fwrite($php_file,$data);
                fclose($php_file);
            }
            else
            {
                $php_file=fopen("php_file/".$file_name,"wb") or die("no access authority");
                fwrite($php_file,$data);
                fclose($php_file);
            }
            $result_file=fopen("result_file/".$user.".txt","w") or die("no access authority");
            $shell ="php php_file/$file_name >>"."result_file/$user.txt 2>&1";
//  echo $shell;
            system($shell);   //编译php文件
            $result=file_get_contents("result_file/".$user.".txt");
	    system("rm php_file/$file_name");
	    system("rm result_file/".$user.".txt");
            return $result;
// echo "hello";
      //      include "index.php";
         //   $content=file_get_contents("php_file/$file_name");
        }
    }
