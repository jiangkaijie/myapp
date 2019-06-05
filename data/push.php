<?php
    include("./log.php");
     $res = file_get_contents('php://input');//接收所有没有处理过的post数据
    		$json = json_decode($res);
    		$name = $json -> name;
    		$title = $json -> title;
    		$url = $json -> url;
    		$data = $json -> data;



            $insertSql = "insert into text_data(name, title, url, data)values('$name', '$title', '$url', '$data')";
        $result = $mysqli -> query($insertSql);

?>