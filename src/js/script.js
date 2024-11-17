const productContainer = document.querySelector(".products-container");
// console.log(productContainer);
const urlAPI = "https://v2.api.noroff.dev/rainy-days";

async function fetchAndDisplayProducts() {
    try {
        // Fetch data from the API
        const response = await fetch(urlAPI);
        const data = await response.json();
        // display the data in the console
        displayData(data);
}
    catch (error) {
        // console.error(error);
        // console.log("An error occurred");
    }
}
fetchAndDisplayProducts();
function displayData(data) {
    data.forEach((product) => {
        const productTemplate=`
        <div class="product">
                <div class="product-image">
                    <img src=${product.image.url} alt="">
                </div>
                <h2 class="product-name">${product.name}</h2>
                <div class="product-color">${product.color}</div>
                <div class="product-price">${product.price}</div>
            </div>`
            productContainer.insertAdjacentHTML("beforeend", productTemplate);
    });
}
