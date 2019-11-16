var currentBasket = [];

$(document).ready(() => {
    $("#buy-button").on("click", () => {
        $("#cart-button").popover("show");
        setInterval(() => {
            $("#cart-button").popover("hide");
        }, 3000);
    });
});

function addToBasket(id) {
    let name = document.getElementById("product-head-text").innerHTML;
    let price = $("#product-price").text();
    let qua = document.getElementById("product-quantity").value;
    let image = document.getElementById("product-picture").src;
    if( qua <= 0) {
        alert("Product quantity must be positive");
        return;
    }
    toCheckout(name,price,qua,image,id);
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

function toCheckout(name,price,qua,image,id) {
    let idExists = currentBasket.some(item => {
        return item.id == id;
    });
    if (idExists) {
        let index = currentBasket.findIndex(x => x.id == id);
        currentBasket[index].qua += +qua;
    } else {
        var p = new Product(name,price,qua,image,id);
        currentBasket.push(p);
    }

    localStorage.setItem("currentBasket", currentBasket);
    console.log(currentBasket);
}