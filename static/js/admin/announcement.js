document.addEventListener("DOMContentLoaded", function () {
  const announcementForm = document.getElementById("announcement-form");
  const announcementsTableBody = document.getElementById("announcements");

  announcementForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("announcement-title").value;
    const message = document.getElementById("announcement-message").value;

    try {
      const response = await fetch("/api/admins/createAnnouncement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, message }),
      });

      if (response.ok) {
        const announcement = await response.json();
        displayAnnouncement(
          announcement,
          announcementsTableBody.children.length + 1
        );
        announcementForm.reset();
      } else {
        const error = await response.json();
        console.error("Error response from server:", error);
        alert("Error creating announcement: " + error.message);
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
      alert("Error creating announcement");
    }
  });

  async function fetchAnnouncements() {
    try {
      const response = await fetch("/api/admins/announcements");
      const announcements = await response.json();
      announcements.forEach((announcement, index) =>
        displayAnnouncement(announcement, index + 1)
      );
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  }

  function displayAnnouncement(announcement, index) {
    const row = document.createElement("tr");
    const date = new Date(announcement.create_time);
    const formattedDate =
      date instanceof Date && !isNaN(date)
        ? date.toLocaleString()
        : "Invalid Date";

    row.innerHTML = `
      <td>${index}</td>
      <td>${announcement.title}</td>
      <td>${announcement.message}</td>
      <td>${formattedDate}</td>
      <td><button class="delete-button" data-id="${announcement._id}">Delete</button></td>
    `;
    announcementsTableBody.appendChild(row);
  }

  fetchAnnouncements();

  document
    .getElementById("announcements-table")
    .addEventListener("click", async function (e) {
      if (e.target.classList.contains("delete-button")) {
        const announcementId = e.target.dataset.id;
        try {
          const response = await fetch(
            `/api/admins/deleteAnnouncement/${announcementId}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            e.target.closest("tr").remove();
            alert("Announcement deleted successfully");
          } else {
            alert("Error deleting announcement");
          }
        } catch (error) {
          console.error("Error deleting announcement:", error);
          alert("Error deleting announcement");
        }
      }
    });
});
