//DENNE FUNGERER, BRUK DENNE!!!!!!

const apiUrl = "https://v2.api.noroff.dev/rainy-days";

const outputElement = document.getElementById("product");

let productsContainerArray = [];

let apiData = null;

// function trykk () {
// console.log("trykket");
// }

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("her kommer json lobbyen");
        console.log(data);
        productsContainerArray = data;
        displayProducts();
    } catch (error) {
        console.log("An error occurred", error);
    }
}

fetch(apiUrl)
    .then(response => {
        // Check if the response is okay
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON data
    })

    .then(body=> {
        const productsContainer = document.getElementById("products-container");

        body.data.forEach(product => {
            var productImage = product.image;
            const newElement = document.createElement("img");
            newElement.setAttribute("src", productImage.url);
            newElement.setAttribute("alt", productImage.alt);

            const productDiv = document.createElement("div");
            productDiv.appendChild(newElement);
            const newElementH2 = document.createElement("h2");
            const textNodeTitle = document.createTextNode(product.title);
            newElementH2.appendChild(textNodeTitle);
            productDiv.appendChild(newElementH2);

            const newElementP = document.createElement("p");
            const textNodePrice = document.createTextNode(product.price +" Nok ");
            newElementP.appendChild(textNodePrice);
            productDiv.appendChild(newElementP);
            const newElementGender = document.createElement("p");
            const textNodeGender = document.createTextNode(product.gender);
            newElementGender.appendChild(textNodeGender);
            productDiv.appendChild(newElementGender);
//             // Dette er knappen for add to cart.
//             const newElementButton = document.createElement("button");
//             newElementButton.setAttribute("x-product-id", product.id);
// // Legger til funksjonalitet til knappen.
//             newElementButton.onclick = () => {

//                 addProductToCartOld(product.id, product.title, product.price);
//                 alert('New button clicked!');
//             };
//             const textNodeButton = document.createTextNode("OLD Add to chart" + product.title);
//             newElementButton.appendChild(textNodeButton);
//             productDiv.appendChild(newElementButton);

            // gjør at jeg får en ny div for hvert produkt.
            productsContainer.appendChild(productDiv);

            // Lager knapper
            addButton(productDiv, "Add to chart" + product.title, addProductToCart, product);
            addButton(productDiv, "View product", goToProductPage, product);
        });
    });

// her tilskriver jeg kanppen en funksjonalitet ish. eg. går til produktsiden.
function goToProductPage(product) {
    console.log("Go to product page", product);
    window.location.href = "src/html/product.html?id=" + product.id;
}
// Display the data in the console
function addButton (parentDiv, buttonText, onClickFunction, product) {
    const newElementButton = document.createElement("button");
    newElementButton.setAttribute("x-product-id", product.id);
    newElementButton.onclick = () => {
        onClickFunction(product);
    };
    const textNodeButton = document.createTextNode(buttonText);
    newElementButton.appendChild(textNodeButton);
    parentDiv.appendChild(newElementButton);
}
