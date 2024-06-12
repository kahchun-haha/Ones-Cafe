document.addEventListener("DOMContentLoaded", function () {
  const voucherCollectorBtn = document.getElementById('voucher-collector-btn');
  if (voucherCollectorBtn) {
    voucherCollectorBtn.addEventListener('click', function(event) {
      event.preventDefault();
      if (!checkAuth()) {
        alert('You are required to login first before accessing the voucher page.');
        window.location.href = '/login';
      } else {
        window.location.href = '/voucher';
      }
    });
  }
  displayPoints();
  showVouchers();
  displayAnnouncements();
});

function checkAuth() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = JSON.parse(localStorage.getItem('user'));
  return isLoggedIn && user;
}

function getUserId() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.userId : null;
}

async function displayPoints() {
  const userId = getUserId();

  if (!userId) {
    const pointsDisplayElement = document.getElementById("points-display");
    if (pointsDisplayElement) {
      pointsDisplayElement.textContent = '0';
    }
    return;
  }

  try {
    const response = await fetch(`/api/users/${userId}/points`);
    if (response.ok) {
      const data = await response.json();
      const pointsDisplayElement = document.getElementById("points-display");
      if (pointsDisplayElement) {
        pointsDisplayElement.textContent = data.loyaltyPoints;
      }

      const updatedUser = JSON.parse(localStorage.getItem('user')) || {};
      updatedUser.loyaltyPoints = data.loyaltyPoints;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem('loyaltyPoints', data.loyaltyPoints);
    } else {
      console.error('Error fetching points:', await response.json());
    }
  } catch (error) {
    console.error('Error fetching points:', error);
  }
}

function claimOffer(voucherId, pointsCost) {
  if (!checkAuth()) {
    alert('You are required to login first before claiming a voucher.');
    window.location.href = '/login';
    return;
  }

  const userId = getUserId();
  const voucherDetails = getVoucherDetails(voucherId);

  if (!voucherDetails) {
    alert('Invalid voucher');
    return;
  }

  const voucher = {
    userId: userId,
    description: voucherDetails.description,
    validity: voucherDetails.validity,
    promocode: voucherDetails.promocode,
    pointsCost: pointsCost
  };

  fetch('/claim', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(voucher)
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Voucher claimed successfully') {
      alert("Voucher claimed successfully!");
      localStorage.setItem("loyaltyPoints", data.newPoints);
      localStorage.setItem("user", JSON.stringify({ ...JSON.parse(localStorage.getItem("user")), loyaltyPoints: data.newPoints }));
      displayPoints();
      showVouchers();
    } else {
      alert(data.message);
    }
  })
  .catch(error => console.error('Error:', error));
}

function getVoucherDetails(voucherId) {
  const vouchers = {
    discount: {
      description: "10% Off on Total Bill",
      validity: "30 days",
      promocode: "10%off"
    },
    birthday: {
      description: "Birthday Voucher 15% Off",
      validity: "Birthday Month",
      promocode: "birthday"
    }
  };

  return vouchers[voucherId] || null;
}

function showVouchers() {
  const userId = getUserId();
  fetch(`/getVouchers?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  })
  .then(response => response.json())
  .then(vouchers => {
    const vouchersContainer = document.getElementById("voucher-collector");
    if (!vouchersContainer) {
      console.error("Vouchers display container not found!");
      return;
    }
    vouchersContainer.innerHTML = "";

    vouchers.forEach((voucher) => {
      const voucherElement = document.createElement("div");
      voucherElement.className = "voucher-detail";
      const expiryDate = new Date(voucher.validity).toLocaleDateString();

      voucherElement.innerHTML = `
        <strong>${voucher.description}</strong><br>
        Valid until: ${expiryDate}<br>
        Promo Code: <strong>${voucher.promocode}</strong>
      `;
      vouchersContainer.appendChild(voucherElement);
    });
  })
  .catch(error => console.error('Error:', error));
}

async function displayAnnouncements() {
  try {
    const response = await fetch('/api/admins/announcements');
    const announcements = await response.json();
    const announcementsElement = document.getElementById("announcement-list");
    if (!announcementsElement) {
      console.error("Announcements display container not found!");
      return;
    }
    announcementsElement.innerHTML = "";

    announcements.forEach(announcement => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<strong>${announcement.title}</strong>: ${announcement.message}`;
      announcementsElement.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching announcements:', error);
  }
}
