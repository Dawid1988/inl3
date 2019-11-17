var cartContainer;
var orderHistory;
var currentBasket = []; 
var totalPrice = 0;

$(document).ready(() => {
    cartContainer = $("#items-container");
    currentBasket = LoadFromStorage("currentBasket");
    if (currentBasket == null)
        currentBasket = [];
    orderHistory = LoadFromStorage("orderHistory");
    if (orderHistory == null) 
        orderHistory = [];
    DisplayCartItems();

    if (orderHistory.length == 0)
        $("#confirm-order-button").attr("disabled", "true");
    $("#confirm-order-button").on("click", () => {
        $("#confirm-order-button").attr("disabled", "true");
        orderHistory.push(currentBasket);
        SaveToStorage("orderHistory", orderHistory);
        cartContainer.empty();
        currentBasket = [];
        SaveToStorage("currentBasket", currentBasket);
        $("#total-price-text").text("");
        alert("Thank you for ordering! All oreders will appear in your profile.")
    });
});

function DisplayCartItems() {
    totalPrice = 0;
    currentBasket.forEach((item, index) => {
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
        currentBasket[index].qua += 1;
        SaveToStorage("currentBasket", currentBasket);
        $("#total-price-text").text(`${totalPrice += +currentBasket[index].price}`);
        $("#total-price-"+index).text(`${+currentBasket[index].qua * +item.price}`);
        $("#item-quant-text-"+index).text(`${+currentBasket[index].qua}`);
    });

    $("#less-quant-"+index).on("click", () => {
        if (currentBasket[index].qua == 1) {
            if (confirm("Reducing item quantity to below 1 will remove it, continue?"))
            {
                currentBasket = currentBasket.filter(x => x != currentBasket[index]);
                $("#total-price-text").text(`${totalPrice -= +currentBasket[index].price}`);
                SaveToStorage("currentBasket", currentBasket);
                cartContainer.empty();
                DisplayCartItems();
            } else {
                return;
            }
        } else {
            currentBasket[index].qua -= 1;
            SaveToStorage("currentBasket", currentBasket);
            $("#total-price-"+index).text(`${+currentBasket[index].qua * +item.price}`);
            $("#item-quant-text-"+index).text(`${+currentBasket[index].qua}`);
            $("#total-price-text").text(`${totalPrice -= +currentBasket[index].price}`);
        }
    });
    $("#total-price-text").text(`${totalPrice += +$("#total-price-"+index).text()}`);
}