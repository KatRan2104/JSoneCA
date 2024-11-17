document.addEventListener("DOMContentLoaded", async function() {
    await fetchAllProductsInfo();
    showCart();
    showTotalPrice();
});

var allProductsContainerArray = [];

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

// Remove from cart function
function removeProductFromCart (productID) {
    var productsInCart = getShoppingCart();
    if (!Array.isArray(productsInCart) || !productsInCart.length) {
        return; // Exit the function
    }
    var filteredArray = productsInCart.filter(e => e.productID !== productID);
    saveShoppingCart(filteredArray);
}


function showCart () {
    var productsInCartElement = document.getElementById("products-in-cart");

    var shoppingCartContent = getShoppingCart();
    for (var i = 0; i < shoppingCartContent.length; i++) {
        console.log(shoppingCartContent[i]);
        var cartItemNode = createCartItemNode(shoppingCartContent[i]);
        productsInCartElement.appendChild(cartItemNode);
    }
}

function createCartItemNode (cartItem) {
    var currentProduct = undefined;
    console.log("All products container array contains:");
    console.log(allProductsContainerArray);
    for (var i = 0; i < allProductsContainerArray.length; i++) {
        console.log("Checking if product with id" + cartItem.productID + " is the same as" + allProductsContainerArray[i].id);
        if (allProductsContainerArray[i].id == cartItem.productID) {
            currentProduct = allProductsContainerArray[i];
            break;
        }
    }
    if (currentProduct == undefined) {
        console.log("Product not found in all products container array"+ cartItem.productID);
        return document.createElement("div");
    }

    var newElementDiv = document.createElement("div");
    var productNameHeading = document.createElement("h3");
    var textNodeProductHeading = document.createTextNode("Product name");
    productNameHeading.appendChild(textNodeProductHeading);
    newElementDiv.appendChild(productNameHeading);
    var newElementProductName = document.createElement("p");
    var textNodeProductName = document.createTextNode(currentProduct.title);
    newElementProductName.appendChild(textNodeProductName);
    newElementDiv.appendChild(newElementProductName);
    var productUnitPriceHeadning= document.createElement("h3");
    var textNodeProductUnitPriceHeading = document.createTextNode("Unit price");
    productUnitPriceHeadning.appendChild(textNodeProductUnitPriceHeading);
    newElementDiv.appendChild(productUnitPriceHeadning);
    var unitPriceContent = document.createElement("p");
    var textNodeUnitPriceContent = document.createTextNode(currentProduct.price);
    unitPriceContent.appendChild(textNodeUnitPriceContent);
    newElementDiv.appendChild(unitPriceContent);
    var showCountOfProducts = document.createElement("p");
    var textNodeShowCountOfProducts = document.createTextNode("Count: " + cartItem.productCount);
    showCountOfProducts.appendChild(textNodeShowCountOfProducts);
    newElementDiv.appendChild(showCountOfProducts);

    //Make remove button
    var newElementButton = document.createElement("button");
    newElementButton.onclick = () => {
        removeProductFromCart(cartItem.productID);
        location.reload();
    };
    const textNodeButton = document.createTextNode("Remove from cart");
    newElementButton.appendChild(textNodeButton);
    newElementDiv.appendChild(newElementButton);
    return newElementDiv;
}

// Summary of price
function calculateTotalPrice () {
    var totalPrice = 0;
    var productsInCart = getShoppingCart();
    if (!Array.isArray(productsInCart) || !productsInCart.length) {
        return totalPrice; // Exit the function
    }
    for (var i = 0; i < productsInCart.length; i++) {
        for (var j = 0; j < allProductsContainerArray.length; j++) {
            if (productsInCart[i].productID == allProductsContainerArray[j].id) {
                totalPrice += allProductsContainerArray[j].price * productsInCart[i].productCount;
                break;
            }
        }
    }
    return totalPrice;
}

function showTotalPrice () {
    var totalPriceElement = document.getElementById("total-price");
    var totalPrice = calculateTotalPrice();
    var totalPriceTextNode = document.createTextNode("Total price: " + totalPrice + " NOK " );
    totalPriceElement.appendChild(totalPriceTextNode);
}

async function fetchAllProductsInfo () {
    try {
        const response = await fetch(apiUrl);
        const responseJson = await response.json();
        allProductsContainerArray = responseJson.data;
    } catch (error) {
    }
}


