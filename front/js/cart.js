fetch('http://localhost:3000/api/products')
    .then(data => {
        return data.json();
    })
    .then(product => {
        displayProduct(product)
    });

//TODO Get the products from backend (localhost)
//TODO create function to display cart items with products perameter
//NOTE Get cart from local storage
//TODO Use for loop to itterate through cart
//TODO Insert cart item card for current cart item on the page
//NOTE Update page totals for current cart item