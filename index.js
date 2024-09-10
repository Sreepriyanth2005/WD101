document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const dobInput = document.getElementById('dob').value;
    const dob = new Date(dobInput);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    // Validate age between 18 and 55
    if (age < 18 || age > 55) {
        alert('Date of birth must be between 18 and 55 years.');
        return;
    }

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const acceptedTerms = document.getElementById('terms').checked;

    // Get existing data from localStorage
    let usersData = JSON.parse(localStorage.getItem('usersData')) || [];

    // Add new user data to the list
    usersData.push({
        name,
        email,
        password,
        dob: dobInput,
        acceptedTerms
    });

    // Save the updated list back to localStorage
    localStorage.setItem('usersData', JSON.stringify(usersData));

    // Display the updated data in the table
    loadTableData();
});

function loadTableData() {
    const usersData = JSON.parse(localStorage.getItem('usersData')) || [];

    const tableBody = usersData.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.acceptedTerms ? 'Yes' : 'No'}</td>
        </tr>
    `).join('');

    document.getElementById('dataTable').innerHTML = `
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>DOB</th>
            <th>Accepted terms?</th>
        </tr>
        ${tableBody}
    `;
}

// Load the data when the page is refreshed
window.onload = loadTableData;
