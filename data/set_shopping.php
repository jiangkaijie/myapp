<?php
    include("./log.php");
    $res = file_get_contents('php://input');
    $json = json_decode($res);
    $data = $json -> data;
    $data1 = json_encode($data);
    $use_id = $json -> use_id;
    $id = $json -> id;

   $sql = "UPDATE shopping_cart_data SET data = '$data1' WHERE use_id = '$use_id'";
   $result = $mysqli -> query($sql);
?>