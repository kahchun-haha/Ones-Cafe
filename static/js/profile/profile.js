document.addEventListener('DOMContentLoaded', function () {
  async function checkLoginStatus() {
      try {
          const response = await fetch('/api/users/check-auth', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          if (response.ok) {
              const user = await response.json();
              loadUserData(user);
          } else {
              window.location.href = '/login';
          }
      } catch (error) {
          console.error('Error checking login status:', error);
      }
  }

  function loadUserData(user) {
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

  document.getElementById('save-button').addEventListener('click', async function (event) {
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
              loadUserData(updatedUser); // Update client-side with new data
              setEditMode(false); // Switch back to read-only mode
          } else {
              alert('Failed to update profile.');
          }
      } catch (error) {
          console.error('Error updating profile:', error);
          alert('An error occurred while updating the profile.');
      }
  });

  document.getElementById('discard-button').addEventListener('click', function () {
      checkLoginStatus();
      setEditMode(false);
  });

  document.getElementById('edit-button').addEventListener('click', function () {
      setEditMode(true);
  });

  document.getElementById('change-password-button').addEventListener('click', function () {
      window.location.href = '/changePassword'; // Navigate to changePassword.html
  });

  function setEditMode(editing) {
      const formFields = document.querySelectorAll('#manage-account-form input, #manage-account-form select');
      formFields.forEach(function (field) {
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
