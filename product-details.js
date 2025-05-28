document.addEventListener('DOMContentLoaded', function() {
    // تفعيل قائمة الهانبرجر
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }

    // معالجة معرّف المنتج من URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // تفاعل الصور المصغرة
document.querySelectorAll('.thumbnails img').forEach(thumb => {
    thumb.addEventListener('click', function() {
        const mainImage = document.querySelector('.main-image');
        mainImage.src = this.src.replace('100', '500');
            
            // إضافة تأثير التنشيط للصورة المحددة
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });

// تفاعل زيادة/تقليل الكمية
document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const qtyElement = this.parentElement.querySelector('.qty');
        let qty = parseInt(qtyElement.textContent);
        
        if (this.textContent === '+' && qty < 10) {
            qty++;
        } else if (this.textContent === '-' && qty > 1) {
            qty--;
        }
        
        qtyElement.textContent = qty;
    });
});

    // إضافة إلى السلة
    document.querySelector('.add-to-cart').addEventListener('click', function() {
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const qty = parseInt(document.querySelector('.qty').textContent);
        
        for (let i = 0; i < qty; i++) {
            currentCart.push(productId);
        }
        
        localStorage.setItem('cart', JSON.stringify(currentCart));
        updateCartCountGlobal();
        alert('تمت إضافة المنتج إلى السلة');
    });

    // دالة لتحديث العداد في جميع الصفحات
    function updateCartCountGlobal() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        cartCountElements.forEach(element => {
            element.textContent = cart.length;
        });
    }
});