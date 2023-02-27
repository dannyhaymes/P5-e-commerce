const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
console.log(id);

fetch(`http://localhost:3000/api/products/${id}`)
    .then(data => {
        return data.json();
    })
    .then(product => {
        displayProduct(product)
    });

function displayProduct(product) {
    document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.getElementById("title").innerText = `${product.name}`;
    document.getElementById("price").innerText = `${product.price}`;
    document.getElementById("description").innerText = `${product.description}`;
    const selectElement = document.getElementById(`colors`);
    for (let color of product.colors) {
        selectElement.innerHTML += `<option value=${color}>${color}</option>`;
    }
    console.log(product)
}

document.getElementById("addToCart").addEventListener("click", addToCart);
function addToCart() {
    const quantity = document.getElementById("quantity").value;
    const color = document.getElementById("colors").value;
    let cart = JSON.parse(localStorage.getItem("cart"));

    cart.push({id: 415b7cacb65d43b2b5c1ff70f3393ad1, color: Black/Red, quantity: 1});

    if (cart === null) {
        cart = [];
        console.log("Cart is empty")
    } else {

    }
    console.log(cart)
    //TODO check to see if cart array already has an item with the same color and id
    //TODO if it does then increase its quantity with the quantity the user selected
    //TODO if it does not then push a new cart item on to the array

    //NOTE cart item looks like this object { id: productId, quantity: quantity, color: color }
    //TODO set cart array back into local storage
    //NOTE Use JSON.stringify(...)




    // if (localStorage) {
    //     localStorage.setItem("addToCart");
    //     alert("Added to Cart" + localStorage.getItem("addToCart"))
    // }
}

//TODO milestone 7 Read information on PDF and ask Scott for help if needed on Slack
