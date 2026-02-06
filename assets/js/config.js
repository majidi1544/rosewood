// assets/js/config.js

const WoodCraftConfig = {
    // پالت رنگ
    colors: {
        primary: '#8B4513',      // قهوه‌ای اصلی (SaddleBrown)
        secondary: '#D2691E',    // قهوه‌ای/نارنجی (Chocolate)
        accent: '#A0522D',       // قهوه‌ای متوسط (Sienna)
        light: '#F5F0E1',        // بژ/کرم
        dark: '#2A1C16',         // قهوه‌ای تیره
        textLight: '#F8F5F0',    // متن روشن
        textDark: '#2A1C16',     // متن تیره
        textMuted: '#A1887F'     // متن خاکستری
    },

    // تنظیمات سکشن‌ها
    sections: {
        hero: {
            bgColor: 'linear-gradient(135deg, #2A1C16 0%, #3A261E 100%)',
            textColor: 'light',
            overlay: 'rgba(30, 20, 16, 0.85)'
        },
        about: {
            bgColor: 'linear-gradient(135deg, #F8F4F0 0%, #EFE6DC 100%)',
            textColor: 'dark',
            overlay: 'rgba(255, 255, 255, 0.9)'
        },
        services: {
            bgColor: 'linear-gradient(rgba(43,29,23,0.9), rgba(54,38,30,0.9))',
            textColor: 'light',
            overlay: 'rgba(43, 29, 23, 0.85)'
        },
        portfolio: {
            bgColor: 'linear-gradient(135deg, #FFFFFF 0%, #F3EEE7 100%)',
            textColor: 'dark',
            overlay: 'rgba(255, 255, 255, 0.95)'
        },
        blog: {
            bgColor: 'linear-gradient(135deg, #FCFAF7 0%, #F5F0E9 100%)',
            textColor: 'dark',
            overlay: 'rgba(255, 255, 255, 0.92)'
        },
        contact: {
            bgColor: 'linear-gradient(135deg, #2b1d17 0%, #3a261e 100%)',
            textColor: 'light',
            overlay: 'rgba(43, 29, 23, 0.9)'
        }
    },

    // عکس‌های پس‌زمینه
    backgroundImages: {
        hero: 'assets/images/2.jpeg',
        about: 'assets/images/portfolio-5.jpg',
        services: 'assets/images/portfolio-4.jpg',
        portfolio: 'assets/images/portfolio-3.jpg',
        blog: 'assets/images/portfolio-2.jpg',
        contact: 'assets/images/portfolio-1.jpg'
    }
};

// توابع کمکی
const WoodCraftUtils = {
    // اعمال استایل به سکشن
    applySectionStyle(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section || !WoodCraftConfig.sections[sectionId]) return;

        const config = WoodCraftConfig.sections[sectionId];

        // اعمال رنگ متن
        section.style.color = WoodCraftConfig.colors[`text${config.textColor.charAt(0).toUpperCase() + config.textColor.slice(1)}`];

        // ایجاد یا به‌روزرسانی overlay
        let overlay = section.querySelector('.section-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'section-overlay';
            section.prepend(overlay);
        }

        overlay.style.background = config.bgColor;
    },

    // بارگذاری عکس پس‌زمینه
    loadBackgroundImage(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section || !WoodCraftConfig.backgroundImages[sectionId]) return;

        const img = new Image();
        img.src = WoodCraftConfig.backgroundImages[sectionId];

        img.onload = () => {
            section.style.backgroundImage = `url('${img.src}')`;
            section.style.backgroundSize = 'cover';
            section.style.backgroundPosition = 'center';
            section.style.backgroundAttachment = 'fixed'; // افکت پارالاکس
        };
    },

    // مقداردهی اولیه تمام سکشن‌ها
    initAllSections() {
        Object.keys(WoodCraftConfig.sections).forEach(sectionId => {
            this.applySectionStyle(sectionId);
            this.loadBackgroundImage(sectionId);
        });
    },

    // ریسپانسیو کردن المان‌ها
    makeResponsive() {
        const handleResize = () => {
            const width = window.innerWidth;

            // تنظیمات بر اساس سایز صفحه
            if (width < 768) {
                document.body.classList.add('mobile-view');
                document.body.classList.remove('tablet-view', 'desktop-view');
            } else if (width < 992) {
                document.body.classList.add('tablet-view');
                document.body.classList.remove('mobile-view', 'desktop-view');
            } else {
                document.body.classList.add('desktop-view');
                document.body.classList.remove('mobile-view', 'tablet-view');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // اجرای اولیه
    }
};

// راه‌اندازی هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', () => {
    WoodCraftUtils.initAllSections();
    WoodCraftUtils.makeResponsive();

    // اعمال رنگ‌ها به متغیرهای CSS
    const root = document.documentElement;
    Object.entries(WoodCraftConfig.colors).forEach(([key, value]) => {
        root.style.setProperty(`--wood-${key}`, value);
    });
});

// در دسترس قرار دادن گلوبال
window.WoodCraftConfig = WoodCraftConfig;
window.WoodCraftUtils = WoodCraftUtils;