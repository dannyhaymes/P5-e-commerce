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
    console.log(product)
    //TODO Insert product image page, use document.querySelecter to get element holding the image, use .innerHTML to set the image (includes alt text)
    //TODO Insert description in similar way
    //TODO Insert price
    //TODO Insert color options use .innerHTML+=
}


//TODO milestone 7 Read information on PDF and ask Scott for help if needed on Slack