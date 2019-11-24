var cart;

    $(document).ready(() => {
    cart = getFromStorage("Kundvagn");
    if (cart == null)
    cart = [];
    });

    function Product(name, price, qua, image, id) 
    {
        var name, price, qua, image, id;
        this.name = name,
        this.price = +price,
        this.qua = +qua,
        this.image = image,
        this.id = id
    }

    function addToBasket(id) 
    {
        let name = document.getElementById("product-head-text").innerHTML;
        let price = $("#product-price").text();
        let qua = document.getElementById("product-quantity").value;
        let image = document.getElementById("product-picture").src;
        if(qua <= 0) 
            {
                alert("Product quantity must be positive");
                return;
            }
            
        var p = new Product(name,price,qua,image,id);
        cart.push(p);
        saveToLocalStore(p);
        
        location.reload();
        alert("Product " + p.name + " added to cart"); 
        
    }   
    
    function saveToLocalStore()
    {
        localStorage.setItem("Kundvagn", JSON.stringify(cart));
        
    }
    function getFromStorage() 
    {
        return JSON.parse(localStorage.getItem("Kundvagn"));
        
    }

//////////     CHECKOUT    //////////

    function toCheckout()
    {

            let objects = getFromStorage();

            let total = 0;
            let frakt = 49;
            let SubTotal = 0;
            let vat = 0.0;
            let rr = 0;
               
            for (let i = 0; i < objects.length; i++)
            {   
                var row = document.getElementById("myRow");
                var x1 = row.insertCell();
                var x2 = row.insertCell();
                var x3 = row.insertCell();
                var x4 = row.insertCell();

                x1.innerHTML = ("Name : " + objects[i].name + " ");
                x2.innerHTML = ("Price : " + objects[i].price + " ");
                x3.innerHTML = ("Quantity : " + objects[i].qua + " ");
                x4.setAttribute('class', 'btn btn_delete');
            
                let btn = document.createElement('button');
                btn.appendChild(document.createTextNode("Delete"))
                btn.type = "button";
                btn.setAttribute('onclick', 'Delete(' + i + ')');
                x4.appendChild(btn);

                total += (objects[i].qua * objects[i].price);

                if(objects[i].qua > 2)
                    {     
                        let txt = document.createElement('txt');
                        txt.type = "txt";

                        rr = ((objects[i].price * objects[i].qua) / objects[i].qua);
                        
                        SubTotal =  (frakt + total) - (rr); 

                        vat = ((total + frakt)*0.25);
                        
                        document.getElementById("rabatt").innerHTML = "Buy 2 get 3 for free: " + objects[i].name + " -" +rr + " kr" ;


                    } 
                    else
                        {
                        SubTotal = (total + frakt);
                        vat = ((total + frakt)*0.25);
                        };
                    
                document.getElementById("total").innerHTML = "Summa: " + total + " kr" ;
                document.getElementById("frakt").innerHTML = "Frakt: " + frakt + " kr" ;
                document.getElementById("subTotal").innerHTML = "Total summa: " + SubTotal + " kr";
                document.getElementById("vat").innerHTML = "moms:25% " + vat + "  kr" ;
            };
        };
    
        function Delete(x)
        {
            let objects = getFromStorage();
            if(objects != null)
            {
                objects.splice(x, 1);
                localStorage.setItem("Kundvagn", JSON.stringify(objects));
                location.reload(); 
            }
        }

        
//