document.addEventListener('DOMContentLoaded', () => {
    // Поиск, кнопка корзины, список желаний, обертка товаров
    const search = document.querySelectorAll('.search');
    const cartBtn = document.getElementById('cart');
    const wishlistBtn = document.getElementById('wishlist');
    const goodsWrapper = document.querySelector('.goods-wrapper');
    // Модальное окно с карзиной
    const cart = document.querySelector('.cart');

    // Создаем карточку из её шаблона
    const createCardGoods = (id, title, price, img) => {
        const card = document.createElement('div');
        card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.innerHTML = `
    <div class="card">
	    <div class="card-img-wrapper">
	        <img class="card-img-top" src="${img}" alt="">
                <button class="card-add-wishlist" 
                data-goods-id="${id}"></button>
	    </div>
	    <div class="card-body justify-content-between">
	        <a href="#" class="card-title">${title}</a>
	        <div class="card-price">${price} ₽</div>
	    <div>
	        <button class="card-add-cart">Добавить в корзину</button>
	    </div>
	    </div>
	</div>`;
        return card;
    }
    goodsWrapper.appendChild(createCardGoods(1, 'Darts', 2000, 'img/temp/Archer.jpg'));
    goodsWrapper.appendChild(createCardGoods(2, 'Flamingo', 6000, 'img/temp/Flamingo.jpg'));
    goodsWrapper.appendChild(createCardGoods(3, 'Noski', 300, 'img/temp/Socks.jpg'));



    const openCart = (event) => {
        event.preventDefault();
        cart.style.display = 'flex';
        return false;

    }

    const closeCart = (event) => {
        const target = event.target;
        console.log('event: ', event);
        const key = event.keyCode;
        if (target.classList.contains('cart') || target.classList.contains('cart-close') || key == 27 || key == 32) {
            cart.style.display = '';
        }
        document.removeEventListener('keyup', closeCart)

    }

    cartBtn.addEventListener('click', openCart);
    cart.addEventListener('click', closeCart);
    document.addEventListener('keyup', closeCart);

})