// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Example of handling book item click to show/hide description
    const bookItems = document.querySelectorAll('.book-item');
    
    bookItems.forEach(item => {
        item.addEventListener('click', function() {
            const description = this.querySelector('.book-description');
            if (description) {
                description.classList.toggle('hidden');
            }
        });
    });
});

// Example function to handle form submission with basic validation
document.querySelector('form')?.addEventListener('submit', function(event) {
    const username = document.querySelector('#username');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    
    if (!username.value || !email.value || !password.value) {
        alert('All fields are required!');
        event.preventDefault(); // Prevent form submission
    }
});

