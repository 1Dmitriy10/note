<?php
//инпуты из формы
$name = $_POST['name'];
$email = $_POST['email'];
$tel = $_POST['tel'];
$text = $_POST['text'];
$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$text = htmlspecialchars($text);
$tel = htmlspecialchars($tel);
$name = urldecode($name);
$email = urldecode($email);
$tel = urldecode($tel);
$text = urldecode($text);
$name = trim($name);
$email = trim($email);
$tel = trim($tel);
$text = trim($text);

//если отправка успешна 
if (mail("1primo1@mail.ru", "мой сайт",     //от кого
"имя: ".$name.                              //имя
"\n E-mail: ".$email.                       //имейл
"\n телефон: ".$tel.                        //телефон
"\n".$text ,"From: example2@mail.ru \r\n")) //текст сообщения
 {   $message = "Форма успешно отправлена";
} else {
    $message = "ошибка";
}
$response = ["message" => $message];
//возвращаем файл в js
header("Content-type: application/json");
echo json_encode($response);

?>