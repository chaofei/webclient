<?php
$arr = [
    ['a'=>1,'b'=>2,'c'=>3],
    ['a'=>11,'b'=>22,'c'=>33],
    ['a'=>111,'b'=>222,'c'=>333],
];
$json = json_encode($arr);
$cb = @$_GET['callback'];
if($cb){
    printf('typeof %s === "function" && %s(%s)', $cb, $cb, $json);
} else {
    echo $json;
}

