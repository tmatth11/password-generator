// Generate random passwords based on the selected criteria
function generatePasswords(amount, length, uppercase, lowercase, numbers, symbols) {
    let passwords = []; // Hold password(s) to be generated

    // For every character to be included in the password...
    for (let i = 0; i < amount; i++) {
        let password = '';
        let charset = '';

        // Fill charset with selected characters
        if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (numbers) charset += '0123456789';
        if (symbols) charset += '!@#$%^&*()-_=+';

        if (charset === '') { // If charset is empty, return an empty array
            return [];
        }

        // Fill each character of the password with a random character from the charset
        for (let j = 0; j < length; j++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        
        // Add the generated password(s) to the passwords array
        passwords.push(password);
    }

    // Return the generated password(s)
    return passwords;
}

// Display generated passwords to the screen
function displayPasswords(passwords, passwordsContainer) {
    passwordsContainer.innerHTML = ''; // Clear the password container for every set of passwords generated
    
    // For every password in the password array...
    passwords.forEach(password => {
        // Create a new div element to hold the password
        const passwordElement = document.createElement('div');
        // Set the text content of the password element to the generated password
        passwordElement.textContent = password;
        // Append the password element to the password container
        passwordsContainer.appendChild(passwordElement);
    });

    // If there are passwords to be generated...
    if (passwords.length > 0) { 
        // Create a new button element to save the passwords to a file
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            const textToSave = passwords.join('\n');
            const blob = new Blob([textToSave], {type: "text/plain"});
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'passwords.txt';
            link.href = url;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
        passwordsContainer.appendChild(saveButton);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const passwordsContainer = document.getElementById('passwords');

    // When the form is submitted...
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        // Determine the number of passwords to be generated, length of each password, and which characters to include
        const amount = parseInt(document.getElementById('amount').value);
        const length = parseInt(document.getElementById('length').value);
        const uppercase = document.getElementById('uppercase').checked;
        const lowercase = document.getElementById('lowercase').checked;
        const numbers = document.getElementById('numbers').checked;
        const symbols = document.getElementById('symbols').checked;

        // Call the generatePasswords function to generate the password(s)
        const passwords = generatePasswords(amount, length, uppercase, lowercase, numbers, symbols);
        // Call the displayPasswords function to display the generated passwords to the screen
        displayPasswords(passwords, passwordsContainer);
    });
});