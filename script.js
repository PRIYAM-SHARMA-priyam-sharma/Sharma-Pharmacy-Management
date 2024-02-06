const array = [
  {
    id: 1,
    name: "Povital",
    price: 200,
    quantity: 10,
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJ1Z3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    name: "Povital2",
    price: 100,
    quantity: 20,
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJ1Z3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    name: "Povital3",
    price: 230,
    quantity: 30,
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJ1Z3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    name: "Povital4",
    price: 400,
    quantity: 40,
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJ1Z3N8ZW58MHx8MHx8fDA%3D",
  },
];
const tempArray = JSON.parse(JSON.stringify(array));
const cartArray = [];

// All Arrays ....................................................................

const cartItemsContainer = document.getElementById("cart-items-container");
const userCartContainer = document.getElementById("user-cart-items-container");
const subTotal = document.getElementById("priceSubtotal");
const tax = document.getElementById("priceTax");
const total = document.getElementById("priceTotal");
const checkout = document.getElementById("payButton");
const addItem = document.getElementById("addItem");
const submit = document.getElementById("formsubmit");
const update = document.getElementById("formupdate");

// All tags ...................................................................................

if (Number(subTotal.innerText) <= 0) {
  checkout.classList.add("disabled");
} else {
  checkout.classList.remove("disabled");
}

// check out condition ..........................................................

update.style.display = "none";
function toggleButtons(isEditing) {
  if (isEditing) {
    submit.style.display = "none";
    update.style.display = "inline-block";
  } else {
    update.style.display = "none";
    submit.style.display = "inline-block";
  }
}

//form button condition ....................................................

function getResult() {
  const sum = cartArray.reduce((total, value) => total + value.price, 0);
  subTotal.innerText = sum;
  if (sum > 2000) {
    tax.innerText = 10;
    total.innerText = parseInt((90 * sum) / 100);
  } else {
    tax.innerText = 0;
    total.innerText = parseInt(sum);
  }

  if (Number(subTotal.innerText) <= 0) {
    checkout.classList.add("disabled");
  } else {
    checkout.classList.remove("disabled");
  }
}

// Total Result...............................................................

function updateQuantityDisplay(
  itemIndex,
  price,
  arrayQuantity,
  itemIndexarray
) {
  let quantityDisplay = document.querySelector(
    `#cart-item-${array[itemIndexarray].id} .cart-item-quantity`
  );
  console.log(quantityDisplay);
  quantityDisplay.innerText = `Quantity: ${arrayQuantity}`;
  const quantityInput = document.querySelector(
    `#user-cart-item-${cartArray[itemIndex].id} .form-control`
  );

  if (quantityInput) {
    const newQuantity = cartArray[itemIndex].quantity;
    quantityInput.value = newQuantity;

    const itemPriceElement = document.querySelector(
      `#user-cart-item-${cartArray[itemIndex].id} .cart-item-price`
    );
    itemPriceElement.innerText = `$${price}`;
    getResult();
  }
}

// Quantity and Price display .............................................

function handleQuantityChange(item, change) {
  const itemIndex = cartArray.findIndex((i) => i.id === item.id);
  const itemIndexarray = array.findIndex((i) => i.id === item.id);
  if (itemIndex !== -1) {
    cartArray[itemIndex].quantity = Math.max(
      1,
      cartArray[itemIndex].quantity + change
    );
    if (cartArray[itemIndex].quantity > 1) {
      array[itemIndexarray].quantity = array[itemIndexarray].quantity - change;
    }
    console.log(array[itemIndexarray].quantity);
    let intialPrice = tempArray[itemIndex].price;
    cartArray[itemIndex].price = intialPrice * cartArray[itemIndex].quantity;
    updateQuantityDisplay(
      itemIndex,
      cartArray[itemIndex].price,
      array[itemIndexarray].quantity,
      itemIndexarray
    );
  }
}

//quantity and price change .....................................................

function GetRequest() {
  array.forEach((item) => {
    updateCardItem(item);
  });
}

//array list showing ...........................................

function handleDelete(item) {
  const itemIndex = array.findIndex((i) => i.id === item.id);
  if (itemIndex !== -1) {
    const itemId = `cart-item-${item.id}`;
    const itemToRemove = document.getElementById(itemId);

    if (itemToRemove) {
      cartItemsContainer.removeChild(itemToRemove);
    }

    array.splice(itemIndex, 1);
    tempArray.splice(itemIndex, 1);
  }
}

//array list delete ........................................

function handleEdit(item) {
  document.getElementById("idvalue").value = item.id;
  document.getElementById("title").value = item.name,
  document.getElementById("price").value = item.price,
  document.getElementById("imgurl").value = item.image;
  document.getElementById("qty").value = item.quantity;
  toggleButtons(true);
}

//edit data shows in form ...............................................

function handleCart(item) {
  const exitingIndex = cartArray.findIndex((value) => value.id == item.id);
  console.log(exitingIndex);
  if (exitingIndex == -1) {
    cartArray.push({ ...item, quantity: 1 });
    console.log(cartArray);
    const cartItemDiv = document.createElement("div");
    cartItemDiv.className = "col-12 mt-2 g-0 center-item";
    const itemId = `user-cart-item-${item.id}`;
    cartItemDiv.id = itemId;
    cartItemDiv.innerHTML = `
        <div class="col-6 right col-xs-12 g-0 center-item">
            <img src="${
              item.image ||
              "https://media.istockphoto.com/id/1300036753/photo/falling-antibiotics-healthcare-background.jpg?s=612x612&w=0&k=20&c=oquxJiLqE33ePw2qML9UtKJgyYUqjkLFwxT84Pr-WPk="
            }" alt="${item.name}" />
            <h1 class="cart-item-name">${item.name}</h1>
        </div>
        <div class="col-6 left col-xs-12 g-0 center-item">
            <button class="btn btn-default minus-btn" data-item-id="${itemId}">
                <i class="fas fa-minus"></i>
            </button>
            <input class="form-control text-center" type="text" min="1" value="${1}" readonly />
            <button class="btn btn-default plus-btn" data-item-id="${itemId}">
                <i class="fas fa-plus"></i>
            </button>
            <h4 class="cart-item-price">$${item.price}</h4>
        </div>
    `;
    userCartContainer.appendChild(cartItemDiv);

    // Add event listeners to the plus and minus buttons
    const minusBtn = document.querySelector(`#${itemId} .minus-btn`);
    const plusBtn = document.querySelector(`#${itemId} .plus-btn`);
    minusBtn.addEventListener("click", () => handleQuantityChange(item, -1));
    plusBtn.addEventListener("click", () => handleQuantityChange(item, 1));

    getResult();
  }
}

//user pannel cartArray shows ........................................

function updateCardItem(item) {
  const cartItemDiv = document.createElement("div");
  cartItemDiv.className = "col-12 mt-2 g-0 center-item";

  // Generate a unique identifier for each item
  const itemId = `cart-item-${item.id}`;

  cartItemDiv.id = itemId;

  cartItemDiv.innerHTML = `
        <div class="col-6 right col-xs-12 g-0 center-item">
            <img src="${
              item.image ||
              "https://media.istockphoto.com/id/1300036753/photo/falling-antibiotics-healthcare-background.jpg?s=612x612&w=0&k=20&c=oquxJiLqE33ePw2qML9UtKJgyYUqjkLFwxT84Pr-WPk="
            }" alt="${item.name}" />
            <div>
            <h1 class="cart-item-name">${item.name}</h1>
            <br>
            <p class="cart-item-quantity" id="${itemId}">Quantity: ${
    item.quantity
  }</p>
            </div>

        </div>
        <div class="col-6 left col-xs-12 g-0 center-item">
            <h4 class="cart-item-price">$${item.price}</h4>
            <button type="button" class="btn mx-2 editbtn" style="background-color: #FF8911;color: white;" id="${itemId}">Edit</button>
            <button type="button" class="btn deletebtn"  style="background-color: #ff4911;color: white;" id="${itemId}">Delete</button>
            <button type="button" class="btn mx-2 cartbtn" style="background-color: #7F27FF;color: white;" id="${itemId}">Add to Cart</button>
        </div>
    `;
  cartItemsContainer.appendChild(cartItemDiv);

  const editButton = document.querySelector(`#${itemId} .editbtn`);
  const deleteButton = document.querySelector(`#${itemId} .deletebtn`);
  const cartButton = document.querySelector(`#${itemId} .cartbtn`);
  const cartitemquantity = document.querySelector(
    `#${itemId} .cart-item-quantity`
  );

  editButton.addEventListener("click", () => handleEdit(item));
  deleteButton.addEventListener("click", () => handleDelete(item));
  cartButton.addEventListener("click", () => handleCart(item));
}

// admin array shows ..............................................

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const newItem = {
    id: array.length + 1,
    name: document.getElementById("title").value,
    price: parseFloat(document.getElementById("price").value),
    image: document.getElementById("imgurl").value,
    quantity: parseFloat(document.getElementById("qty").value),
  };
  array.push(newItem);
  alert(`${newItem.name} successfully inserted`)
  tempArray.push(JSON.parse(JSON.stringify(newItem)));

  cartItemsContainer.innerHTML = "";
  GetRequest();
});

// submit form new item ...........................................

update.addEventListener("click", function (event) {
  event.preventDefault();
  const updateItem = {
    id: parseFloat(document.getElementById("idvalue").value),
    name: document.getElementById("title").value,
    price: parseFloat(document.getElementById("price").value),
    image: document.getElementById("imgurl").value,
    quantity: parseFloat(document.getElementById("qty").value),
  };

  console.log(updateItem);

  const itemIndex = array.findIndex((i) => i.id === updateItem.id);
  if (itemIndex !== -1) {
    array.splice(itemIndex, 1, updateItem);
    alert(`itemno ${updateItem.id} updated`)
    tempArray.splice(itemIndex, 1, updateItem);
    console.log("new: ", array);
    cartItemsContainer.innerHTML = "";
    GetRequest();
    document.getElementById("idvalue").value = '';
    document.getElementById("title").value = '',
    document.getElementById("price").value = '',
    document.getElementById("imgurl").value = '';
    document.getElementById("qty").value = '';
  }
});

//update form exiting item ...................................

window.addEventListener("load", GetRequest);
addItem.addEventListener("click", () => toggleButtons(false));
checkout.addEventListener("click", () =>
  {
    alert(`Payment Successfull. Total: ${total.innerText}`)
    cartArray.length=0
    console.log(cartArray)
    userCartContainer.innerHTML = "";
    total.innerText = 0
    tax.innerText = 0
    subTotal.innerText = 0
  }
);
