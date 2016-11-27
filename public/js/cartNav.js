// simple file for checking the amount of items in the cart

if($.cookie('cart')){
    var cart = JSON.parse($.cookie('cart'));
    var cartItems = cart.photos.length;

    $('.fi-shopping-cart').html(cartItems);
}
else{
    $('.fi-shopping-cart').html(0);
}

