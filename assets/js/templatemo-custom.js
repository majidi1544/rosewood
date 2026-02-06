(function ($) {
	
	"use strict";

	// Header Type = Fixed
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var box = $('.header-text').height();
    var header = $('header').height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });

// فیلتر نمونه کارها
    document.addEventListener('DOMContentLoaded', function() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // حذف کلاس active از همه دکمه‌ها
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // اضافه کردن کلاس active به دکمه کلیک شده
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                // نمایش/مخفی کردن آیتم‌ها بر اساس فیلتر
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.6s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    });
	$('.owl-our-team').owlCarousel({
		items:3,
		loop:true,
		dots: true,
		nav: false,
		autoplay: true,
		margin:0,
		  responsive:{
			  0:{
				  items:1
			  },
			  600:{
				  items:2
			  },
			  1000:{
				  items:3
			  },
			  1600:{
				  items:3
			  }
		  }
	})
	

	// Menu Dropdown Toggle
  if($('.menu-trigger').length){
    $(".menu-trigger").on('click', function() { 
      $(this).toggleClass('active');
      $('.header-area .nav').slideToggle(200);
    });
  }


  // Menu elevator animation
  $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        var width = $(window).width();
        if(width < 991) {
          $('.menu-trigger').removeClass('active');
          $('.header-area .nav').slideUp(200);  
        }       
        $('html,body').animate({
          scrollTop: (target.offset().top) + 1
        }, 700);
        return false;
      }
    }
  });

  $(document).ready(function () {
      $(document).on("scroll", onScroll);
      
      //smoothscroll
      $('.scroll-to-section a[href^="#"]').on('click', function (e) {
          e.preventDefault();
          $(document).off("scroll");
          
          $('.scroll-to-section a').each(function () {
              $(this).removeClass('active');
          })
          $(this).addClass('active');
        
          var target = this.hash,
          menu = target;
          var target = $(this.hash);
          $('html, body').stop().animate({
              scrollTop: (target.offset().top) + 1
          }, 500, 'swing', function () {
              window.location.hash = target;
              $(document).on("scroll", onScroll);
          });
      });
  });

  function onScroll(event){
      var scrollPos = $(document).scrollTop();
      $('.nav a').each(function () {
          var currLink = $(this);
          var refElement = $(currLink.attr("href"));
          if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
              $('.nav ul li a').removeClass("active");
              currLink.addClass("active");
          }
          else{
              currLink.removeClass("active");
          }
      });
  }



	// Page loading animation
	 $(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });

    // فیلتر پورتفولیو
    document.addEventListener('DOMContentLoaded', function() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const counterCurrent = document.querySelector('.filter-counter .current');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // حذف active از همه دکمه‌ها
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // اضافه کردن active به دکمه کلیک شده
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                // شمارش آیتم‌های نمایش داده شده
                let visibleCount = 0;

                // فیلتر کردن آیتم‌ها
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.remove('hidden');
                        visibleCount++;

                        // انیمیشن ورود
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';

                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.classList.add('hidden');
                    }
                });

                // به‌روزرسانی شمارنده
                if (counterCurrent) {
                    counterCurrent.textContent = visibleCount;
                }

                // افکت کلیک روی دکمه
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });

        // باز کردن تصویر در حالت بزرگ
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const portfolioCard = this.closest('.portfolio-card');
                const image = portfolioCard.querySelector('img');

                // ایجاد مودال برای نمایش بزرگ تصویر
                const modal = document.createElement('div');
                modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

                const modalImg = document.createElement('img');
                modalImg.src = image.src;
                modalImg.alt = image.alt;
                modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            `;
// در فایل js خود اضافه کنید یا در تگ script
                document.addEventListener('DOMContentLoaded', function() {
                    // ایجاد دکمه بازگشت به بالا
                    const backToTopBtn = document.createElement('button');
                    backToTopBtn.className = 'back-to-top-btn';
                    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
                    backToTopBtn.setAttribute('aria-label', 'بازگشت به بالا');
                    document.body.appendChild(backToTopBtn);

                    // نمایش/مخفی کردن دکمه هنگام اسکرول
                    window.addEventListener('scroll', function() {
                        if (window.pageYOffset > 300) {
                            backToTopBtn.classList.add('visible');
                        } else {
                            backToTopBtn.classList.remove('visible');
                        }
                    });

                    // اسکرول به بالا
                    backToTopBtn.addEventListener('click', function() {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    });
                });
                modal.appendChild(modalImg);
                document.body.appendChild(modal);

                // انیمیشن ورود
                setTimeout(() => {
                    modal.style.opacity = '1';
                    modalImg.style.transform = 'scale(1)';
                }, 10);

                // بستن مودال با کلیک
                modal.addEventListener('click', function() {
                    modal.style.opacity = '0';
                    modalImg.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 300);
                });
            });
        });
    });

	// Window Resize Mobile Menu Fix
  function mobileNav() {
    var width = $(window).width();
    $('.submenu').on('click', function() {
      if(width < 767) {
        $('.submenu ul').removeClass('active');
        $(this).find('ul').toggleClass('active');
      }
    });
  }




})(window.jQuery);