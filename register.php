<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Database connection
    $servername = "localhost";
    $username = "booknook_user";
    $password = "Str0ng!Password";
    $dbname = "booknook_db";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Retrieve and sanitize form inputs
    $name = $conn->real_escape_string($_POST['name']);
    $surname = $conn->real_escape_string($_POST['surname']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    // Insert data into database
    $sql = "INSERT INTO users (name, surname, email, password) VALUES ('$name', '$surname', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "თქვენ წარმატებით დარეგისტრირდით!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
} else {
    echo "Invalid request method.";
}
?>

