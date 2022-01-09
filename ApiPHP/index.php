<?php

    include 'database/bd.php';

    header('Access-Control-Allow-Origin: *'); //recibe peticiones de cualquier url

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        if (isset($_GET['idUsuarios'])) {
            $query = "SELECT * FROM usuarios WHERE idUsuarios=".$_GET['idUsuarios'];
            $result = getUser($query);
            echo json_encode($result -> fetch(PDO::FETCH_ASSOC));
        }else{
            $query = "SELECT * FROM usuarios";
            $result = getUser($query);
            echo json_encode($result -> fetchAll());
        }
        header("HTTP/1.1 200 OK");
        exit();
    }

    if ($_POST['METHOD'] == 'POST') {
        unset($_POST['METHOD']);
        $nombreUsuario = $_POST['nombreUsuario'];
        $emailUsuario = $_POST['emailUsuario']; 
        $telfUsuario = $_POST['telfUsuario'];

        $query = "INSERT INTO `dbapi`.`usuarios` (`nombreUsuario`, `emailUsuario`, `telfUsuario`) 
                    VALUES ('$nombreUsuario', '$emailUsuario', '$telfUsuario')";
        $queryAutoIncrement = "SELECT MAX(id) AS idUsuarios FROM usuarios";
        $result = postUser($query, $queryAutoIncrement);
        echo json_encode($result);
        header("HTTP/1.1 200 OK");
        exit();
    }

    if ($_POST['METHOD'] == 'PUT') {
        unset($_POST['METHOD']);
        $idUsuarios = $_GET['idUsuarios'];
        $nombreUsuario = $_POST['nombreUsuario'];
        $emailUsuario = $_POST['emailUsuario']; 
        $telfUsuario = $_POST['telfUsuario'];

        $query = "UPDATE usuarios SET nombreUsuario = '$nombreUsuario', emailUsuario = '$emailUsuario', telfUsuario = '$telfUsuario' WHERE idUsuarios = '$idUsuarios'";
        $result = putUser($query);
        echo json_encode($result);
        header("HTTP/1.1 200 OK");
        exit();
    }

    if ($_POST['METHOD'] == 'DELETE') {
        unset($_POST['METHOD']);
        $idUsuarios = $_GET['idUsuarios'];

        $query = "DELETE FROM usuarios WHERE idUsuarios = $idUsuarios";
        $result = deleteUser($query);
        echo json_encode($result);
        header("HTTP/1.1 200 OK");
        exit();
    }

    header("HTTP/1.1 400 Bad Request");

?>