$(function() {

// Scroll

$("[data-scroll]").on("click", function(event) {
	event.preventDefault();

	var blockId = $(this).data('scroll'),
	blockOffset = $(blockId).offset().top;

	$("html, body").animate({
		scrollTop: blockOffset
	}, 500);

  });

});

// Fixed

$(function() {
    var header = $("#header__line"),
        headerH = $("#header").innerHeight(),
        scrollOffset =  $(window).scrollTop();
    
        checkScroll(scrollOffset);
    
    $(window).on('scroll', function() {
        
        scrollOffset = $(this).scrollTop();
        
        checkScroll(scrollOffset);
    });
    
    function checkScroll(scrollOffset) {
        
        if (scrollOffset >= headerH) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
        
    }
    
    
    
});

// Cart

const plantsBtn = document.querySelectorAll('.plants__btn');
const cart = document.querySelector('.cart__content-list');
const cartProductsList = document.querySelector('.nav__item-cart');
const cartQuantity = document.querySelector('.header__zero');
const fullPrice = document.querySelector('.fullprice');
let price = 0;

const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
    return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
    return price -= currentPrice;
};

const printFullPrice = () => {
    fullPrice.textContent = `${normalPrice(price)} $`;
};

const printQuantity = () => {
    let length = cartProductsList.querySelector('.cart__content-list').children.length;
    cartQuantity.textContent = length;
    length > 0 ? cartProductsList.classList.add('active') : cartProductsList.classList.remove('active')
};

const generateCartProduct = (img, title, price, id) => {
    return `


        <li class="cart__content-item">
              <article class="cart__content-product" data-id="${id}">
                  <img class="cart__product-img" src="${img}" alt="Plant">
                  <div class="cart__product-text">
                      <h3 class="cart__product-name">${title}</h3>
                      <div class="cart__product-price">${price} \$</div>
                  </div>
                  <button class="cart__product-delete" aria-label="Удалить товар"></button>
              </article>
          </li>



            `;
};

const deleteProduct = (productParent) => {
    
    let id = productParent.querySelector('.cart__content-product').dataset.id;
    document.querySelector(`.plants__item[data-id="${id}"]`).querySelector('.plants__btn').disabled = false;
                           
    let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart__product-price').textContent));
    minusFullPrice(currentPrice);
    
    printFullPrice();
    productParent.remove();
    printQuantity();
};

plantsBtn.forEach(el =>{
    el.closest('.plants__item').setAttribute('data-id', randomId());
    el.addEventListener('click', (e) => {
        let self = e.currentTarget;
        let parent = self.closest('.plants__item');
        let id = parent.dataset.id;
        let img = parent.querySelector('.plants__img').getAttribute('src');
        let title = parent.querySelector('.plants__name').textContent;
        let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.plants__price-two').textContent));


        plusFullPrice(priceNumber);
        printFullPrice();
        
        cartProductsList.querySelector('.cart__content-list').insertAdjacentHTML('afterBegin', generateCartProduct(img, title, priceNumber, id));
        
        printQuantity();

        self.disabled = true;
    });
});


cart.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart__product-delete')) {
        deleteProduct(e.target.closest('.cart__content-item'));
    }
});


// Modal-cart

const orderOpenProd = document.querySelector(".order-button");
const orderOpenList = document.querySelector(".order__list");

document.getElementById("open-modal-btn").addEventListener("click", function() {
    document.getElementById("modal").classList.add("open");
});

document.getElementById("close-my-modal-btn").addEventListener("click", function() {
    document.getElementById("modal").classList.remove("open");
});

let flag = 0;

orderOpenProd.addEventListener('click', (e) => {
    if (flag == 0) {
        orderOpenProd.classList.add("open");
        orderOpenList.style.display = 'block';
        flag = 1;
    } else {
        orderOpenProd.classList.remove("open");
        orderOpenList.style.display = 'none';
        flag = 0;
    }
})








































