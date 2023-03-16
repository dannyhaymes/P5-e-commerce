//Backend DO NOT DELETE
fetch('http://localhost:3000/api/products')
    .then(data => {
        return data.json();
    })
    .then(products => {
        addEventListenerToContactForm()
        displayCart(products)
    });


function getStoredCartItems() {
    return JSON.parse(localStorage.getItem("cart")) || []
}
function saveCartItemsToStorage(items) {
    localStorage.setItem('cart', JSON.stringify(items))
}

//Show selected product and product details in the cart
function displayCart(products) {
    let cart = getStoredCartItems()
    if (cart === null) {
        cart = [];
    }
    const cartItemsContainer = document.querySelector("#cart__items");
    // Clear out the items so we can re-render nicely
    cartItemsContainer.innerHTML = ""
    let updatedProducts = []
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        //NOTE Find cart item that matches product id
        const cartItemFound = cart.find(checkItemFound)
        function checkItemFound(item) {
            return item.id === product._id;
        }
        if (!cartItemFound) {
            continue
        }
        //NOTE Update product with quantity and color
        product.quantity = cartItemFound.quantity
        product.selectiveColor = cartItemFound.color
        //NOTE Append product to the result
        renderCartItem(cartItemsContainer, product)
        updatedProducts.push(product)


    }
    setupEvents(products)
    const pricingValues = updatedProducts.map(product => {
        return {
            quantity: product.quantity,
            price: product.price
        }
    })
    updateCartTotals(pricingValues)


}
function renderCartItem(container, product) {
    container.innerHTML +=
        `<article class="cart__item" data-id="${product._id}" data-color="${product.selectiveColor}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.selectiveColor}</p>
        <p>€<span class="cart__item__price">${product.price}</span></p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Quantity : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Delete</p>
        </div>
      </div>
    </div>
  </article>`
}


function handleQuantityChange(productId, newQuantity) {
    // Update local storage
    const storedCart = getStoredCartItems()

    // Go through all cart items in storage and if it matches
    // the product, update the quantity
    const updatedCart = storedCart.map(item => {
        if (item.id === productId) {
            item.quantity = newQuantity
        }
        return item
    })

    // Store back into local storage again
    saveCartItemsToStorage(updatedCart)
    // recalculate total

    const items = getCartItemsElements()
    // array of quanitites and prices[{quantity, price}]
    let result = []
    items.forEach(item => {
        // find the quantity input
        // find the price value
        const input = item.querySelector('input')
        const price = item.querySelector('.cart__item__price')
        result.push({
            quantity: parseInt(input.value) || 0,
            price: parseInt(price.textContent) || 0,
        })
    })
    updateCartTotals(result)

}

function getCartItemsElements() {
    return document.querySelectorAll('.cart__item');
}

//Delete items from cart
function handleDeleteCartItem(productId, allProducts) {
    const storedCart = getStoredCartItems()
    const updatedCart = storedCart.filter(item => item.id !== productId)
    saveCartItemsToStorage(updatedCart)
    displayCart(allProducts)

}
// Listen for quanity updates for item
function setupEvents(products) {
    // Get all cart items on the page
    const allCartItemElements = getCartItemsElements()
    allCartItemElements.forEach(element => {
        // Find delete button for this item
        const deleteButton = element.querySelector('.cart__item__content__settings__delete')
        // On delete call a function that does the work
        deleteButton.addEventListener('click', (e) => {
            const id = element.getAttribute('data-id')
            handleDeleteCartItem(id, products)
        })

        // Find the input for the cart item
        const input = element.querySelector('input.itemQuantity')
        // Add a change listener so we can update local storage and re-render
        input.addEventListener('change', (event) => {
            const id = element.getAttribute('data-id')
            // Get the new input value and parse it to a number
            const newQuantity = parseInt(event.target.value)
            // Handle change
            handleQuantityChange(id, newQuantity)
        })
    })
}


// When we receive our product or when a user updates a quantity
// Re evaluate the price. (quantity * itemPrice)
// array of values [{price, quantity}]
function updateCartTotals(values) {
    let total = 0
    let articles = 0
    //Itterate over all products
    //Each product multiply productxquantity
    //Increase the total
    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        articles += value.quantity
        total += value.price * value.quantity
    }
    const totalElement = document.querySelector("#totalPrice")
    const totalArticlesElement = document.querySelector('#totalQuantity')
    totalElement.textContent = total
    totalArticlesElement.textContent = articles
}

function addEventListenerToContactForm() {
    //TODO add change event listeners to for input field
    document.getElementById('firstName').addEventListener("change", validateFirstName);
    document.getElementById('lastName').addEventListener("change", validateLastName);
    document.getElementById('address').addEventListener("change", validateAddress);
    document.getElementById('city').addEventListener("change", validateCity);
    document.getElementById('email').addEventListener("change", validateEmail);
    // input.addEventListener("change",(contactCity) => {
    //     const contactCity = document.getElementById('city').value
    // })
    // input.addEventListener("change",(contactAddress) => {
    //     const contactAddress =document.getElementById('address').value
    // })
    // input.addEventListener("change",(contactEmail) => {
    //     const contactEmail =document.getElementById('email').value
    // })
    //NOTE Add event listener to order button that calls order function (Click event listener)
}
function validateFirstName($event) {
    const changedElement=$event.target;
    const alphaOnlyRegex= /^[a-zA-Z]+$/
    const isValid=alphaOnlyRegex.test(changedElement.value)
    const errorMessageElement=document.getElementById('firstNameErrorMsg')
    if (!isValid){
    errorMessageElement.innerText="Enter valid input"
    }
    //TODO Validate first name using regex let res = /^[a-zA-Z]+$/.test('sfjd');
} 
function validateLastName($event) {
    const changedElement=$event.target;
    const alphaOnlyRegex= /^[a-zA-Z]+$/
    const isValid=alphaOnlyRegex.test(changedElement.value)
    const errorMessageElement=document.getElementById('lastNameErrorMsg')
    if (!isValid){
        errorMessageElement.innerText="Enter valid input"
        }
}
function validateAddress($event) {
    const changedElement=$event.target;
    const regex= /^[A-Za-z-0-9]+$/
    const isValid=regex.test(changedElement.value)
    const errorMessageElement=document.getElementById('addressErrorMsg')
    if (!isValid){
        errorMessageElement.innerText="Enter valid input"
        }
}
function validateCity($event) {
    const changedElement=$event.target;
    const AlphaNumRegex= /^[A-Za-z-0-9]+$/
    const isValid=AlphaNumRegex.test(changedElement.value)
    const errorMessageElement=document.getElementById('cityErrorMsg')
    if (!isValid){
        errorMessageElement.innerText="Enter valid input"
        }    
}
function validateEmail($event) {
    const changedElement=$event.target;
    const specialCharacterRegex= /\S+@\S+\.\S+/
    const isValid=specialCharacterRegexest(changedElement.value)
    const errorMessageElement=document.getElementById('emailErrorMsg')
    if (!isValid){
        errorMessageElement.innerText="Enter valid input"
        }
}

//TODO Declare order function
//NOTE Inside this fuction validate fields one last time
//NOTE Use fetch API to post order request
//NOTE Redirect user to confirmation page with order ID that comes back from previous fetch API