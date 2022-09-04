'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function () {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function (header) {
    header.addEventListener('click', function (event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function () {
    filterSizes.classList.toggle('hidden');
});


const shoppingCart = document.getElementsByClassName("cartIcon")[0];
shoppingCart.addEventListener("click", () => {
    document.getElementsByClassName("cart")[0].classList.toggle('hidden');
});

const cartTotalEl = document.querySelector(".cartTotal");
const productList = {};

function addToCart(id, name, price) {
    if (productList.hasOwnProperty(id)) {
        productList[id].count += 1;
    }
    else {
        const product = {
            "id": id,
            "name": name,
            "price": price,
            "count": 1,
        }
        productList[id] = product;
    }
    document.getElementsByClassName("cartIconWrap")[0]
        .querySelector("span").textContent = countAllProducts(id);

    document.getElementsByClassName("cartTotal")[0]
        .querySelector("span").textContent = countAllPrices(id);

    const cartRowEl = document.querySelector(".cart")
        .querySelector(`.cartRow[data-id="${id}"]`);

    if (!cartRowEl) {
        NewProductInCart(id);
        return;
    }

    cartRowEl.querySelector(".productCount")
        .textContent = productList[id]["count"];

    cartRowEl.querySelector(".productTotalRow")
        .textContent = Math.trunc(productList[id]["price"] *
            productList[id]["count"]);
}

function countAllProducts(id) {
    let totalQuant = 0;
    for (let i = 1; i <= Object.keys(productList).length; i++) {
        totalQuant += productList[id]["count"];
    }
    return totalQuant;
}

function countAllPrices(id) {
    let totalPrice = 0;
    for (let i = 1; i <= Object.keys(productList).length; i++) {
        totalPrice += Math.trunc(productList[id]["price"] * productList[id]["count"]);
    }
    return totalPrice;
}

const cartBtn = document.getElementsByClassName("featuredItems")[0];
cartBtn.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON") {
        const parent = event.target.parentNode.parentNode.parentNode;
        addToCart(parent.dataset.id, parent.dataset.name, parent.dataset.price);
    }
});

function NewProductInCart(product) {
    const productRow = `
        <div class="cartRow" data-id="${product}">
            <div>${productList[product]["name"]}</div>
            <div>
                <span class="productCount">${productList[product]["count"]}</span> шт.
            </div>
            <div>$${productList[product]["price"]}</div>
            <div>
                $<span class="productTotalRow">${Math.trunc(productList[product]["price"] *
        productList[product]["count"])}</span>
            <div>
        </div>
        `;
    cartTotalEl.insertAdjacentHTML("beforebegin", productRow);
}
