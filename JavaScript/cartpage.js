var cartContainer;
var cart = []; 
var totalPrice = 0;

$(document).ready(() => {
    cartContainer = $("#items-container");
    cart = LoadFromStorage("currentBasket");
    if (currentBasket == null)
        currentBasket = [];
    DisplayCartItems();
});

function DisplayCartItems() {
    cart.forEach((item, index) => {
        RowBuilder(item, index);
    });
}

function RowBuilder(item, index) {
    cartContainer.append(
        `
        <div class="row" id="item-row-${index}">
            <div class="col-md-4">
                <p>${item.name}</p>
            </div>
            <div class="col-md-2">
                <p class="center-text currency">${item.price}</p>
            </div>
            <div class="col-md-1">
                <button id="less-quant-${index}" class="btn btn-secondary btn-block">-</button>
            </div>
            <div class="col-md-1">
                <p class="center-text" id="item-quant-text-${index}">${item.qua}</p>
            </div>
            <div class="col-md-1">
                <button id="more-quant-${index}" class="btn btn-secondary btn-block">+</button>
            </div>
            <div class="col-md-2">
                <p id="total-price-${index}" class="center-text currency">${+item.qua * +item.price}</p>
            </div>
        </div>
        `
    );

    $("#more-quant-"+index).on("click", () => {
        cart[index].qua += 1;
        SaveToStorage("currentBasket", cart);
        $("#total-price-text").text(`${totalPrice += +cart[index].price}`);
        $("#total-price-"+index).text(`${+cart[index].qua * +item.price}`);
        $("#item-quant-text-"+index).text(`${+cart[index].qua}`);
    });

    $("#less-quant-"+index).on("click", () => {
        if (cart[index].qua == 1) {
            if (confirm("Reducing item quantity to below 1 will remove it, continue?"))
            {
                cart = cart.filter(x => x != cart[index]);
                $("#total-price-text").text(`${totalPrice -= +cart[index].price}`);
                SaveToStorage("currentBasket", cart);
                cartContainer.empty();
                DisplayCartItems();
            } else {
                return;
            }
        } else {
            cart[index].qua -= 1;
            SaveToStorage("currentBasket", cart);
            $("#total-price-"+index).text(`${+cart[index].qua * +item.price}`);
            $("#item-quant-text-"+index).text(`${+cart[index].qua}`);
            $("#total-price-text").text(`${totalPrice -= +cart[index].price}`);
        }
    });
    $("#total-price-text").text(`${totalPrice += +$("#total-price-"+index).text()}`);
}