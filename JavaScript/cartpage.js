var cartContainer;
var cart = []; 

$(document).ready(() => {
    cartContainer = $("#items-container");
    cart = LoadFromStorage("currentBasket");
    if (currentBasket == null)
        currentBasket = [];
    DisplayCartItems();
});

function DisplayCartItems() {
    cart.forEach(item => {
        RowBuilder(item);
    });
}

function RowBuilder(item) {
    cartContainer.append(
        `
        <div class="row">
            <div class="col-md-4">
                <p>${item.name}</p>
            </div>
            <div class="col-md-2">
                <p>${item.price}</p>
            </div>
            <div class="col-md-1" id="less-quant-${item.id}">
                <p></p>
            </div>
            <div class="col-md-1">
                <p>${item.qua}</p>
            </div>
            <div class="col-md-1" id="more-quant-${item.id}">
                <p></p>
            </div>
            <div class="col-md-2">
                <p id="total-price-${item.id}">${+item.qua * +item.price}</p>
            </div>
        </div>
        `
    );
}