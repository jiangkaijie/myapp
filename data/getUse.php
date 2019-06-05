
    <?php

        include("./log.php");
         $res = file_get_contents('php://input');//接收所有没有处理过的post数据

    		$json = json_decode($res);

    		$use = $json -> use;

    		$sql = "select * from use_data where name = '$use'";

    		$result = $mysqli -> query($sql);


    		if ($result -> num_rows){
    			echo '{"msg":"不可以使用"}';
    		}else {
    			echo '{"msg":"可以使用"}';
    		}
    ?>
