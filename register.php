<?php
// Database connection details
$servername = "localhost";
$username = "booknook_user";
$password = "Str0ng!Password";
$dbname = "booknook_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve and sanitize form inputs
$name = mysqli_real_escape_string($conn, $_POST['name']);
$surname = mysqli_real_escape_string($conn, $_POST['surname']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$password = mysqli_real_escape_string($conn, $_POST['password']);

// Hash the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert user into the database
$sql = "INSERT INTO users (name, surname, email, password) VALUES ('$name', '$surname', '$email', '$hashed_password')";

if ($conn->query($sql) === TRUE) {
    echo "თქვენ წარმატებით გაიარეთ რეგისტრაცია !";  // Success message in Georgian
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;  // Display error if any
}

$conn->close();
?>

