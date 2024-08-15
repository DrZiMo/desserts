const cardsContainer = document.querySelector('.cards');
const cartsContainer = document.querySelector('.cart-items');
const itemQty = document.querySelector('.item-qtty');
const empty = document.querySelector('.empty');
const cartTotal = document.querySelector('.cart-total');
const carbonItem = document.querySelector('.carbon');
const orederBtn = document.querySelector('.right-button');
const total = document.querySelector('.total');

let numberOfCart = 0
let inTheCart = [];
let itemTotal = 0;

let screenType = 'desktop';


let PriceTotal;

const items = {
    id: [0, 1, 2, , 3, 4, 5, 6, 7, 8],
    name: [
        'Waffle with Berries',
        'Vanilla Bean Crème Brûlée',
        'Macaron Mix of Five',
        'Classic Tiramisu',
        'Pistachio Baklava',
        'Lemon Meringue Pie',
        'Red Velvet Cake',
        'Salted Caramel Brownie',
        'Vanilla Panna Cotta'
    ],
    type: [
        'Waffle',
        'Crème Brûlée',
        'Macaron',
        'Tiramisu',
        'Baklava',
        'Pie',
        'Cake',
        'Brownie',
        'Cotta'
    ],
    price: ['6.50', '7.00', '8.00', '5.50', '4.00', '5.00', '4.50', '4.50', '6.50'],
    image: [
        'waffle',
        'creme-brulee',
        'macaron',
        'tiramisu',
        'baklava',
        'meringue',
        'cake',
        'brownie',
        'panna-cotta',
    ],
    qty: [0, 0, 0, 0, 0, 0, 0, 0, 0]
};

for (let i = 0; i < items.id.length - 1; i++) {
    // main cards div
    const card = document.createElement('div');
    card.className = 'card';
    cardsContainer.appendChild(card);

    // the image of the card
    const cardImg = document.createElement('div');
    cardImg.className = 'card-img';
    card.appendChild(cardImg);
    let imagePath = `assets/images/image-${items.image[i]}-${screenType}.jpg`;
    cardImg.style.backgroundImage = `url(${imagePath})`;

    // add to cart div
    const cardAdd = document.createElement('button');
    cardAdd.className = 'add-to-cart';
    card.appendChild(cardAdd);
    let itemId = document.createAttribute("data-id");
    itemId.value = items.id[i];
    cardAdd.setAttributeNode(itemId);

    // the icon
    const ToIcon = document.createElement('img');
    ToIcon.className = 'add-to-cart-img';
    ToIcon.src = 'assets/images/icon-add-to-cart.svg';
    cardAdd.appendChild(ToIcon);
    let itemIdImg = document.createAttribute("data-id");
    itemIdImg.value = items.id[i];
    ToIcon.setAttributeNode(itemIdImg);

    // the text
    const cardAddTxt = document.createElement('div');
    cardAddTxt.className = 'add-to-cart-txt';
    cardAdd.appendChild(cardAddTxt);
    cardAddTxt.innerHTML = "Add to Cart";
    let itemIdTxt = document.createAttribute("data-id");
    itemIdTxt.value = items.id[i];
    cardAddTxt.setAttributeNode(itemIdTxt);

    // main card text div
    const cardTxt = document.createElement('div');
    cardTxt.className = 'card-txt';
    card.appendChild(cardTxt);

    // the type of the item
    const cardPar = document.createElement('p');
    cardPar.className = 'small-txt';
    cardTxt.appendChild(cardPar);
    cardPar.innerHTML = items.type[i];

    // the name of the item
    const cardName = document.createElement('h3');
    cardName.className = 'card-name';
    cardTxt.appendChild(cardName);
    cardName.innerHTML = items.name[i];

    // the price of the item
    const cardprice = document.createElement('p');
    cardprice.className = 'price';
    cardTxt.appendChild(cardprice);
    cardprice.innerHTML = `$${items.price[i]}`;
}


cardsContainer.addEventListener('click', (e) => {
    if(e.target.className === 'add-to-cart' || e.target.className === 'add-to-cart-img' || e.target.className === 'add-to-cart-txt' ) {
        addToCart(e.target.dataset.id);
    }
})


// Show Empty if its empty
empty.style.display = 'flex';

// hide all the sub info
cartTotal.style.display = 'none';
carbonItem.style.display = 'none';
orederBtn.style.display = 'none';

// the number of carts on the top
itemQty.innerHTML = numberOfCart;


function addToCart(item_id) {
    numberOfCart++;

    createRightSideElem(item_id);
}

function createRightSideElem(item) {
    // remove the empty
    empty.style.display = 'none';
    checkCartExist(item);
    getTotal();
    
}

// removing cart item


function checkCartExist(item) {
    
    items.qty[item]++;
    let qtyNumber = items.qty[item];
    itemQty.innerHTML = numberOfCart;
    if(!inTheCart.includes(item)) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartsContainer.appendChild(cartItem);

        const cartItemTitle = document.createElement('div');
        cartItemTitle.className = 'cart-item-title';
        cartItem.appendChild(cartItemTitle);
        cartItemTitle.innerHTML = items.name[item];

        const cartSubInfo = document.createElement('div');
        cartSubInfo.className = 'cart-sub-info';
        cartItem.appendChild(cartSubInfo);

        const itemNumber = document.createElement('div');
        itemNumber.className = 'item-number';
        cartSubInfo.appendChild(itemNumber);
        inTheCart.push(item);
        let dataNum = document.createAttribute('data-number');
        dataNum.value = item;
        itemNumber.setAttributeNode(dataNum);
        itemNumber.innerHTML = `${qtyNumber}x`;

        const itemPrice = document.createElement('div');
        itemPrice.className = 'item-price';
        cartSubInfo.appendChild(itemPrice);
        itemPrice.innerHTML = `@$${items.price[item]}`;

        const itemPriceTotal = document.createElement('div');
        itemPriceTotal.className = 'item-total-price';
        cartSubInfo.appendChild(itemPriceTotal);
        let dataNumQ = document.createAttribute('data-number');
        dataNumQ.value = item;
        itemPriceTotal.setAttributeNode(dataNumQ);

        let dataPrice = document.createAttribute('data-price');
        itemPriceTotal.setAttributeNode(dataPrice);
        dataPrice.value = items.price[item];
        PriceTotal = Number(items.price[item]) * qtyNumber;
        itemPriceTotal.innerHTML = `$${PriceTotal.toFixed(2)}`;

        const removeImg = document.createElement('img');
        removeImg.src = 'assets/images/icon-remove-item.svg';
        removeImg.className = 'remove';
        cartSubInfo.appendChild(removeImg);
        // removeImg.onclick = remove(item);

        
    
    cartTotal.style.display = 'flex';
    carbonItem.style.display = 'flex';
    orederBtn.style.display = 'flex';

    }
    else {
        updateInfo(item, qtyNumber);
    }
}

function updateInfo(dataNumber, qtyNumber) {
    const itemNumbers = document.querySelectorAll('.item-number');
    const itemTotalPrices = document.querySelectorAll('.item-total-price');
    
    // update item number
    itemNumbers.forEach(itemNumber => {
        if (itemNumber.getAttribute('data-number') === dataNumber) {
            itemNumber.innerHTML = `${qtyNumber}x`;
        }
    });

    // update item total price
    itemTotalPrices.forEach(itemTotalPrice => {
        PriceTotal = Number(items.price[dataNumber]) * qtyNumber;
        if (itemTotalPrice.getAttribute('data-number') === dataNumber) {
            itemTotalPrice.innerHTML = `$${PriceTotal.toFixed(2)}`;
            itemTotalPrice.setAttribute('data-price', PriceTotal);
        }
    });
}

// get the full total
function getTotal() {
    const itemTotalPrices = document.querySelectorAll('.item-total-price');

    itemTotalPrices.forEach(itemTotalPrice => {
        let itemValue = parseFloat(itemTotalPrice.getAttribute('data-price'));
        itemTotal = itemTotal + itemValue;
        total.innerHTML = `$${itemTotal}`;
    });
}