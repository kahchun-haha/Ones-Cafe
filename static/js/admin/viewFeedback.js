async function fetchFeedback() {
  try {
    const contactsResponse = await fetch('/api/admins/contacts');
    const contacts = await contactsResponse.json();
    displayFeedback('contacts', contacts);

    const suggestionsResponse = await fetch('/api/admins/suggestions');
    const suggestions = await suggestionsResponse.json();
    displayFeedback('suggestions', suggestions);

    const issuesResponse = await fetch('/api/admins/issues');
    const issues = await issuesResponse.json();
    displayFeedback('issues', issues, true); // Enable update functionality for issues

    const reviewsResponse = await fetch('/api/admins/reviews');
    const reviews = await reviewsResponse.json();
    displayFeedback('reviews', reviews);

    const totalFeedbackCount = contacts.length + suggestions.length + issues.length + reviews.length;
    document.getElementById('total-feedback-count').innerText = totalFeedbackCount;
  } catch (error) {
    console.error('Error fetching feedback:', error);
  }
}

function displayFeedback(type, data, isIssue = false) {
  const container = document.getElementById(type);
  container.innerHTML = '';
  data.forEach(item => {
    const content = item.content || item.request || item.experiencing || item.ratings;
    const div = document.createElement('div');
    div.className = 'feedback-item';
    div.innerHTML = `
      <strong>ID:</strong> ${item._id}<br>
      <strong>User:</strong> ${item.user}<br>
      <strong>Email:</strong> ${item.email}<br>
      <strong>Content:</strong> ${content}<br>
      ${isIssue ? `
      <strong>Progress:</strong>
      <select id="progress-${item._id}" class="progress-select" ${item.progress === 'Solved' ? 'disabled' : ''}>
        <option value="Pending" ${item.progress === 'Pending' ? 'selected' : ''}>Pending</option>
        <option value="In Progress" ${item.progress === 'In Progress' ? 'selected' : ''}>In Progress</option>
        <option value="Solved" ${item.progress === 'Solved' ? 'selected' : ''}>Solved</option>
      </select><br>
      <strong>Reply:</strong> <input type="text" id="reply-${item._id}" class="reply-input" value="${item.reply || ''}" ${item.progress === 'Solved' ? 'disabled' : ''}><br>
      <button id="update-${item._id}" onclick="updateIssue('${item._id}')" ${item.progress === 'Solved' ? 'disabled' : ''}>Update</button>` : ''}
      <hr>
    `;
    container.appendChild(div);
  });
}

async function updateIssue(id) {
  const progress = document.getElementById(`progress-${id}`).value;
  const reply = document.getElementById(`reply-${id}`).value;

  try {
    const response = await fetch('/api/admins/updateIssue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, progress, reply })
    });

    if (response.ok) {
      alert('Issue updated successfully');
      updateDOMWithNewStatus(id, progress);
    } else {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      alert(`Error updating issue: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error updating issue:', error);
    alert('Error updating issue');
  }
}

function updateDOMWithNewStatus(id, newStatus) {
  const progressSelect = document.getElementById(`progress-${id}`);
  const replyInput = document.getElementById(`reply-${id}`);
  const updateButton = document.getElementById(`update-${id}`);

  progressSelect.value = newStatus;
  if (newStatus === 'Solved') {
    progressSelect.disabled = true;
    replyInput.disabled = true;
    updateButton.disabled = true;
  }
}

document.addEventListener('DOMContentLoaded', fetchFeedback);
