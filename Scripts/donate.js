const donations = [];
const selling = localStorage.getItem("selling")

// object size
let item_size;

// object price
let item_price;

// list type is donation by default
let list_type = 'donation'

// set itemID
let itemID;

// Donation
function submitDonation(){


    // incerement id

    // get id from storage
    var id = localStorage.getItem("itemid") || 0
    itemID = id
    itemID++

    console.log("ID", id)

    // set as new Id
    localStorage.setItem("itemid", itemID)

    console.log("Price",item_price)
    console.log("Size",item_size)

    // title
    const title = document.getElementById("titleInput").value;

    if(title == '' ){
        document.getElementById("titleError").innerHTML = "<br>This field cannot be empty";

    }

    // color
    const color = document.getElementById("colorInput").value;

    if(color == ''){
        document.getElementById("colorError").innerHTML = "<br>This field cannot be empty";

    }

    // material
    let material_choice = document.getElementById("material-choice");
    const material = material_choice.options[material_choice.selectedIndex].value;

    if(material == 'Select material'){
        document.getElementById("materialError").innerHTML = "<br>This field cannot be empty";

    }
    // type
    let furniture_type = document.getElementById("material-choice");
    const type = furniture_type.options[furniture_type.selectedIndex].value;

    if(type == 'Select material'){
        document.getElementById("typeError").innerHTML = "This field cannot be empty";

    }
    // description
    const description = document.getElementById("description").value;

    if(description == ''){
        document.getElementById("descriptionError").innerHTML = "This field cannot be empty";

    }

    // price
    const sale = document.getElementById("sale").innerHTML

    // if sale element is null then set price to 0
    /** if its not null then someone is selling an item so get the value of price */
    if(sale != ''){
        item_price = document.getElementById("price").value;
    }

    // only generate error if sale is not null and price is null
    if(sale != '' && item_price == ''){
        document.getElementById("priceError").innerHTML = "This field cannot be empty";

    }

    // if size is null through an error
    if(item_size == ''){
        document.getElementById("sizeError").innerHTML = "You must choose a size";
    }

    // create donation object
    let donation = {
         itemID, title, color, material, type, description, item_price, item_size, list_type
    }

    if(donation.title == '' || donation.color == '' || donation.material == '' || donation.type == '' || donation.description == '')
            return false;


            // Push to Array
        donations.push(donation);



        // get old items from storage
        var oldItem = JSON.parse(localStorage.getItem("Donations")) || [];

        // add new item to old items
        oldItem.push(donation);

        //set new local storage to updated old items
        localStorage.setItem("Donations", JSON.stringify(oldItem));


        // window.location.replace("shop.html");


        // dont refresh
        return false


}

function checkToggle(){
    var checkToggle = document.getElementById('toggle').checked;

    // grab price div
    const price = document.getElementById("sale")

    localStorage.setItem("selling", checkToggle)

    if(checkToggle){
        // set list type to sale if true
        list_type = 'sale'

       document.getElementById('toggleMessage').innerHTML = "<br>You can now set a price for you object below."


       price.className = "border"

        // set heading
        const heading = document.createElement('h2')
        heading.className = "secondary-txt"
        heading.innerHTML = "Set price"

        // set text
        const paragraph = document.createElement("p")
        paragraph.innerHTML = "Please set a price for your item"

        // allow for input of price
       const input = document.createElement("input")
       input.type = "number"
       input.id = "price"

        //    append to price
        price.appendChild(heading)
        price.appendChild(paragraph)
        price.appendChild(input)

    }else{
        list_type = 'donation'
        document.getElementById('toggleMessage').innerHTML = ""

        price.innerHTML = ""
        price.className = ""
    }

    // console.log(checkToggle)

    return false
}



function checkSmall(){

    // check if small is true or false
    const value = document.getElementById("small-size").checked;

    // grab medium input
    const enabled_medium = document.getElementById("medium-size")

    // grab large input
    const enabled_large = document.getElementById("large-size")



    // disable or enable medium & large input based on value
    if(value){
        item_size = 's';
        item_price = 25;
        enabled_medium.disabled = true;
        enabled_large.disabled = true;

    }else{
        item_size = ''
        item_price = 0;
        enabled_medium.disabled = false;
        enabled_large.disabled = false;
    }

    console.log(value)
    console.log(this.size);
    console.log(this.price);


}


function checkMedium(){

    // check if medium is true or false
    const value = document.getElementById("medium-size").checked;

    // grab small input
    const enabled_small = document.getElementById("small-size")

    // grab large input
    const enabled_large = document.getElementById("large-size")

    // disable or enable medium & large input based on value
    if(value){
        item_size = 'm'
        item_price = 50;
        enabled_small.disabled = true;
        enabled_large.disabled = true;

    }else{
        item_size = ''
        item_price = 0;
        enabled_small.disabled = false;
        enabled_large.disabled = false;
    }

}

function checkLarge(){

    // check if small is true or false
    const value = document.getElementById("large-size").checked;

    // grab medium input
    const enabled_medium = document.getElementById("medium-size")

    // grab small input
    const enabled_small = document.getElementById("small-size")

    // disable or enable medium & large input based on value
    if(value){
        item_size = 'l'
        item_price = 75;
        enabled_medium.disabled = true;
        enabled_small.disabled = false;

    }else{
        item_size = ''
        item_price = 0;
        enabled_medium.disabled = false;
        enabled_small.disabled = false;
    }

}
