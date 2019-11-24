class orderHistory {
    constructor() {
      this.addOrderListener();
    }
  
    addOrderListener() {
      let orderBtn = document.querySelector(".btnOrder");
      let showOrder = document.querySelector(".orderHistory"); 

      
      orderBtn.addEventListener("click", e => {
          let cartArray = 
            JSON.parse(localStorage.getItem("OrderHistory")) || [];
          let Order = JSON.parse(localStorage.getItem("Kundvagn"));
          cartArray.push({product: Order, date: new Date().toLocaleDateString()});
          localStorage.setItem("OrderHistory", JSON.stringify(cartArray)); 
          
          function History()  {
            let getHistoryArray =
          JSON.parse(localStorage.getItem("OrderHistory")) || [];

          showOrder.innerHTML = `
          <div class="row">
            <hr>
              <h2>History</h2>   
          </div>
          ${getHistoryArray.reverse().map(({ product }) => `
                <div class="col-sm-5 col-md-6 ">
                  ${product.map(({ name }) => `<p>${"Name: " + name}</p>`)}</div>
                  ${getHistoryArray.map(({ date }) => `<p>${"Date: " + date}</p>`)}</div>
                <hr>
                </div>`)}`;
        }
    History();
      });
      }
    }
new orderHistory();