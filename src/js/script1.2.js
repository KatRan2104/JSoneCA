const productsContainer = document.querySelector(".products-container");
console.log(productsContainer);
const urlAPI ="https://v2.api.noroff.dev/rainy-days";

async function fetchAndDisplayData() {
    try {
        //Fetch data
        const response = await fetch(API);
        const data = await response.json();
        console.log(data);
        //Display data
        displayData(data);
        console.log(data);
    }
    catch (err) {
        console.log("An error occurred", err);
        }
    }

    fetchAndDisplayData();
    productTamplate();
    function dispayData(data) {
        data.forEach(product=>{
            const productTamplate=` <div class="product">
                    <div class="product-img">
                        <img src=${product.image} alt="">
                        <h3 class="product-name">${product.title}</h3>
                        <div class="product-information">
                            <p>${product.price}</p>
                            <a href="src/html/product.html">${product.description}</a>
                        </div>
                    </div>
                </div>`;
                productsContainer.insertAdjacentHTML("beforeend", productTamplate);
        })
}
