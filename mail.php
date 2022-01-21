<?php
	$thm  = "Электрическая турка. CoffeeTime";
	$msg = "Заявка с сайта. Электрическая турка. CoffeeTime<br />";
	if(isset($_POST['name'])) {
		$name = strip_tags($_POST['name']);
		$msg .="Имя: ".$name."<br/>";
	}
	if(isset($_POST['tel'])) {
		$tel = strip_tags($_POST['tel']);
		$msg .="Тел: ".$tel."<br/>";
	}
	if(isset($_POST['count_goods'])) {
		$count_goods = strip_tags($_POST['count_goods']);
		$msg .="Количество: ".$count_goods." шт<br/>";
	}
	$headers[] = 'Content-type: text/html; charset=utf-8';
	$fromMail = "7662580@mail.ru";
	$mailTo = ["7662580@mail.ru"];
	mail($fromMail, $thm, $msg, $fromMail);
	$emailSuccesMessage = "Ваша заявка отправлена";
	echo $emailSuccesMessage;
?>