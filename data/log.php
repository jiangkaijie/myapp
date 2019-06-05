<?php
    header("content-type:text/html;charset=utf-8");
    $mysql_conf = array(
    		"host" => "localhost:3306",
    		"db_use" => "root",
    		"db_pwd" => "",
    		"db" => "data"
    	);

    	$mysqli = @new mysqli($mysql_conf['host'], $mysql_conf['db_use'], $mysql_conf['db_pwd']);
    	//var_dump($mysqli);

    	if($mysqli->connect_errno){
            // die 终止代码执行
            die('连接错误'.$mysqli->connect_errno);
        };
    	//设置编码
    	$mysqli -> query("set names 'utf8';");

    	//打开数据库表
    	$select_db = $mysqli -> select_db($mysql_conf["db"]);
    	//var_dump($select_db);
    	//SELECT * FROM  `use_data`
    	if(!$select_db){
            // 检查数据库是否选择成功
            die('选择数据库错误'.$mysqli->error);
        }
?>