// Demo data
const MENU = [
    // Шаурма
    { id: 'shawarma-classic', name: 'Шаурма в обычном лаваше', price: 150, category: 'Шаурма', img: 'images/basic_shawarma.jpg' },
    { id: 'shawarma-cheese-wrap', name: 'Шаурма в сырном лаваше', price: 150, category: 'Шаурма', img: 'images/shawarma.jpg' },
    { id: 'shawarma-with-cheese', name: 'Шаурма с сыром', price: 180, category: 'Шаурма', img: 'images/cheese_shawarma.jpg' },
    { id: 'shawarma-plate', name: 'Шаурма на тарелке', price: 180, category: 'Шаурма', img: 'images/shawarma_on_plate.jpg' },
    { id: 'shawarma-xxl', name: 'Шаурма XXL', price: 230, category: 'Шаурма', img: 'images/shawarma_XXL.jpg' },

    // Бургеры
    { id: 'burger-beef', name: 'Бургер с говядиной', price: 180, category: 'Бургеры', img: 'images/burger_with_beef_patty.jpg' },
    { id: 'burger-chicken', name: 'Бургер с курицей', price: 180, category: 'Бургеры', img: 'images/burger_shef_pomidorom.jpg' },
    { id: 'burger-marble', name: 'Бургер мраморный', price: 250, category: 'Бургеры', img: 'images/black_XXL_burger.jpg' },
    { id: 'burger-sausage', name: 'Бургер с куриной сосиской', price: 180, category: 'Бургеры', img: 'images/pork_burger.jpg' },

    // Хот-доги
    { id: 'hotdog-danish', name: 'Хот-дог датский', price: 160, category: 'Хот-доги', img: 'images/hotdog.jpg' },
    { id: 'hotdog-french', name: 'Хот-дог французский', price: 160, category: 'Хот-доги', img: 'images/franchdog.jpg' },

    // Картофель
    { id: 'potato-rustic', name: 'Картофель деревенский', price: 90, category: 'Картофель', img: 'images/country_patato.jpg' },
    { id: 'potato-fries', name: 'Картофель фри', price: 80, category: 'Картофель', img: 'images/fried_patato.jpg' },

    // Напитки
    { id: 'drink-sprite', name: 'Спрайт', price: 60, category: 'Напитки', img: 'images/sprite.jpeg' },
    { id: 'drink-fanta', name: 'Фанта', price: 60, category: 'Напитки', img: 'images/fanta.jpg' },
    { id: 'drink-cola', name: 'Кола', price: 60, category: 'Напитки', img: 'images/cocacola.jpg' },
    { id: 'drink-water', name: 'Вода минеральная', price: 50, category: 'Напитки', img: 'images/water.jpg' },
    { id: 'drink-beer', name: 'Пиво в ассортименте', price: 100, category: 'Напитки', img: 'images/beard.jpg' },
    { id: 'drink-tea-coffee-small', name: 'Чай / Кофе (мал.)', price: 70, category: 'Напитки', img: 'images/tea.jpg' },
    { id: 'drink-tea-coffee-medium', name: 'Чай / Кофе (сред.)', price: 100, category: 'Напитки', img: 'images/tea.jpg' },
    { id: 'drink-tea-coffee-large', name: 'Чай / Кофе (бол.)', price: 120, category: 'Напитки', img: 'images/tea.jpg' },
];

const CATEGORIES = [
    'Все', 'Шаурма', 'Бургеры', 'Хот-доги', 'Картофель', 'Напитки'
];

const cart = {};

function renderMenu(items){
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = '';
    items.forEach(item=>{
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `
        ${item.img ? `<img alt="${item.name}" src="${item.img}">` : ''}
        <div class="card-body">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
            <strong>${item.name}</strong>
            <div class="price">${item.price} ₽</div>
        </div>
        <div class="chips">
            ${item.category ? `<span class="chip">${item.category}</span>` : ''}
        </div>
        <div class="cta" style="margin-top:10px;">
            <button class="btn btn-primary" data-add="${item.id}">В корзину</button>
            <button class="btn" data-custom="${item.id}">Настроить</button>
        </div>
        </div>
    `;
    grid.appendChild(el);
    });
    bindItemButtons();
}

function bindItemButtons(){
    document.querySelectorAll('[data-add]').forEach(btn=>{
    btn.onclick = () => {
        const id = btn.getAttribute('data-add');
        cart[id] = cart[id] ? {...cart[id], qty: cart[id].qty + 1} : {item: MENU.find(m=>m.id===id), qty:1};
        openModal();
        renderCart();
    };
    });
    document.querySelectorAll('[data-custom]').forEach(btn=>{
    btn.onclick = () => {
        const id = btn.getAttribute('data-custom');
        cart[id] = cart[id] ? cart[id] : {item: MENU.find(m=>m.id===id), qty:1};
        openModal();
        renderCart();
    };
    });
    document.querySelectorAll('[data-combo]').forEach(btn=>{
    btn.onclick = () => {
        const combo = btn.getAttribute('data-combo');
        if (combo==='fire'){ addById('classic'); addById('cheese'); }
        if (combo==='two'){ addById('classic'); addById('spicy'); }
        openModal(); renderCart();
    };
    });
}

function addById(id){
    cart[id] = cart[id] ? {...cart[id], qty: cart[id].qty + 1} : {item: MENU.find(m=>m.id===id), qty:1};
}

function renderCart(){
    const list = document.getElementById('cart-list');
    list.innerHTML = '';
    let total = 0;
    Object.values(cart).forEach(({item, qty})=>{
    total += item.price * qty;
    const li = document.createElement('div');
    li.className = 'cart-item';
    li.innerHTML = `
        <div>
        <strong>${item.name}</strong>
        <div class="section-desc">${item.price} ₽${item.spicy?'остро':'мягко'}${item.vegan?'веган':''}</div>
        </div>
        <div class="qty">
        <button data-dec="${item.id}">-</button>
        <span>${qty}</span>
        <button data-inc="${item.id}">+</button>
        <button class="btn" data-rm="${item.id}" style="margin-left:8px;">Удалить</button>
        </div>
    `;
    list.appendChild(li);
    });
    document.getElementById('total').textContent = total + ' ₽';

    document.querySelectorAll('[data-inc]').forEach(b=> b.onclick = ()=>{
    const id = b.getAttribute('data-inc'); cart[id].qty++; renderCart();
    });
    document.querySelectorAll('[data-dec]').forEach(b=> b.onclick = ()=>{
    const id = b.getAttribute('data-dec'); cart[id].qty = Math.max(1, cart[id].qty-1); renderCart();
    });
    document.querySelectorAll('[data-rm]').forEach(b=> b.onclick = ()=>{
    const id = b.getAttribute('data-rm'); delete cart[id]; renderCart();
    });
}

// Filters
CATEGORIES.forEach((item, index)=>{
    document.getElementById('categories').innerHTML += `<button class="btn" id="categoty-${index}">${item}</button>`
});

CATEGORIES.forEach((item, index)=>{
    document.getElementById(`categoty-${index}`).onclick = ()=> renderMenu(item == 'Все' ? MENU : MENU.filter((m)=>m.category==item));
});

// Modal
const modal = document.getElementById('modal');
function openModal(){ modal.style.display = 'grid'; }
function closeModal(){ modal.style.display = 'none'; }
document.getElementById('btn-order').onclick = openModal;
document.getElementById('btn-order-2').onclick = openModal;
document.getElementById('close-modal').onclick = closeModal;
modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });

document.getElementById('submit-order').onclick = ()=>{
    const name = document.getElementById('inp-name').value.trim();
    const phone = document.getElementById('inp-phone').value.trim();
    const address = document.getElementById('inp-address').value.trim();
    const note = document.getElementById('inp-note').value.trim();
    const items = Object.values(cart);
    if(!items.length){ alert('Добавьте что-нибудь в корзину'); return; }
    if(!name || !phone || !address){ alert('Заполните имя, телефон и адрес'); return; }

    const order = {
    name, phone, address, note,
    items: items.map(x=>({id:x.item.id, name:x.item.name, qty:x.qty, price:x.item.price})),
    total: items.reduce((s,x)=> s + x.item.price*x.qty, 0),
    time: new Date().toLocaleString('ru-RU')
    };
    console.log('ORDER:', order);
    alert('Спасибо! Заказ принят. Мы свяжемся с вами в ближайшее время.');
    closeModal();
};

// Init
renderMenu(MENU);