document.addEventListener('DOMContentLoaded', function() {
    // تحميل عناصر السلة من localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');
    const subtotalElement = document.querySelector('.subtotal');
    const totalElement = document.querySelector('.total-price');
    const deliveryElement = document.querySelector('.delivery');

    // عرض عناصر السلة
    function displayCartItems() {
        cartContainer.innerHTML = '';
        let subtotal = 0;

        if (cartItems.length === 0) {
            cartContainer.innerHTML = '<p class="empty-cart">سلة التسوق فارغة</p>';
            subtotalElement.textContent = '0 د.ج';
            deliveryElement.textContent = '0 د.ج';
            totalElement.textContent = '0 د.ج';
            return;
        }

        // تجميع المنتجات المتشابهة
        const productCounts = {};
        cartItems.forEach(item => {
            productCounts[item] = (productCounts[item] || 0) + 1;
        });

        // عرض المنتجات
        Object.keys(productCounts).forEach((productId, index) => {
            const product = getProductDetails(productId);
            const quantity = productCounts[productId];
            const itemTotal = product.price * quantity;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="item-details">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price} د.ج</p>
                    <div class="quantity">
                        <button class="qty-btn minus" data-id="${productId}">-</button>
                        <span class="qty">${quantity}</span>
                        <button class="qty-btn plus" data-id="${productId}">+</button>
                    </div>
                    <p class="item-total">المجموع: ${itemTotal.toFixed(2)} د.ج</p>
                </div>
                <button class="remove-item" data-id="${productId}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartContainer.appendChild(cartItem);
            subtotal += itemTotal;
        });

        updateTotals(subtotal);
    }

    // دالة افتراضية للحصول على تفاصيل المنتج
    function getProductDetails(productId) {
        const products = {
            '1': { name: 'المنتج الأول', price: 1500, image: 'img/ازرق.داكن.jpg' },
            '2': { name: 'المنتج الثاني', price: 2500, image: 'img/ازرق.سماوي.jpg' },
            '3': { name: 'المنتج الثالث', price: 3500, image: 'img/اسود.jpg' },
            '4': { name: 'المنتج الرابع', price: 4500, image: 'img/رمادي.jpg' }
        };
        return products[productId] || { name: 'منتج', price: 0, image: 'img/default.jpg' };
    }

    // تحديث الإجماليات
    function updateTotals(subtotal) {
        const delivery = subtotal > 0 ? 700 : 0;
        const total = subtotal + delivery;
        
        subtotalElement.textContent = `${subtotal.toFixed(2)} د.ج`;
        deliveryElement.textContent = `${delivery.toFixed(2)} د.ج`;
        totalElement.textContent = `${total.toFixed(2)} د.ج`;
        د.ج
        // تحديث العداد في الشريط العلوي
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = cartItems.length;
        });
    }

    // التفاعلات
    cartContainer.addEventListener('click', function(e) {
        const target = e.target.closest('.remove-item') || 
                      e.target.closest('.qty-btn.minus') || 
                      e.target.closest('.qty-btn.plus');
        
        if (!target) return;

        const productId = target.dataset.id;
        
        if (target.closest('.remove-item')) {
            // إزالة جميع كميات المنتج
            cartItems = cartItems.filter(id => id !== productId);
        } 
        else if (target.classList.contains('minus')) {
            // إزالة كمية واحدة
            const index = cartItems.indexOf(productId);
            if (index > -1) cartItems.splice(index, 1);
        } 
        else if (target.classList.contains('plus')) {
            // إضافة كمية واحدة
            cartItems.push(productId);
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCartItems();
    });

    // تفعيل قائمة الهانبرجر
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }

    // تهيئة الصفحة
    displayCartItems();
});