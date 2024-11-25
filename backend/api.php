<?php

header('Content-Type: application/json; charset=utf8');

$conn = mysqli_connect("localhost","root","rooting","zikanodejs");


if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM mahasiswa";

    $query = mysqli_query($conn, $sql);
    $array_data = array();

    while($data = mysqli_fetch_assoc($query)) {
        $array_data[] = $data;
    }

    echo json_encode($array_data);

} else if($_SERVER['REQUEST_METHOD' ] === 'POST') {
    $nim = $_POST['nim'];
    $nama = $_POST['nama'];
    $jenis_kelamin = $_POST['jenis_kelamin'];

    $sql = "INSERT INTO mahasiswa(nim,nama,jenis_kelamin)VALUES('$nim', '$nama', '$jenis_kelamin')";
    $cek = mysqli_query($conn, $sql );

    if($cek) {
        $data = [
            'status' => "success"
        ];

        echo json_encode([$data]);
    } else {
        $data = [
            'status' => "failed"
        ];

        echo json_encode([$data]);
    }

} else if($_SERVER['REQUEST_METHOD']  === 'DELETE') {

    $id = $_GET['id_mahasiswa'];
    $sql = "DELETE FROM mahasiswa WHERE id_mahasiswa = '$id'";
    $cek = mysqli_query($conn,$sql);

    if($cek) {
        $data = [
            'status' => "success"
        ];

        echo json_encode([$data]);
    } else {
        $data = [
            'status' => "failed"
        ];

        echo json_encode([$data]);
    }

} else if ($_SERVER['REQUEST_METHOD']  === 'PUT' ) {
    $id = $_GET['id_mahasiswa'];
    $nim = $_GET['nim'];
    $nama = $_GET['nama'];
    $jenis_kelamin = $_GET['jenis_kelamin'];

    $sql = "UPDATE mahasiswa SET nama = '$nama', nim = '$nim', jenis_kelamin = '$jenis_kelamin' WHERE id_mahasiswa = '$id'";
    $cek = mysqli_query($conn,$sql);

    if($cek) {
        $data = [
            'status' => "success"
        ];

        echo json_encode([$data]);
    } else {
        $data = [
            'status' => "failed"
        ];

        echo json_encode([$data]);
    }
}