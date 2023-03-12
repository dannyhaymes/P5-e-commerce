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
    if (cart === null) {
        cart = [];
    }

    const cartItemFound = cart.find(item => item.id === id && item.color === color)


    if (cartItemFound) {
        console.log("itemFound")
        cartItemFound.quantity += parseInt(quantity)
    } else {
        console.log("itemNotFound")
        cart.push({ id: id, color: color, quantity: parseInt(quantity) });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

}

