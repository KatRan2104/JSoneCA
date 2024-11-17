//DENNE FUNGERER BRUK DENNE!!!!!!

const apiUrl = "https://v2.api.noroff.dev/rainy-days";

const outputElement = document.getElementById("product");

let productsContainerArray = [];

let apiData = null;

function trykk () {
    console.log("trykket");
}

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


// function etterpaa(hvasomhelst) {
//     if (!hvasomhelst.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return hvasomhelst.json(); // Parse the JSON data
// }

fetch(apiUrl)
    .then(response => {
        // Check if the response is okay
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON data
    })
    // .then(etterpaa)
    // .then(response => etterpaa(response))
    .then(body=> {

        // Denne trenger jeg ikke legner egentlig. tidligere kommentar: fjerner jeg denne biten så blir all dataen borte - .
        // console.log(body);
        // document.getElementById("product").innerHTML = JSON.stringify(body, null, 2);
        // console.log(body.data[0])
        // var firstItem = body.data[0];
        // console.log(firstItem.title);
        // console.log(firstItem.sizes[2])
        // console.log(body.data[0].sizes[2]);
        // var firstImage = body.data[0].image;
        // console.log(firstImage);
        // var imageElementContent = `<img src="${firstImage.url}" alt="${firstImage.alt}">`;
        // console.log(imageElementContent);

        // denne hører til linje 66-69.
        // document.getElementById("product").innerHTML = "";

        // her legger jeg inn nye div og det som er i product-containeren i html.

        const productsContainer = document.getElementById("products-container");

        body.data.forEach(product => {
            var productImage = product.image;
            // var imageElementContent = `<img src="${productImage.url}" alt="${productImage.alt}">`;
            // console.log(imageElementContent);
            // document.getElementById("product").innerHTML += imageElementContent;
            // document.getElementById("product").innerHTML += `<h2>${product.title}</h2>`;
            // document.getElementById("product").innerHTML += `<p>${product.description}</p>`;
            const newElement = document.createElement("img");
            newElement.setAttribute("src", productImage.url);
            newElement.setAttribute("alt", productImage.alt);

            // const newContent = document.createE(imageElementContent);
            // newElement.appendChild(newContent);
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

            const newElementButton = document.createElement("button");
            newElementButton.setAttribute("x-product-id", product.id);



// Legger til funksjonalitet til knappen.
            newElementButton.onclick = () => {

                addProductToCart(product.id, product.title, product.price);
                alert('New button clicked!');
            };
            const textNodeButton = document.createTextNode("Add to chart" + product.title);
            newElementButton.appendChild(textNodeButton);
            productDiv.appendChild(newElementButton);

            // gjør at jeg får en ny div for hvert produkt.
            productsContainer.appendChild(productDiv);

        });
    });

// Display the data in the console
