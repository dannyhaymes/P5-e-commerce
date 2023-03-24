const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get('orderId')
console.log(orderId);

//TODO Insert order ID into page