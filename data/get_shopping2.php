<?php
    include("./log.php");
     $use_id = $_GET['use_id'];
    $sql = "select * from shopping_cart_data where use_id = '$use_id'";
    $result = $mysqli -> query($sql);
     $arr = array();
            	while($row = $result -> fetch_assoc()){
            		array_push($arr,$row); //将每一条数据放入数组
            	};
            	//格式化数据
            	$json = json_encode($arr);
            	echo $json;
?>