// return cart items
function getCartItems(){

    // get carts items from storage
    const cart_items = JSON.parse(localStorage.getItem("cartArray")) || [];

    const cartItems = localStorage.getItem("cart-items")

    // total amount
    let total = 0;

    // get total id
    const totalId = document.getElementById("total")
    totalId.innerHTML = "€ "

    // get card div
    const card = document.getElementById("checkout-button")

    // get div id of cart items
    const items = document.getElementById('cart-items')

    // cart number
    const cartNo = document.getElementById("cartNo")
    cartNo.innerHTML = cartItems;
    // if null display text
    if(cart_items.length == 0){
        items.innerHTML = "Cart is empty"
        // disbale checkout button
        card.disabled = true
    }else{
        for(i = 0; i<cart_items.length;i++){
            // item title
            const item_body = document.createElement('p');
            item_body.innerHTML += cart_items[i].title;

            // item price
            const item_price = document.createElement('span')
            item_price.className = "price"
            item_price.innerHTML = "€ " + cart_items[i].item_price;

            // append elements to items div
            item_body.appendChild(item_price)
            items.appendChild(item_body)

            // explicitly cast as a number otherwise NaN
            total = total + Number(cart_items[i].item_price)

        }

        totalId.innerHTML += total

        console.log(total)

    }
}