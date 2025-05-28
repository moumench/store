// تفعيل قائمة الهانبرجر للجوال
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // تأثيرات التنقل عند التمرير
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        navbar.style.background = window.scrollY > 50 
            ? 'rgba(255, 255, 255, 0.95)' 
            : '#fff';
        navbar.style.boxShadow = window.scrollY > 50 
            ? '0 4px 12px rgba(0, 0, 0, 0.1)' 
            : '0 2px 10px rgba(0, 0, 0, 0.1)';
    });
});
