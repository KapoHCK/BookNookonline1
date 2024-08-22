<?php
// Include database connection
include 'db_connect.php'; // Ensure this file contains your DB connection code

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $surname, $email, $hashed_password);

    // Execute the statement
    if ($stmt->execute()) {
        echo "<p>თქვენ წარმატებით დარეგისტრირდით!</p>"; // Success message in Georgian
    } else {
        echo "<p>შეცდომა: " . $stmt->error . "</p>"; // Error message
    }

    // Close the statement
    $stmt->close();
}

// Close the connection
$conn->close();
?>


