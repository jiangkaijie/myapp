<?php
    include("./log.php");
     $res = file_get_contents('php://input');//接收所有没有处理过的post数据
   		$json = json_decode($res);
   		$name = $json -> name;
   	    $sum = $json -> sum;
        $use_id = $json -> use_id;
        $data = '{"'.$name.'":"'.$sum.'"}';

    $sql = "select * from shopping_cart_data where use_id = '$use_id'";

        $result = $mysqli -> query($sql);
        if ($result -> num_rows){
            //有，则覆盖
           $arr = array();
           	while($row = $result -> fetch_assoc()){
           		array_push($arr,$row); //将每一条数据放入数组
           	};
           	//格式化数据
           	$json = json_encode($arr[0]);
           	//$json -> $name = $sum;
           	echo $json;
     	}else {
     		//没有，则新建
     		$insertSql = "insert into shopping_cart_data(id, use_id, data)values('$name', '$use_id', '$data')";
     		$result = $mysqli -> query($insertSql);

     	};

//         $insertSql = "insert into shopping_cart_data(name, title, url, data)values('$name', '$title', '$url', '$data')";
//        $result = $mysqli -> query($insertSql);

?>