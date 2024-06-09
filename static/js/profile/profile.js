document.addEventListener('DOMContentLoaded', function() {
    function addEventListenerSafely(id, event, handler) {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener(event, handler);
        } else {
            console.error(`Element with id ${id} not found.`);
        }
    }

    async function checkLoginStatus() {
        try {
            const response = await fetch('/api/users/check-auth', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                await fetchProfileData();
            } else {
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    }

    async function fetchProfileData() {
        try {
            const response = await fetch('/api/users/getProfile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const user = await response.json();
                loadUserData(user);
            } else {
                console.error('Failed to fetch profile data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    }

    function loadUserData(user) {
        document.getElementById('userId').innerText = user.userId || '';
        document.getElementById('name').value = user.username || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('birthday').value = user.birthday || '';
        document.getElementById('gender').value = user.gender || '';
        document.getElementById('contact-number').value = user.contactNumber || '';
        document.getElementById('address').value = user.address || '';
        document.getElementById('city').value = user.city || '';
        document.getElementById('state').value = user.state || '';
        document.getElementById('postcode').value = user.postcode || '';
    }

    addEventListenerSafely('save-button', 'click', async function(event) {
        event.preventDefault();
        const updatedUser = {
            username: document.getElementById('name').value,
            email: document.getElementById('email').value,
            birthday: document.getElementById('birthday').value,
            gender: document.getElementById('gender').value,
            contactNumber: document.getElementById('contact-number').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            postcode: document.getElementById('postcode').value,
        };

        try {
            const response = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });

            if (response.ok) {
                alert('Profile updated successfully!');
                await fetchProfileData();
                setEditMode(false);
            } else {
                const errorText = await response.text();
                let errorData;
                try {
                    errorData = JSON.parse(errorText);
                } catch {
                    throw new Error('Failed to parse response');
                }
                alert(`Failed to update profile: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile.');
        }
    });

    addEventListenerSafely('discard-button', 'click', async function() {
        await fetchProfileData();
        setEditMode(false);
    });

    addEventListenerSafely('edit-button', 'click', function() {
        setEditMode(true);
    });

    addEventListenerSafely('change-password-button', 'click', function() {
        window.location.href = '/changePassword';
    });

    addEventListenerSafely('delete-account-button', 'click', async function() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                const response = await fetch('/api/users/delete', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    alert('Account deleted successfully.');
                    window.location.href = '/login';
                } else {
                    console.error('Failed to delete account:', response.statusText);
                    alert('Failed to delete account.');
                }
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('An error occurred while deleting the account.');
            }
        }
    });

    function setEditMode(editing) {
        const formFields = document.querySelectorAll('#manage-account-form input, #manage-account-form select');
        formFields.forEach(function(field) {
            field.readOnly = !editing;
            field.disabled = !editing;
            field.style.backgroundColor = editing ? "#fff" : "#e9ecef";
        });

        document.getElementById('edit-button').style.display = editing ? 'none' : 'inline-block';
        document.getElementById('save-button').style.display = editing ? 'inline-block' : 'none';
        document.getElementById('discard-button').style.display = editing ? 'inline-block' : 'none';
        document.getElementById('change-password-button').disabled = !editing;
    }

    checkLoginStatus();
});
