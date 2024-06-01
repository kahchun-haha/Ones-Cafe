function reloadPage() {
    localStorage.setItem('scrollPosition', window.scrollY || window.pageYOffset);
    window.location.reload();
}

function restoreScrollPosition() {
    const savedPosition = localStorage.getItem('scrollPosition');
    if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition, 10));
        localStorage.removeItem('scrollPosition');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    restoreScrollPosition();

    let categoriesHTML = "";
    categories.forEach((element) => {
        categoriesHTML += `
        <li class="nav-link">
            <a href="#">
                <i class='${element.icon}'></i>
                <span class="text nav-text">${element.name}</span>
            </a>
        </li>`;
    });
    document.querySelector(".js-menu-links").innerHTML = categoriesHTML;

    let MenuHTML = "";
    menu.forEach((element) => {
        MenuHTML += `<div class="container">
            <div class="picture">
                <img src="/images/menu/${element.id}.jpg" alt="${element.title}">
            </div>
            <div class="text">
                <div class="title">
                    <div class="after-user-text">${element.title}</div>
                </div>
                <div class="description">
                    ${element.contents}
                </div>
                <div class="inner-details">
                    <div class="category-for-menu-item">
                        <i class='bx bx-category'></i>Category: ${element.category}
                    </div>
                    <div class="cost">
                        <i class='bx bx-dollar-circle'></i>Price: ${element.cost}
                    </div>
                </div>
                <a href="#" class="read-more">Change</a>
            </div>
        </div>`;
    });
    document.querySelector(".menu-elements").innerHTML = MenuHTML;
});
