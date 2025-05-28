document.addEventListener('DOMContentLoaded', function() {
    // تحديث عداد السلة
    updateCartCount();
    
    // تفعيل قائمة الهانبرجر
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelector('.cart-count').textContent = cart.length;
}