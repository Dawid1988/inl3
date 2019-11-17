var orderHistory;
var historyContainer;
$(document).ready(() => {
    orderHistory = LoadFromStorage("orderHistory");
    if (orderHistory == null) 
        orderHistory = [];

    historyContainer = $("#history-container") ;

    BuildHistory(orderHistory);
});

function BuildHistory(items) {
    items.forEach((item, index) => {
        let thisRowTotal = 0;
        historyContainer.append(
            `
            <div class="row bordered-box my-2">
                <div class="col-md-12" id="history-row-${index}">

                </div>
            </div>
            `
        );
        item.forEach((product, innerIndex) => {
            $("#history-row-"+index).append(
                `
                <div class="row">
                    <div class="col-md-9">
                        <p>${product.name}</p>
                    </div>
                    <div class="col-md-1">
                        <p>${product.qua}</p>
                    </div>
                    <div class="col-md-2">
                        <p>Total: ${+product.qua * +product.price}</p>
                    </div>
                </div>
                `
            );
            thisRowTotal += (+product.qua * +product.price);
        });
        $("#history-row-"+index).append(
            `
            <div class="row">
                <div class="col-md-2">
                <p>Net total:</p>
            </div>
            <div class="row">
                <div class="col-md-2">
                <p>${thisRowTotal}</p>
            </div>
            `
        );
    });
}