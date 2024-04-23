

// Function to fetch users and update the list
function fetchUsers() {
    // Replace this with your backend API endpoint to fetch users
    axios.get('http://localhost:3000/users')
        .then(response => {
            const usersList = document.getElementById('usersList');
            usersList.innerHTML = ''; // Clear previous list
            response.data.forEach(user => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = `
                    ${user.name} - ${user.email} - ${user.phone}
                    <button class="btn btn-danger delete-btn" onclick="handleDelete(${user.id})">Delete</button>
                    <button class="btn btn-primary edit-btn" onclick="handleEdit(${JSON.stringify(user)})">Edit</button>
                `;
                usersList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Function to handle edit button click
function handleEdit(user) {
    // Fill form fields with user data
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
    // You can also store the user ID in a hidden input field for later use
    document.getElementById('userId').value = user.id;
}

// Function to handle delete button click
function handleDelete(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        // Call delete user function with userId
        deleteUser(userId);
    }
}

// Function to submit form (for both adding and updating users)
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    // Retrieve the user ID from a hidden input field
    const userId = document.getElementById('userId').value;

    if (userId) {
        // If userId exists, it means we are updating an existing user
        // Replace this with your backend API endpoint to handle form submission for updating user data
        axios.put(`/api/users/${userId}`, formData)
            .then(response => {
                if (response.status === 200) {
                    // Refresh the users list after successful update
                    fetchUsers();
                    // Clear form fields and reset userId
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('phone').value = '';
                    document.getElementById('userId').value = '';
                } else {
                    throw new Error('Failed to update user');
                }
            })
            .catch(error => console.error('Error updating user:', error));
    }  else {
        // If userId does not exist, it means we are adding a new user
        // Replace this with your backend API endpoint to handle form submission for adding user data
        axios.post('http://localhost:3000/users', formData)
            .then(response => {
                if (response.status === 200) {
                    // Refresh the users list after successful submission
                    fetchUsers();
                    // Clear form fields
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('phone').value = '';
                } else {
                    throw new Error('Failed to submit form');
                }
            })
            .catch(error => console.error('Error submitting form:', error));
    }
});

// Call fetchUsers function on page load
fetchUsers();