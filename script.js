// script.js

function toggleDescription(id) {
    var description = document.getElementById(id);
    if (description.style.display === "block") {
        description.style.display = "none";
    } else {
        description.style.display = "block";
    }
}

