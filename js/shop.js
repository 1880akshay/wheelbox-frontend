var products = [
    {url: 'images/product-1.jpg', price: 200},
    {url: 'images/product-2.jpg', price: 300},
    {url: 'images/product-3.jpg', price: 400},
    {url: 'images/product-4.jpg', price: 500},
    {url: 'images/product-5.jpg', price: 600},
    {url: 'images/product-6.jpg', price: 700},
    {url: 'images/product-7.jpg', price: 800},
    {url: 'images/product-8.jpg', price: 900},
    {url: 'images/product-1.jpg', price: 1000},
    {url: 'images/product-2.jpg', price: 1100},
    {url: 'images/product-3.jpg', price: 1200},
    {url: 'images/product-4.jpg', price: 1300},
    {url: 'images/product-5.jpg', price: 1400},
    {url: 'images/product-6.jpg', price: 1500},
    {url: 'images/product-7.jpg', price: 1600},
    {url: 'images/product-8.jpg', price: 1700},
    {url: 'images/product-1.jpg', price: 1800},
    {url: 'images/product-2.jpg', price: 1900},
    {url: 'images/product-3.jpg', price: 2000},
    {url: 'images/product-4.jpg', price: 2100},
    {url: 'images/product-5.jpg', price: 2200},
    {url: 'images/product-6.jpg', price: 2300},
    {url: 'images/product-7.jpg', price: 2400},
    {url: 'images/product-8.jpg', price: 2500},
    {url: 'images/product-1.jpg', price: 2600}
]

var itemString = '<div class="col-6 col-lg-3 ftco-animate"><div class="product"><a href="#" class="img-prod"><img class="img-fluid" src="" alt=""><div class="overlay"></div></a><div class="text py-3 px-3"><h3><a href="#">Product Name</a></h3><div class="d-flex"><div class="pricing"><p class="price">&#8377 <span></span></p></div></div><p class="bottom-area d-flex px-3"><a href="#" class="add-to-cart text-center py-2 mr-1"><span>Add to cart</span></a><a href="#" class="buy-now text-center py-2">Buy now<span></span></a></p></div></div></div>';
var pageString = '<li onclick="page(this)"><a href="#"><span></span></a></li>';

var numOnOne = 12; //number of cards on one page

//construction of pagination
var pages = parseInt(products.length/numOnOne);
if(products.length%numOnOne !== 0) pages++; 
$('.block-27 ul').append('<li class="prev-page"><a href="#">&lt;</a></li>');
for(var i=1; i<=pages; i++) {
    $('.block-27 ul').append(pageString);
    if(i===1) $('.block-27 ul li:eq(1)').addClass('active');
    $('.block-27 ul li:eq('+ i +')').find('span').html(i);
}
$('.block-27 ul').append('<li class="next-page"><a href="#">&gt;</a></li>');

//function to add product card
function addProduct(x, y) {
    $('.row-products').append(itemString);
    $('.price:eq('+ x +') span').html(products[y].price);
    $('.img-prod:eq('+ x +') img').attr('src', products[y].url);
}

//next click of pagination
$('.next-page').click(function() {
    var active = $('.block-27 .active');
    if(active.next().hasClass('next-page') === false) {
        active.removeClass('active');
        active.next().addClass('active');
    }

    var pageNum = parseInt($('.block-27 .active').find('span').html());
    $('.row-products').empty();
    var min = numOnOne*(pageNum-1);
    var max = numOnOne*pageNum;
    if(max > products.length) {
        max = products.length;
    }
    for(var i=min; i<max; i++) {
        addProduct(i%numOnOne, i);
    }
    $('.col-6.col-lg-3.ftco-animate').addClass('fadeInUp ftco-animated')
    
});

//prev-click of pagination
$('.prev-page').click(function() {
    var active = $('.block-27 .active');
    if(active.prev().hasClass('prev-page') === false) {
        active.removeClass('active');
        active.prev().addClass('active');
    }

    var pageNum = parseInt($('.block-27 .active').find('span').html());
    $('.row-products').empty();
    var min = numOnOne*(pageNum-1);
    var max = numOnOne*pageNum;
    if(max > products.length) {
        max = products.length;
    }
    for(var i=min; i<max; i++) {
        addProduct(i%numOnOne, i);
    }
    $('.col-6.col-lg-3.ftco-animate').addClass('fadeInUp ftco-animated')
});

//page click of pagination
function page(elem) {
    var active = $('.block-27 .active');
    active.removeClass('active');
    $(elem).addClass('active');

    var pageNum = parseInt($(elem).find('span').html());
    $('.row-products').empty();
    var min = numOnOne*(pageNum-1);
    var max = numOnOne*pageNum;
    if(max > products.length) {
        max = products.length;
    }
    for(var i=min; i<max; i++) {
        addProduct(i%numOnOne, i);
    }
    $('.col-6.col-lg-3.ftco-animate').addClass('fadeInUp ftco-animated')
}

//page one construction
var upper = numOnOne;
if(products.length < numOnOne) {
    upper = products.length;
}

for(var i=0; i<upper; i++) {
    addProduct(i, i);
}