    // Define variables
    const maxAttempts = 3;
    let attemptCount = parseInt(localStorage.getItem('attemptCount')) || 0;
    let lastAttemptTime = localStorage.getItem('lastAttemptTime') ? new Date(localStorage.getItem('lastAttemptTime')) : null;

    // Function to handle form submission
    document.getElementById('passwordValidation').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Check lockout status
        if (isLockedOut()) {
            document.getElementById('lockoutMessage').style.display = 'block';
            return;
        }

        // Get entered password
        const password = document.getElementById('password').value;

        // Check if password is correct
        if (password === 'your_password_here') { // Replace with your actual password
            unlock(); // Reset attempts and unlock if correct
            document.getElementById('passwordForm').style.display = 'none'; // Hide password form
            document.getElementsByClassName('link-container')[0].style.display = 'flex'; // Show links
        } else {
            // Increment attempt count and display error message
            attemptCount++;
            localStorage.setItem('attemptCount', attemptCount); // Update attempt count in localStorage
            document.getElementById('passwordError').style.display = 'block';

            // Check if maximum attempts reached
            if (isMaxAttemptsReached()) {
                lock(); // Lock the user out
            }
        }
    });

    // Function to check if user is locked out
    function isLockedOut() {
        if (attemptCount >= maxAttempts) {
            // Check if locked out time has passed
            if (lastAttemptTime === null || (new Date() - lastAttemptTime) > 24 * 60 * 60 * 1000) {
                return false; // Not locked out
            } else {
                return true; // Locked out
            }
        } else {
            return false; // Not locked out
        }
    }

    // Function to check if maximum attempts reached
    function isMaxAttemptsReached() {
        return attemptCount >= maxAttempts;
    }

    // Function to lock the user out
    function lock() {
        attemptCount = maxAttempts; // Set attempt count to maximum
        lastAttemptTime = new Date(); // Record lockout time
        localStorage.setItem('lastAttemptTime', lastAttemptTime); // Store lockout time in localStorage
    }

    // Function to unlock the user
    function unlock() {
        attemptCount = 0; // Reset attempt count
        lastAttemptTime = null; // Clear lockout time
        localStorage.removeItem('attemptCount'); // Remove attempt count from localStorage
        localStorage.removeItem('lastAttemptTime'); // Remove lockout time from localStorage
        document.getElementById('passwordError').style.display = 'none'; // Hide error message
        document.getElementById('lockoutMessage').style.display = 'none'; // Hide lockout message
    }
