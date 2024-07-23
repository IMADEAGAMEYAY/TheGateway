const maxAttempts = 3; // Maximum allowed attempts
const lockoutDurationHours = 24; // Lockout duration in hours
const localStorageKey = 'passwordAttempts'; // Key for localStorage
 
// Event listener for form submission
document.getElementById('passwordValidation').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const password = document.getElementById('password').value;

    // Check password
    if (password === 'your_password_here') { // Replace 'your_password_here' with your actual password
        unlock(); // Reset attempts and unlock if correct
        var linkContainers = document.getElementsByClassName("link-container");
        document.getElementById('passwordForm').style.display = 'none'; // Hide password form
        for (var i = 0; i < linkContainers.length; i++) {
            linkContainers[i].style.display = "flex";
        }
        loadLinks(); // Load links after unlocking
    } else {
        handleIncorrectPassword();
    }
});

// Function to handle incorrect password attempt
function handleIncorrectPassword() {
    let attempts = parseInt(localStorage.getItem(localStorageKey)) || 0;

    // Increment attempts
    attempts++;
    localStorage.setItem(localStorageKey, attempts);

    // Check if max attempts reached
    if (attempts >= maxAttempts) {
        lock(); // Lock user out if max attempts reached
    } else {
        // Display error message
        document.getElementById('passwordError').style.display = 'block';
    }
}

// Function to lock the user out
function lock() {
    localStorage.setItem('lockoutTime', new Date().getTime()); // Store lockout time
    localStorage.setItem(localStorageKey, maxAttempts); // Reset attempts to maxAttempts
    document.getElementById('lockoutMessage').style.display = 'block'; // Display lockout message
    document.getElementById('passwordValidation').style.display = 'none'; // Hide password form
}

// Function to unlock the user
function unlock() {
    localStorage.removeItem(localStorageKey); // Remove attempts from localStorage
    localStorage.removeItem('lockoutTime'); // Remove lockout time from localStorage
    document.getElementById('passwordError').style.display = 'none'; // Hide error message
    document.getElementById('lockoutMessage').style.display = 'none'; // Hide lockout message
}

// Function to check if user is currently locked out
function isLockedOut() {
    const lockoutTime = localStorage.getItem('lockoutTime');
    if (!lockoutTime) return false;

    const lockoutDurationMillis = lockoutDurationHours * 60 * 60 * 1000; // Convert hours to milliseconds
    const currentTime = new Date().getTime();

    // Check if lockout period has expired
    if (currentTime - parseInt(lockoutTime) >= lockoutDurationMillis) {
        localStorage.removeItem('lockoutTime'); // Remove lockout time
        localStorage.setItem(localStorageKey, maxAttempts); // Reset attempts to maxAttempts
        return false;
    }

    return true; // User is still locked out
}

// Function to load links after successful login
function loadLinks() {
    // This is where you can dynamically generate or display links
    const linkContainer = document.getElementById('linkContainer');
    linkContainer.innerHTML = `
        <div class="link-item">
            <a href="#">Link 1</a>
        </div>
        <div class="link-item">
            <a href="#">Link 2</a>
        </div>
        <!-- Add more link items as needed -->
    `;
}

// Check if user is already locked out on page load
if (isLockedOut()) {
    lock(); // Display lockout message if still locked out
}
