// Product Data

let nestedJsonData = `[
    {
       "id": 1,
       "image": {
            "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
            "mobile": "./assets/images/image-waffle-mobile.jpg",
            "tablet": "./assets/images/image-waffle-tablet.jpg",
            "desktop": "./assets/images/image-waffle-desktop.jpg"
       },
       "name": "Waffle with Berries",
       "category": "Waffle",
       "price": 6.50
    },
    {
        "id": 2,
        "image": {
            "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00
     },
     {
        "id": 3,
        "image": {
            "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
            "mobile": "./assets/images/image-macaron-mobile.jpg",
            "tablet": "./assets/images/image-macaron-tablet.jpg",
            "desktop": "./assets/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00
     },
     {
        "id": 4,
        "image": {
            "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "./assets/images/image-tiramisu-mobile.jpg",
            "tablet": "./assets/images/image-tiramisu-tablet.jpg",
            "desktop": "./assets/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50
     },
     {
        "id": 5,
        "image": {
            "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
            "mobile": "./assets/images/image-baklava-mobile.jpg",
            "tablet": "./assets/images/image-baklava-tablet.jpg",
            "desktop": "./assets/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00
     },
     {
        "id": 6,
        "image": {
            "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
            "mobile": "./assets/images/image-meringue-mobile.jpg",
            "tablet": "./assets/images/image-meringue-tablet.jpg",
            "desktop": "./assets/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00
     },
     {
        "id": 7,
        "image": {
            "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
            "mobile": "./assets/images/image-cake-mobile.jpg",
            "tablet": "./assets/images/image-cake-tablet.jpg",
            "desktop": "./assets/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50
     },
     {
        "id": 8,
        "image": {
            "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
            "mobile": "./assets/images/image-brownie-mobile.jpg",
            "tablet": "./assets/images/image-brownie-tablet.jpg",
            "desktop": "./assets/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50
     },
     {
        "id": 9,
        "image": {
            "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50
     }
]`;

// Insert product data into list of products in HTML

let productItemsData = JSON.parse(nestedJsonData);
let cart = JSON.parse(localStorage.getItem("data")) || [];
let cartCheckout = document.getElementById('cartCheckout');
let checkoutTotal = document.getElementById('checkoutTotal');

function generateProductData() {
    return (document.getElementById('product-list').innerHTML = productItemsData.map((x) => {
        let {id, image, category, name, price} = x;
        let search = cart.find((x)=> x.id === id) || [];
        let productContent = `
        <div id=product${id} class="product-details">
            <img id="productImage${id}" src="${image.desktop}" alt="Waffle with Berries">
            <button id="productButton${id}" class="add-to-cart-btn">
              <div class="buttons">
                <img onclick="decrement(${id})" src="assets/images/icon-decrement-quantity.svg" class="minus"></img>
                <div id="quantity${id}" class="quantity">
                ${search.quantity === undefined? 0: search.quantity}
                </div>
                <img onclick="increment(${id}), applyStyle(${id})" src="assets/images/icon-increment-quantity.svg" class="plus"></img>
              </div>
            </button>
            <p class="dessert-cat">${category}</p>
            <p class="dessert-name">${name}</p>
            <p class="dessert-price">$${price.toFixed(2)}</p>
        </div>`;
        applyStyle(id); // Add a border around the image of selected items
        return productContent;
    }).join(""))
}

generateProductData();

// Reference localStorage to style selected items

let styledImgs = JSON.parse(localStorage.getItem("styledButtons")) || [];
styledImgs.map((x) => {
    let img = document.getElementById(`productImage${x}`);
    img.style.border = '2px solid hsl(14, 86%, 42%)';
}); 

let increment = (id)=>{
    let selectedItem = id;
    let search = cart.find((x) => x.id === selectedItem);

    if (search === undefined) {
        cart.push({
            id: selectedItem,
            quantity: 1
        });
        applyStyle(id);
    } else {
        search.quantity += 1;
    }
    
    generateCartItems();
    checkout();
    update(selectedItem);
    localStorage.setItem("data", JSON.stringify(cart));
};
let decrement = (id)=>{
    let selectedItem = id;
    let search = cart.find((x) => x.id === selectedItem);

    if (search === undefined) return;
    if (search.quantity === 0) { 
        return;
    } else {
        search.quantity -= 1;
        if (search.quantity === 0) {removeStyle(id)};
    }
    
    update(selectedItem);
    cart = cart.filter((x)=>x.quantity !== 0);
    generateCartItems();
    checkout();
    localStorage.setItem("data", JSON.stringify(cart));
};
let update = (id)=>{
    let search = cart.find((x) => x.id === id);
    document.getElementById(`quantity${id}`).innerHTML = search.quantity;
    calculation();
};

let calculation =()=>{
    let cartAmount = document.getElementById('cartAmount');
    cartAmount.innerHTML = cart.map((x)=> x.quantity).reduce((x, y)=> x+y, 0);
}

calculation();

let generateCartItems = () => {
    if (cart.length !== 0) {
        return (cartCheckout.innerHTML = cart
            .map((x)=> {
                let {id, quantity} = x;
                let search = productItemsData.find((y)=>y.id === id) || []; 
                let totalPrice = x.quantity * search.price;
                return `
                <div class="item">
                  <div class="name">
                    <strong>${search.name}</strong>
                  </div>
                  <div class="details">
                    <div class="quantity">
                      <span>${quantity}X</span>
                    </div>
                    <div class="price">
                      @ ${search.price.toFixed(2)}
                    </div>
                    <div class="total-price">
                    $${totalPrice.toFixed(2)}
                    </div>
                    <img class="remove-item" onclick="removeItem(${id})" src="assets/images/icon-remove-item.svg"/>
                  </div>
                </div>
                `;
            })
            .join(""));
    } else {
        cartCheckout.innerHTML = `
        <div class="cart-content">
          <img src="assets/images/illustration-empty-cart.svg" alt="">
          <p>Your added items will appear here</p>
        </div>`;
    }
}

generateCartItems();

let removeItem = (id)=> { // Remove clicked item from checkout
    let selectedItem = cart.find((x)=> x.id === id);
    selectedItem.quantity = 0;
    document.getElementById(`quantity${id}`).innerHTML = selectedItem.quantity;
    removeStyle(id);
    calculation();
    cart = cart.filter((x)=> x.id !== id);
    
    generateCartItems();
    checkout();
    localStorage.setItem("data", JSON.stringify(cart));
}

function checkout() {
    generateCartItems();
    if (cart.length !== 0) { 
        let totalPrices = cart.map((x) => {
            let {id, quantity} = x;
            let search = productItemsData.find((y)=>y.id === id) || [];
            return search.price * quantity;
        })
        let total = totalPrices.reduce((acc, totalPrice) => acc + totalPrice, 0);
        
        return checkoutTotal.innerHTML = `
        <div class="order-total-div">
          <p>Order Total</p>
          <p class="order-total" id="orderTotal"><strong>$${total.toFixed(2)}</strong></p>
        </div>
        <div class="confirm-order">
            <div class="carbon-neutral-div">
            <img src="assets/images/icon-carbon-neutral.svg"></img>
            This is a <strong>carbon-neutral</strong> delivery
            </div>
            <button onclick="showConfirmation()" class="order-confirm-btn" id="orderConfirmBtn">Confirm Order</button>
        </div>`
    } else {
        return checkoutTotal.innerHTML = "";
    }
}

checkout();

function applyStyle(id) {
    let img = document.getElementById(`productImage${id}`);
    if (!img) return;
    
    img.style.border = '2px solid hsl(14, 86%, 42%)';
    
    let styledImgs = JSON.parse(localStorage.getItem("styledButtons")) || [];
    
    if (!styledImgs.includes(id)) {
        styledImgs.push(id);
        localStorage.setItem("styledButtons", JSON.stringify(styledImgs));
    }
}

function removeStyle(id) {
    let img = document.getElementById(`productImage${id}`);
    if (!img) return;

    img.style.border = 'none';
    
    let styledImgs = JSON.parse(localStorage.getItem("styledButtons")) || [];
    
    if (styledImgs.includes(id)) {
        styledImgs = styledImgs.filter((x)=> x !== id);
        localStorage.setItem("styledButtons", JSON.stringify(styledImgs));
    }
}

function showConfirmation() {
    let overlay = document.getElementById('overlay');
    let orderConfirmation = document.getElementById('orderConfirmation');
    let closeConfirmation = document.getElementById('closeConfirmation');
    let cartConfirm = document.getElementById('cartConfirm');
    let checkoutTotalConfirm = document.getElementById('checkoutTotalConfirm');

    closeConfirmation.addEventListener('click', ()=> {
        localStorage.clear();
        location.reload();
    });

    overlay.style.display = 'block';
    orderConfirmation.style.display = 'block';
    let confirmationContent = (cartConfirm.innerHTML = cart
        .map((x)=> {
            let {id, quantity} = x;
            let search = productItemsData.find((y)=>y.id === id) || []; 
            let totalPrice = x.quantity * search.price;

            return `
            <div class="item">
              <div class="name">
                <strong>${search.name}</strong>
              </div>
              <div class="details">
                <div class="quantity">
                  <span>X${quantity}</span>
                </div>
                <div class="totalPrice">
                $${totalPrice.toFixed(2)}
                </div>
              </div>
            </div>
            `;
        }).join(""));
        let totalPrices = cart.map((x) => {
            let {id, quantity} = x;
            let search = productItemsData.find((y)=>y.id === id) || [];
            return search.price * quantity;
        })
        let total = totalPrices.reduce((acc, totalPrice) => acc + totalPrice, 0);
        
        checkoutTotalConfirm.innerHTML = `
        <div class="order-total-div">
          <p>Order Total</p>
          <p class="order-total" id="orderTotal"><strong>$${total.toFixed(2)}</strong></p>
        </div>`;

        return confirmationContent;
}