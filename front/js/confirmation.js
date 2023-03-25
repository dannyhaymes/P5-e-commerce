const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get('orderId')
console.log(orderId);

// Insert order ID inserted to page
document.getElementById('orderId').innerText = orderId