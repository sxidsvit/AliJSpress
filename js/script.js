document.addEventListener('DOMContentLoaded', () => {
    // Элементы DOM
    const search = document.querySelector('.search'),
        cartBtn = document.getElementById('cart'),
        wishlistBtn = document.getElementById('wishlist'),
        goodsWrapper = document.querySelector('.goods-wrapper'),
        cart = document.querySelector('.cart'),
        category = document.querySelector('.category'),
        spinner = document.getElementById('spinner')

    // Создаем карточки товаров
    const createGardsGoods = (id, title, price, img) => {
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
                    <button class="card-add-cart" data-goods-id="${id}">Добавить в корзину</button>
                </div>
            </div>
        </div>
        `;
        return card;
    };

    // Открываем корзину
    const openCart = event => {
        event.preventDefault();
        cart.style.display = 'flex';

        document.addEventListener('keyup', closeCart);
    };

    // Закрываем корзину
    const closeCart = event => {
        const target = event.target;

        if (target === cart || target.classList.contains('cart-close') || event.keyCode === 27) {
            cart.style.display = '';
            document.addEventListener('keyup', closeCart);
        }
    };

    // Рендеринг карточек товаров
    const renderCard = items => {
        goodsWrapper.textContent = '';
        items.forEach(({ id, title, price, imgMin }) => {
            goodsWrapper.append(createGardsGoods(id, title, price, imgMin));
        })
    }

    // Извлечение карточек из БД с их последующей фильтрацией и рендиренгом
    const getGoods = (handler, filter) => {
        goodsWrapper.textContent = '';
        spinner.style.display = 'block'
        // return
        setTimeout(() => {
            fetch('http://git.lekua.in.ua/AliJSpress/db/db.json') // извлечение из БД
                .then(response => response.json())
                .then(filter)  // фильтрация
                .then(handler); // рендеринг
            spinner.style.display = 'none'
        }, 1500);
    };

    // Сортировка карточек
    const randomSort = item => item.sort(() => Math.random() - 0.5);

    // Выбор карточек из определенной категории
    const wrapperCategoryFilter = category => goods => goods.filter(item => item.category.includes(category));

    const chooseCategory = event => {
        event.preventDefault();
        const target = event.target;

        if (target.classList.contains('category-item')) {
            const category = target.dataset.category;
            console.log(category);
            // const categoryFilter = goods => goods.filter(item => item.category.includes(category))
            // categoryFilter.bind(this, category)
            const categoryFilter = wrapperCategoryFilter(category);
            getGoods(renderCard, categoryFilter);
        };
    };

    // Навешивание обработчиков 
    cartBtn.addEventListener('click', openCart);
    cart.addEventListener('click', closeCart);
    category.addEventListener('click', chooseCategory);

    // Загрузка карточек пр  инициализации магазина
    getGoods(renderCard, randomSort);


});