document.addEventListener("DOMContentLoaded", function () {
  displayPoints();
  showVouchers();
  displayPromotions();
});

function displayPoints() {
  let points = parseInt(localStorage.getItem("loyaltyPoints")) || 0;
  document.getElementById("points-display").textContent = points; // Ensure you have a <span id="points-display"></span> in your HTML
}

function claimOffer(voucherId) {
  const vouchers = JSON.parse(localStorage.getItem("vouchers")) || [];
  let voucher;

  switch (voucherId) {
    case "discount":
      voucher = {
        description: "10% Off on Your Next Visit",
        validity: "30 days",
        promocode: "10%off",
      };
      break;
    case "food":
      voucher = {
        description: "Free Redemption Food Item",
        validity: "1 month",
        promocode: "freefood",
      };
      break;
    case "birthday":
      voucher = {
        description: "Birthday Voucher",
        validity: "birthday month",
        promocode: "birthday",
      };
      break;
    default:
      alert("Invalid voucher.");
      return;
  }

  vouchers.push(voucher);
  localStorage.setItem("vouchers", JSON.stringify(vouchers));
  alert("Voucher claimed successfully!");
  showVouchers(); // Refresh the display of vouchers
}

function showVouchers() {
  const vouchers = JSON.parse(localStorage.getItem("vouchers")) || [];
  const vouchersContainer = document.getElementById("voucher-collector");
  if (!vouchersContainer) {
    console.error("Vouchers display container not found!");
    return;
  }
  vouchersContainer.innerHTML = "";

  vouchers.forEach((voucher) => {
    const voucherElement = document.createElement("div");
    voucherElement.className = "voucher-detail";
    voucherElement.innerHTML = `
            <strong>${voucher.description}</strong><br>
            Valid until: ${voucher.validity}<br>
            Promo Code: <strong>${voucher.promocode}</strong>
        `;
    vouchersContainer.appendChild(voucherElement);
  });
}

function displayPromotions() {
  const notificationsElement = document.getElementById(
    "promotion-notifications"
  );
  if (!notificationsElement) {
    console.error("Promotions display container not found!");
    return;
  }

  const promotions = [
    {
      title: "Summer Special - 20% Off!",
      details:
        "Get 20% off on all beverages this summer. Valid till August 31.",
    },
    {
      title: "New Product Launch",
      details:
        "Try our new Caramel Pumpkin Spice Latte available from September 1.",
    },
  ];

  promotions.forEach((promo) => {
    let listItem = document.createElement("li");
    listItem.textContent = `${promo.title} - ${promo.details}`;
    notificationsElement.appendChild(listItem);
  });
}

function redeemVoucher(voucherId) {
  // Function to handle redeeming a voucher using points
  const points = parseInt(localStorage.getItem("loyaltyPoints")) || 0;
  const requiredPoints = 50; // Example fixed cost per voucher

  if (points >= requiredPoints) {
    localStorage.setItem("loyaltyPoints", points - requiredPoints);
    displayPoints(); // Update displayed points
    alert("Voucher redeemed successfully!");
  } else {
    alert("Not enough points to redeem this voucher.");
  }
}
