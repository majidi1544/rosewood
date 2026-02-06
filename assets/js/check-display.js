// assets/js/check-display.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ صفحه بارگذاری شد');

    // چک کردن نمایش المان‌ها
    const checkElements = [
        '#top',
        '#about',
        '#services',
        '#portfolio',
        '#blog',
        '#contact'
    ];

    checkElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            const rect = element.getBoundingClientRect();
            console.log(`${selector}:`, {
                visible: rect.top < window.innerHeight && rect.bottom >= 0,
                top: rect.top,
                height: rect.height,
                zIndex: getComputedStyle(element).zIndex
            });
        }
    });

    // اگر هنوز مشکلی بود، این کد رو اجرا کن
    setTimeout(() => {
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            section.style.position = 'relative';
            section.style.zIndex = (index + 1).toString();
        });
    }, 1000);
});