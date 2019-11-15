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
        toCHeckout(name,price,qua,image);
    }

    var checkout = [];

    function product(name,price,qua,image){

        this.name = name;
        this.price = price;
        this.qua = qua;
        this.image = image;
    }

    function toCHeckout(name,price,qua,image){
        var pp = new product(name,price,qua,image);
        checkout.push(pp);
        console.log(pp.name);
    }