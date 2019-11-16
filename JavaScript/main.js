var currentBasket;

$(document).ready(() => {
    $("#buy-button").on("click", () => {
        $("#cart-button").popover("show");
        setInterval(() => {
            $("#cart-button").popover("hide");
        }, 3000);
    });
    currentBasket = LoadFromStorage("currentBasket");
    if (currentBasket == null)
        currentBasket = [];

});

function addToBasket(id) {
    let name = document.getElementById("product-head-text").innerHTML;
    let price = $("#product-price").text();
    let qua = document.getElementById("product-quantity").value;
    let image = document.getElementById("product-picture").src;
    if(qua <= 0) {
        alert("Product quantity must be positive");
        return;
    }
    let idExists = currentBasket.some(item => {
        return item.id == id;
    });
    if (idExists && currentBasket.length > 0) {
        let index = currentBasket.findIndex(x => x.id == id);
        currentBasket[index].qua += +qua;
    } else {
        var p = new Product(name,price,qua,image,id);
        currentBasket.push(p);
    }

    SaveToStorage("currentBasket", currentBasket);
    console.log(currentBasket);
    $("#cart-button").popover({
        content: `Added ${qua} x ${name} to your cart!`,
        placement: "bottom",
    }); 
}

function Product(name, price, qua, image, id) {
    var name, price, qua, image, id;
    this.name = name,
    this.price = +price,
    this.qua = +qua,
    this.image = image,
    this.id = id
}

function SaveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function LoadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}