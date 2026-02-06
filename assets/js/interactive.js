// assets/js/interactive.js

const WoodCraftInteractive = {
    // فیلتر نمونه کارها
    initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // حذف کلاس active از همه دکمه‌ها
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // اضافه کردن کلاس active به دکمه کلیک شده
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // فیلتر کردن آیتم‌ها
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    },

    // فرم چندمرحله‌ای تماس
    initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const steps = form.querySelectorAll('.form-step');
        const prevBtn = form.querySelector('.prev-btn');
        const nextBtn = form.querySelector('.next-btn');
        const submitBtn = form.querySelector('.submit-btn');
        let currentStep = 0;

        const showStep = (stepIndex) => {
            steps.forEach((step, index) => {
                step.classList.toggle('active', index === stepIndex);
            });

            // مدیریت نمایش دکمه‌ها
            prevBtn.disabled = stepIndex === 0;
            nextBtn.style.display = stepIndex < steps.length - 1 ? 'block' : 'none';
            submitBtn.style.display = stepIndex === steps.length - 1 ? 'block' : 'none';
        };

        nextBtn?.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        });

        prevBtn?.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });

        // ارسال فرم
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const successMessage = form.querySelector('.success-message');
            if (successMessage) {
                successMessage.classList.add('active');
            }
        });
    },

    // بازگشت به بالا
    initBackToTop() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTopBtn.className = 'back-to-top-btn';
        backToTopBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 30px;
      width: 50px;
      height: 50px;
      background: var(--wood-secondary);
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 1.2rem;
      cursor: pointer;
      z-index: 1000;
      opacity: 0;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

        document.body.appendChild(backToTopBtn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.transform = 'translateY(0)';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.transform = 'translateY(20px)';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    },

    // انیمیشن اسکرول
    initScrollAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        // مشاهده المان‌های دارای کلاس wow
        document.querySelectorAll('.wow').forEach(el => {
            observer.observe(el);
        });
    },

    // مقداردهی اولیه
    init() {
        this.initPortfolioFilter();
        this.initContactForm();
        this.initBackToTop();
        this.initScrollAnimations();

        console.log('WoodCraft Interactive initialized');
    }
};

// راه‌اندازی
document.addEventListener('DOMContentLoaded', () => {
    WoodCraftInteractive.init();
});