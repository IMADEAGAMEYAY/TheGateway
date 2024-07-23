document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("passwordValidation").addEventListener("submit", function(event) {
        event.preventDefault();
        var password = document.getElementById("password").value;
        if (password === "VGhlIEdhdGV3YXk=") { // Replace with your actual password
            document.getElementById("passwordForm").style.display = "none";
            // Show link-container by selecting by class name
            var linkContainers = document.getElementsByClassName("link-container");
            for (var i = 0; i < linkContainers.length; i++) {
                linkContainers[i].style.display = "flex";
            }
        } else {
            document.getElementById("passwordError").style.display = "block";
        }
    });
});