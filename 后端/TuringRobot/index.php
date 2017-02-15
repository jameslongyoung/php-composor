
<?php
/**
 * Created by PhpStorm.
 * User: 24965
 * Date: 2017/2/8
 * Time: 19:14
 */
    require "robot.php";
    require "php_composer.php";
    $data=file_get_contents("php://input");

    $json_data=json_decode($data);

    if($json_data->type=="robot")
    {
        $robot=new robot();
        echo $robot->robot_post($json_data->msg);
    }
    else if($json_data->type=="compose")
    {
        $php_composor=new php_composer();
        $feedback=array("code"=>"200","data"=>$php_composor->compose($json_data->msg,$json_data->user_id));
        echo  json_encode($feedback);
    }
    else
    {
        $feedback=array(
            "code"=>"404",
            "data"=>"类型错误"
        );
        echo json_encode($feedback);
    }
