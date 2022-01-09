<?php

    $pdo = null;
    $host = "localhost";
    $user = "root";
    $pass = "123456";
    $bd = "dbapi";

    // Conexión a la base de datos
    function conectar(){
        try{
            $GLOBALS['pdo'] = new PDO("mysql:host=".$GLOBALS['host'].";dbname=".$GLOBALS['bd']."", $GLOBALS['user'], $GLOBALS['pass']);
            $GLOBALS['pdo'] -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //echo "Conexión exitosa";
        }catch (PDOException $e){
            echo "Conexión fallida: " . $e->getMessage();
        }
    }
    // Desconexión de la base de datos
    function desconectar(){
        $GLOBALS['pdo'] = null;  
    }

    // Método GET
    function getUser($query)
    {
        try {
            conectar();
            $sql = $GLOBALS['pdo'] -> prepare($query);
            $sql -> setFetchMode(PDO::FETCH_ASSOC);
            $sql -> execute();
            desconectar();
            return $sql;
        } catch (\Throwable $th) {
            die("Error: " .$th);
        }
    }

    // Método POST
    function postUser($query/*, $queryAutoIncrement*/)
    {
        try {
            conectar();
            $sql = $GLOBALS['pdo']->prepare($query);
            $sql -> execute();
            $result = array_merge($_POST);
            $sql -> closeCursor();
            desconectar();
            return $result;
        } catch (\Throwable $th) {
            die("Error: " .$th);
        }
    }

    // Método PUT
    function putUser($query)
    {
        try {
            conectar();
            $sql = $GLOBALS['pdo'] -> prepare($query);
            $sql -> execute();
            $result = array_merge($_GET, $_POST);
            $sql -> closeCursor();
            desconectar();
            return $result;
        } catch (\Throwable $th) {
            die("Error: " .$th);
        }
    }

    // Método DELETE
    function deleteUser($query)
    {
        try {
            conectar();
            $sql = $GLOBALS['pdo'] -> prepare($query);
            $sql -> execute();
            $sql -> closeCursor();
            desconectar();
            return $_GET['id'];
        } catch (\Throwable $th) {
            die("Error: " .$th);
        }
    }
?>