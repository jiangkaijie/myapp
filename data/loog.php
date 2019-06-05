<?php

    include("./log.php");
     $res = file_get_contents('php://input');//接收所有没有处理过的post数据
		
		$json = json_decode($res);
		$name = $json -> use;
		$pwd = $json -> pwd;
		$mail = $json -> yx;

        $insertSql = "insert into use_data(name, pwd, email)values('$name', '$pwd', '$yx')";

        $result = $mysqli -> query($insertSql);

		echo '<script>alert("注册成功,正在跳转登陆页");location.href="logs.html";</script>';

		
		
//		if ($result -> num_rows){
//			echo '{"msg":"不可以使用"}';
//		}else {
//			echo '{"msg":"可以使用"}';
//		}
?>



