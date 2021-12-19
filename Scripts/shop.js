// get donations from storage or return empty array
const Donations = JSON.parse(localStorage.getItem("Donations")) || [];

// cart items
let cart = [];

// number of cart item
let cartNo;

// title id
let titleID = 0;
// price id
let priceID = 0;


function loadDonations(){

    // get the grid
    const donations = document.getElementById("grid");

    // if empty display message
    if(Donations.length == 0){
        // create border div
        const border = document.createElement('div')
        border.className = "border"
        border.style = "text-align:center"

        // create P tag
        const text = document.createElement("p")
        text.innerHTML = "There are no items for sale"
        text.style = "padding:3em 3em 3em 3em; font-size:24px"

        // create button
        const link = document.createElement("a")
        link.className = "secondary-bg "
        link.innerHTML = "List an item"
        link.href = "../pages/donate.html"
        link.style = "color: white; padding: 1em 1.75em 1em 1.75em;"




        donations.appendChild(border);
        border.appendChild(text)
        border.appendChild(link)
    }else{
        // otherwise loop through donation
        for(i=0; i<Donations.length; i++){


            // create a div & class it card
            const card = document.createElement('div')
            card.className = "card"

            //create img and class it
            const image = document.createElement("img");
            image.className = "card-img-top";
            image.src = "../img/earth.png"

            // append to card div
            card.appendChild(image)

            // create card-body div
            const card_body = document.createElement('div');
            card_body.className = "card-body"

            // heading section
            const heading_section = document.createElement('div')
            heading_section.className = "heading-section"

            const heading = document.createElement('h5');
            heading.setAttribute("titleID", titleID)
            heading.className = "card-title"
            heading.innerHTML = Donations[i].title;

            // type
            var item_type = document.createElement('span')
            if(Donations[i].list_type == 'donation'){
                item_type.className = "donation-type list-type"
                item_type.innerHTML = "Donation"
            }
            else{
                item_type.innerHTML = "Upcycled"
                item_type.className = "upcycled-type list-type"
            }

            const paragraph = document.createElement('p')
            paragraph.setAttribute("priceID", priceID);
            paragraph.className = "card-text"
            paragraph.innerHTML = "€ "+Donations[i].item_price


            const button = document.createElement('button')
            // button.id = itemID;
            button.setAttribute("id",Donations[i].itemID)

                button.className = "secondary-bg cart_button selling_button"
                button.innerHTML = "Add to cart"
                button.setAttribute("onclick","addToCart(id)");


            titleID++
            priceID++



            // append to card_body
            card_body.appendChild(heading_section)
            heading_section.appendChild(heading)
            heading_section.appendChild(item_type)
            card_body.appendChild(paragraph)
            card_body.appendChild(button)
            card.appendChild(card_body)
            donations.appendChild(card);

        }
    }



    console.log("Loading....")
}


// add to cart
function addToCart(id){

    let cartItem;

    var number = localStorage.getItem("cart-items") || 0;
    cartNo = number

    // if > 0, increment
    if(cartNo > 0){
        cartNo++
    }else{
        cartNo = 1
    }
    // set new number
    localStorage.setItem("cart-items", cartNo)
    // console.log("Added to cart", id)
    // set new value
    document.getElementById("cartNo").innerHTML = cartNo

    // search through DOnations to find the item that needs to be added to cart

    for(i=0; i<Donations.length; i++){
        if(Donations[i].itemID == id){
            cartItem = Donations[i];
        }
    }

    // store cart array in local storage

    // get old array if available, other wise empty array
    var oldCart = JSON.parse(localStorage.getItem("cartArray")) || [];

    // add new item to cart
    oldCart.push(cartItem)

    // set new loacl storage to updated oldCart
    localStorage.setItem("cartArray", JSON.stringify(oldCart))

    // add cart array to html
    addToCartHTML();

}


function addToCartHTML(){

    cart = JSON.parse(localStorage.getItem("cartArray")) || [];

    // cart container
    const container = document.getElementById("cart-items");

    // create checkout button
    const checkout = document.getElementById("checkout")

    //total
    const total = document.getElementById("total_cost");
    total.innerHTML = "€"

    // total int
    let total_price = 0;

    // clear container to stop duplication
    container.innerHTML = ''

    // clear checkout to stop duplication
    checkout.innerHTML = ''


    if(cart.length == 0){
        container.innerHTML = "Cart is empty"
        container.style = "padding-bottom:15px; padding-top:15px"
        total.innerHTML += 0.00
    }else{
        // loop through array
        for(i = 0; i<cart.length; i++){
            const row = document.createElement('div')
            row.className = "row"

            container.appendChild(row)

            // set total price
            total_price = total_price + Number(cart[i].item_price);
            console.log(total_price)

            // col div
            const col1 = document.createElement('div')
            col1.className = "col-sm-2"

            // col div
            const col2 = document.createElement('div')
            col2.className = "col-sm-6"

            // col div
            const col3 = document.createElement('div')
            col3.className = "col-sm-4"

            // create image
            const image = document.createElement("img")
            image.width = 80;
            image.src = "../img/earth.png"


            col1.appendChild(image)

            // title
            const title = document.createElement("h6")
            title.innerHTML = cart[i].title

            const price = document.createElement("p")
            price.innerHTML = "€ " + cart[i].item_price

            // append to row 2
            col2.appendChild(title)
            col2.appendChild(price)

            // remove button
            const button = document.createElement("button")
            button.className = ""
            button.innerHTML = "Remove"
            button.style = "background-color:red;color:white; font-weight:bold"
            button.onclick = function remove(){
                // remove from cart array
                cart.splice(cart[i],1)

                // set new array
                localStorage.setItem("cartArray", JSON.stringify(cart))

                // minus from cart number
                let number = localStorage.getItem("cart-items")

                console.log(number)

                number--

                console.log(number)


                localStorage.setItem("cart-items",number)

                location.reload()

            }

            col3.appendChild(button)

            // append to row
            row.appendChild(col1)
            row.appendChild(col2)
            row.appendChild(col3)

        }

        total.innerHTML += total_price



        // create div for checkout
        const div = document.createElement('div')
        div.className = "col-sm-12"

        // create checkout button
        const checkoutButton = document.createElement('button')
        checkoutButton.className = "secondary-bg"
        checkoutButton.style = "width:95%;"
        checkoutButton.innerHTML = "Checkout"
        checkoutButton.onclick = function goToCheckout(){
            location.href = '../pages/checkout.html'
        }

        // append button to div
        div.appendChild(checkoutButton)

        // append div to checkout
        checkout.appendChild(div)
    }


}