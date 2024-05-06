document.addEventListener('DOMContentLoaded', function() {
  var formFields = document.querySelectorAll('#manage-account-form input');
  
  // Load saved state if it exists
  formFields.forEach(function(field) {
    if (sessionStorage.getItem(field.id)) {
      field.value = sessionStorage.getItem(field.id); // Set field value from session storage if available
    }
  });

  // Event listener for the edit button
  document.getElementById('edit-button').addEventListener('click', function() {
    setEditMode(true);
  });

  // Event listener for the save button
  document.getElementById('save-button').addEventListener('click', function() {
    formFields.forEach(function(field) {
      sessionStorage.setItem(field.id, field.value); // Save each field's value in session storage
    });
    setEditMode(false);
  });

  // Event listener for the discard button
  document.getElementById('discard-button').addEventListener('click', function() {
    // Revert each field to the last saved value in session storage
    formFields.forEach(function(field) {
      field.value = sessionStorage.getItem(field.id) || field.value; // Use saved value or current if not available
    });
    setEditMode(false);
  });

  // Function to toggle the readonly state of form fields and button visibility
  function setEditMode(editing) {
    formFields.forEach(function(field) {
      field.readOnly = !editing;
      field.style.backgroundColor = editing ? "#fff" : "#e9ecef";
    });

    // Toggle button visibility
    document.getElementById('edit-button').style.display = editing ? 'none' : 'inline-block';
    document.getElementById('save-button').style.display = editing ? 'inline-block' : 'none';
    document.getElementById('discard-button').style.display = editing ? 'inline-block' : 'none';
  }
});

fetch('/templates/menu.html')
  .then(response => response.text())
  .then(navbarHtml => {
    document.getElementById('navbar').innerHTML = navbarHtml;
  });

fetch('/templates/menu.html')
  .then(response => response.text())
  .then(navbarHtml => {
    document.getElementById('footer').innerHTML = navbarHtml;
  });