<?php

define('path',"http://localhost:8089/website-testing/Views/");
require('Config/Request.php');
require('Config/Load.php');
$Request = new Config\Request();
$Load = new Config\Load();
$Load->loading($Request->getController(),$Request->getMethod(),$Request->getParameter());

 ?>
