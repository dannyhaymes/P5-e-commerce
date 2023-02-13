fetch('http://localhost:3000/api/products')
    .then(data => {
        return data.json();
    })
    .then(products => {
        displayProducts(products)
    });

function displayProducts(products) {
    const productCardHolder = document.getElementById("items")
    for (let i = 0; i < products.length; i++) {
        const product = products[i]
        const productCard = `           <a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
      </a>`
        productCardHolder.innerHTML += productCard
        console.log(productCard)

    }
}