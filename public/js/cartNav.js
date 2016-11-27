// simple file for checking the amount of items in the cart

if($.cookie('cart')){
    var cart = JSON.parse($.cookie('cart'));
    var cartItems = cart.photos.length;

    $('.top-bar .fi-shopping-cart').html(cartItems);
}
else{
    $('.top-bar .fi-shopping-cart').html(0);
}

