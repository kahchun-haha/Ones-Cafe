function checkAuth() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = JSON.parse(localStorage.getItem('user'));
  return isLoggedIn && user;
}

function getUserId() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.userId : null; // Use userId instead of _id
}

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
  displayPromotions();
});

function displayPoints() {
  let points = parseInt(localStorage.getItem("loyaltyPoints")) || 0;
  console.log("Loyalty points from local storage:", points); // Debug log
  const pointsDisplayElement = document.getElementById("points-display");
  if (pointsDisplayElement) {
    pointsDisplayElement.textContent = points;
  } else {
    console.warn("Points display element not found.");
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
    pointsCost: pointsCost // Pass the points cost to the backend
  };

  fetch('/claim', { // Ensure this matches the server route
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
      localStorage.setItem("loyaltyPoints", data.newPoints); // Update local storage
      localStorage.setItem("user", JSON.stringify({ ...JSON.parse(localStorage.getItem("user")), loyaltyPoints: data.newPoints })); // Update user data in local storage
      displayPoints(); // Update the displayed points
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
  fetch(`/getVouchers?userId=${userId}`, { // Ensure this matches the server route
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
      
      // Format the validity date
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

function displayPromotions() {
  const promotions = [
    {
      title: "New Product Launch",
      details: "Try our new Caramel Orange Dream Creamsicle available from June 1."
    }
  ];

  const notificationsElement = document.getElementById("promotion-notifications");
  if (!notificationsElement) {
    console.error("Promotions display container not found!");
    return;
  }

  promotions.forEach(promo => {
    const listItem = document.createElement("li");
    listItem.textContent = `${promo.title} - ${promo.details}`;
    notificationsElement.appendChild(listItem);
  });
}
