<?php

// $_POST = json_decode(file_get_contents('php://input'), true);

if (isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["subject"]) && isset($_POST["message"])) {
    $message = "From: ".$_POST["name"]."\nEmail: ".$_POST["email"]."\nMessage: ".$_POST["message"];
    $headers = "From: <".$_POST["email"].">";
    if (mail("<zhutom01@gmail.com>", $_POST["subject"], $message, $headers)) {
        echo('{"status": "ok"}');
    } else {
        echo('{"status": "error"}');
    }
} else {
    echo('{"status": "error"}');
}

?>