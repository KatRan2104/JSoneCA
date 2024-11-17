const apiUrl = "https://v2.api.noroff.dev/rainy-days";

document.addEventListener("DOMContentLoaded", async function() {
    await fetchAllProductsInfo();
    displaySelectedProducts ();
});

var allProductsContainerArray = [];

async function fetchAllProductsInfo () {
    try {
        const response = await fetch(apiUrl);
        const responseJson = await response.json();
        allProductsContainerArray = responseJson.data;
    } catch (error) {
    }
}

function getShoppingCart () {
    var productsInCartJson = localStorage.getItem("shoppingCart");
    if (productsInCartJson == null || productsInCartJson == undefined || productsInCartJson == "") {
        return [];
    }
    return JSON.parse(productsInCartJson);
}

function saveShoppingCart (productsInCart) {
    localStorage.setItem("shoppingCart", JSON.stringify(productsInCart));
}

// ADDER TIL CART, vi henter cartet som finnes fra før, og det er tomt. om nei så lager vi en ny liste med innhod og legger til vårt produkt.

function addProductToCart (product) {
    console.log('ID: ' + product.id + ' Title: ' + product.title + ' Price: ' + product.price);
    var productsInCart = getShoppingCart();
    if (!Array.isArray(productsInCart) || !productsInCart.length) {
        var cartEntry = {productID: product.id, productCount: 1};
        var cart = [];
        cart.push(cartEntry);
        saveShoppingCart(cart);
        return; // Exit the function
    }
    for (var i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].productID == product.id) {
            productsInCart[i].productCount++;
            saveShoppingCart(productsInCart);
            return; // Exit the function
        }
    }
    var cartEntry = {productID: product.id, productCount: 1};
    productsInCart.push(cartEntry);
    saveShoppingCart(productsInCart);
}


// function displaySelectedProducts

function displaySelectedProducts() {
    var productsContainer = document.getElementById("products-container");
    productsContainer.replaceChildren();

    var productsToShow = allProductsContainerArray;
    // To Do:  apply filters like gender
    for (var i = 0; i < productsToShow.length; i++) {
        var product = productsToShow[i];
        var productContainer = displayProductInfo(product);
        productsContainer.appendChild(productContainer);
    }

}

// Show product info to page

function displayProductInfo (product) {
    var productContainer = document.createElement("div");
    console.log(product);
    var productImage = product.image;

    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", productImage.url);
    imgElement.setAttribute("alt", productImage.alt);
    productContainer.appendChild(imgElement);

    const headerElement = document.createElement("h2");
    const productTitleTextNode = document.createTextNode(product.title);
    headerElement.appendChild(productTitleTextNode);
    productContainer.appendChild(headerElement);

    const priceElement = document.createElement("p");
    const textNodePrice = document.createTextNode(product.price + " Nok ");
    priceElement.appendChild(textNodePrice);
    productContainer.appendChild(priceElement);

    const elementGender = document.createElement("p");
    const textNodeGender = document.createTextNode(product.gender);
    elementGender.appendChild(textNodeGender);
    productContainer.appendChild(elementGender);

    const elementDescription = document.createElement("p");
    const textNodeDescription = document.createTextNode(product.description);
    elementDescription.appendChild(textNodeDescription);
    productContainer.appendChild(elementDescription);

    const buttonElement = document.createElement("button");
    buttonElement.oneClick = () => {
        addProductToCart(product);
    };
    const textNodeButton = document.createTextNode("Add to cart");
    buttonElement.appendChild(textNodeButton);
    productContainer.appendChild(buttonElement);

    const buttonElementViewDetails = document.createElement("button");
    buttonElementViewDetails.onclick = () => {
        goToProductPage(product);
    };
    const textNodeButtonViewDetails = document.createTextNode("View details");
    buttonElementViewDetails.appendChild(textNodeButtonViewDetails);
    productContainer.appendChild(buttonElementViewDetails);

    return productContainer;
}


function goToProductPage(product) {
    console.log("Go to product page", product);
    window.location.href = "src/html/product.html?id=" + product.id;
}
