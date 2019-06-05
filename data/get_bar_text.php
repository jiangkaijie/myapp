<?php
    include("./log.php");
    $index = $_GET['index'];

    $sql = "select * from text_data where name = '$index'";

    $result = $mysqli -> query($sql);


    $arr = array();
    	while($row = $result -> fetch_assoc()){
    		array_push($arr,$row); //将每一条数据放入数组
    	};
    	//格式化数据
    	$json = json_encode($arr);
    	echo $json;

?>