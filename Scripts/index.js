
// get number of items in the cart from local storage. if its not found assign 0
let items = localStorage.getItem("cart-items") || 0

// display in navbar cart
function displayCartItems(){
    // assign inner html tp items
    document.getElementById("cartNo").innerHTML = items
}