/* var data = [
    {image: 'images/product-1.jpg', price: 200, name: 'product1', id: 1},
    {image: 'images/product-2.jpg', price: 500, name: 'product2', id: 2},
    {image: 'images/product-3.jpg', price: 500, name: 'product3', id: 3},
    {image: 'images/product-4.jpg', price: 900, name: 'product4', id: 4},
    {image: 'images/product-5.jpg', price: 100, name: 'product5', id: 5},
    {image: 'images/product-6.jpg', price: 800, name: 'product6', id: 6},
    {image: 'images/product-7.jpg', price: 800, name: 'product7', id: 7},
    {image: 'images/product-8.jpg', price: 900, name: 'product8', id: 8},
    {image: 'images/product-1.jpg', price: 1000, name: 'product9', id: 9},
    {image: 'images/product-2.jpg', price: 100, name: 'product10', id: 10},
    {image: 'images/product-3.jpg', price: 3200, name: 'product11', id: 10},
    {image: 'images/product-4.jpg', price: 1300, name: 'product12', id: 12},
    {image: 'images/product-5.jpg', price: 1000, name: 'product13', id: 13},
    {image: 'images/product-6.jpg', price: 900, name: 'product14', id: 14},
    {image: 'images/product-7.jpg', price: 1600, name: 'product15', id: 15},
    {image: 'images/product-8.jpg', price: 1700, name: 'product16', id: 16},
    {image: 'images/product-1.jpg', price: 1800, name: 'product17', id: 17},
    {image: 'images/product-2.jpg', price: 1900, name: 'product18', id: 18},
    {image: 'images/product-3.jpg', price: 2000, name: 'product19', id: 19},
    {image: 'images/product-4.jpg', price: 2100, name: 'product20', id: 20},
    {image: 'images/product-5.jpg', price: 2200, name: 'product21', id: 21},
    {image: 'images/product-6.jpg', price: 2000, name: 'product22', id: 22},
    {image: 'images/product-7.jpg', price: 2400, name: 'product23', id: 23},
    {image: 'images/product-8.jpg', price: 2500, name: 'product24', id: 24},
    {image: 'images/product-1.jpg', price: 2600, name: 'product25', id: 25}
] */

var itemString = '<div class="col-6 col-lg-3 ftco-animate"><div class="product"><a href="#" class="img-prod"><img class="img-fluid" src="" alt=""><div class="overlay"></div></a><div class="text py-3 px-3"><h3><a href="#" class="product-names"></a><span class="product-id"></span></h3><div class="d-flex"><div class="pricing"><p class="price">&#8377 <span></span></p></div></div><p class="bottom-area d-flex px-3"><a href="#" class="add-to-cart text-center py-2 mr-1"><span>Add to cart</span></a><a href="#" class="buy-now text-center py-2">Buy now<span></span></a></p></div></div></div>';
var pageString = '<li onclick="page(this)"><a href="#"><span></span></a></li>';

var numOnOne = 12; //number of cards on one page

$.get('/product/getProducts', (data)=>{

    //function to add product card
    function addProduct(x, y) {
        $('.row-products').append(itemString);
        $('.price:eq('+ x +') span').html(data[y].price);
        $('.img-prod:eq('+ x +') img').attr('src', data[y].image);
        $('.product-names:eq('+ x + ')').html(data[y].name);
        $('.product-id:eq('+ x + ')').html(data[y].id);
    }

    //construction of pagination
    var pages = parseInt(data.length/numOnOne);
    if(data.length%numOnOne !== 0) pages++; 
    $('.block-27 ul').append('<li class="prev-page"><a href="#">&lt;</a></li>');
    for(var i=1; i<=pages; i++) {
        $('.block-27 ul').append(pageString);
        if(i===1) $('.block-27 ul li:eq(1)').addClass('active');
        $('.block-27 ul li:eq('+ i +')').find('span').html(i);
    }
    $('.block-27 ul').append('<li class="next-page"><a href="#">&gt;</a></li>');

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
        if(max > data.length) {
            max = data.length;
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
        if(max > data.length) {
            max = data.length;
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
        if(max > data.length) {
            max = data.length;
        }
        for(var i=min; i<max; i++) {
            addProduct(i%numOnOne, i);
        }
        $('.col-6.col-lg-3.ftco-animate').addClass('fadeInUp ftco-animated')
    }

    //page one construction
    var upper = numOnOne;
    if(data.length < numOnOne) {
        upper = data.length;
    }

    for(var i=0; i<upper; i++) {
        addProduct(i, i);
    }
    
    /****sorting****/

    //high to low
    $('#h2l').click(function() {
        data.sort((a, b) => (a.price < b.price) ? 1 : -1);
        $('.block-27 ul li:eq(1)').click();
    });

    //low to high
    $('#l2h').click(function() {
        data.sort((a, b) => (a.price > b.price) ? 1 : -1);
        $('.block-27 ul li:eq(1)').click();
    });

    //newest arrivals
    $('#na').click(function() {
        data.sort((a, b) => (a.id > b.id) ? 1 : -1);
        $('.block-27 ul li:eq(1)').click();
    });
});