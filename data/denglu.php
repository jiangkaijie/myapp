<?php
     include("./log.php");
     $name = $_REQUEST['use'];
     $pwd = $_REQUEST['pwd'];
     $sql = "select * from use_data where name = '$name' and pwd = '$pwd'";

        $res = $mysqli -> query($sql);
     if ($res -> num_rows){
     		echo '{"msg":true,"name":"'.$name.'"}';
     	}else {
     		echo '{"msg":false,"name":"'.$name.'"}';
     	}
?>