if(document.readyState == 'loading')
    {
    document.addEventListener('contentLoaded', ready)
    } 
    else
    {
        ready()
    }

    function ready()
    {
        var addToCartButtons = document.getElementsByClassName('buy-button')
        for (var i = 0; i < addToCartButtons.length; i++) 
            {
                var button = addToCartButtons[i]
                button.addEventListener('click', addToBasket)
            }
    }

    function addToBasket(id){

        var button = event.target
        var container = button.parentElement.parentElement

        
        var name = document.getElementById("product-head-text").innerHTML;
        var price = document.getElementById("product-price").innerHTML;
        var qua = document.getElementById("product-quantity").value;
        var image = document.getElementById("product-picture").src;
        if( qua <= 0) {
            alert("Product quantity must be positive");
            return;
        }
        toCHeckout(name,price,qua,image,id);
    }

    var checkout = [];

    function product(name,price,qua,image,id){

        this.name = name;
        this.price = price;
        this.qua = qua;
        this.image = image;
        this.id = id;
    }

    function toCHeckout(name,price,qua,image,id){
        var pp = new product(name,price,qua,image,id);
        checkout.push(pp);
        console.log(pp.name);

        console.log(checkout);
    }