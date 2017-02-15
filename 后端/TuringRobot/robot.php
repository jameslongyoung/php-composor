<?php
/**
 * Created by PhpStorm.
 * User: 24965
 * Date: 2017/2/8
 * Time: 22:46
 */
    class robot
    {
        private $api_key="1efaa8c448ec457ab3874af80dfd7dae";
        public function json($json_arr)
        {
            return json_encode($json_arr);
        }
        public function decode_json($json)
        {
            return json_decode($json,true);     //return array
        }
        public function string_to_array($data)
        {
            $post_arr=array();
            $post_arr["key"]=$this->api_key;
            $post_arr["info"]=$data;
            $post_arr["userid"]="123456789";
            return $post_arr;
        }
        public function robot_post($json_string)
        {
            $data=$this->string_to_array($json_string);
            $curl=curl_init();
            $url="http://www.tuling123.com/openapi/api";
            $post_data=$this->json($data);
            curl_setopt($curl,CURLOPT_URL,$url);
            curl_setopt($curl,CURLOPT_CONNECTTIMEOUT,1000);
            curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);  //要求结果为字符串且输出到屏幕上
            curl_setopt($curl,CURLOPT_POST,1);
            curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json; charset=utf-8',
            ));
            curl_setopt($curl,CURLOPT_POSTFIELDS,$post_data);
            $result=curl_exec($curl);
            return $result;
        }

    }