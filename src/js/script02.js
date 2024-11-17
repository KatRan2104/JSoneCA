const apiUrl = "https://v2.api.noroff.dev/rainy-days";

const outputElement = document.getElementById("product");

let productsContainerArray = [];

let apiData = null;


// Fetch the data from API
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log(data);
        productsContainerArray = data;
        displayProducts();
    } catch (error) {
        // console.log("An error occurred", error);
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
    .then(data => {

        // fjerner jeg denne biten så blir all dataen borte.
        // console.log(data);
        document.getElementById("product").innerHTML = JSON.stringify(data, null, 2);
        // console.log(data);
        //
    })
    .catch(error => {
        // console.error('Fetch error:', error); // Handle any errors
    return APIdata;
});

// Display the data in the console
const displayProducts = {
    title: "Product",
    baseColor: "white",
    size: "large",
};

const jasonString = JSON.stringify(displayProducts);
// console.log(jasonString);

const object = JSON.parse(jasonString);
// console.log(object);

