document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger'),
        mainNav = document.querySelector('.main-nav');

    burger.addEventListener('click', function () {
        this.classList.contains('active') ? (this.classList.remove('active'), mainNav.classList.remove('active'), document.body.classList.remove('no-scroll')) : (this.classList.add('active'), mainNav.classList.add('active'), document.body.classList.add('no-scroll'));
    });

    const toTopButton = document.querySelector('.to-top');

    toTopButton.addEventListener('click', () => {
        document.body.scrollIntoView({
            behavior: 'smooth'
        });
    })

    if(window.innerWidth > 992) {
        $('.header-nav__item-have-submenu').click(function(e) {
            $(this).toggleClass('active');
        });
    }

    function openAccordion() {
        var wrap = $('.accordion-wrap');
        var accordion = wrap.find('.accordion-item-title');

        accordion.on('click', function () {
          var $this = $(this);
          var $parent = $(this).parent();
          var content = $this.next();

          if (content.is(':visible')) {
            $this.removeClass('active');
            $parent.removeClass('active');
            content.slideUp('fast');
          } else {
            $this.addClass('active');
            $parent.addClass('active');
            content.slideDown('fast');
          }

        });
    }
    openAccordion();

    function OpenPopup(popupId) {
        $('body').removeClass('no-scrolling');
        $('.popup').removeClass('js-popup-show');
        popupId = '#' + popupId;
        $(popupId).addClass('js-popup-show');
        $('body').addClass('no-scrolling');
    }
    $('.pop-op').click(function (e) {
        e.preventDefault();
        let data = $(this).data('popup');
        OpenPopup(data);
    });
    function closePopup() {
        $('.js-close-popup').on('click', function (e) {
            e.preventDefault();
            $('.popup').removeClass('js-popup-show');
            $('body').removeClass('no-scrolling');
        });
    }
    closePopup();
    function clickClosePopup(popupId) {
        popupId = '#' + popupId;
        $(popupId).removeClass('js-popup-show');
        $('body').removeClass('no-scrolling');
    }

    if($('.cart-button').length) {
        $(window).on('scroll load', function () {
            var top = $(window).scrollTop();
            var destination = $('.cart-button-wrapper').offset().top-800;
            var btn = $('.cart-button').offset().top
            var wrapper = $('.cart-button-wrapper').offset().top;
            console.log('top '+top, 'destination '+top, 'btn '+btn, 'wrapper '+wrapper)
            if(btn >= wrapper) {
                $('.cart-button').removeClass('fixed');
            }
            if(top < destination) {
                $('.cart-button').addClass('fixed');
            }
        });
    }

    let slider_facts = $('.facts-slider');
    if (slider_facts.length) {
        slider_facts.owlCarousel({
            center: false,
            items: 7,
            margin: 15,
            loop: true,
            nav: false,
            dots: true,
            autoHeight: false,
            mouseDrag: true,
            touchDrag: true,
            navSpeed: 1300,
            responsive: {
                0: {
                    center: true,
                    items: 2,
                },
                767: {
                    center: true,
                    items: 5,
                    margin: 20
                },
                1100: {
                    items: 7
                }
            }
        });
    }

    if($(window).innerWidth() > 767) {
        $('.recipe-static').mouseenter(function(e){
            let url = $(this).data('recipe');
            let html = 'img/recipes/'+url+'.gif'
            $(this).next().attr('src', html);

            dataLayer.push({'event': url});

            $('.recipe-static').mouseleave(function(e){
                url, html = null;
                $(this).next().attr('src', '');
            });
        });
    }

    let slider_recipes = $('.recipes-slider');
    if (slider_recipes.length) {
        slider_recipes.owlCarousel({
            center: false,
            items: 3,
            margin: 30,
            loop: false,
            nav: true,
            dots: true,
            autoHeight: false,
            mouseDrag: true,
            touchDrag: true,
            navSpeed: 1300,
            responsive: {
                0: {
                    items: 1,
                    margin: 10,
                    nav: false
                },
                767: {
                    items: 2,
                    margin: 15
                },
                1100: {
                    items: 3
                }
            }
        });

        if($(window).innerWidth() < 768) {
            let elem = slider_recipes.find('.owl-item.active .recipe-static');
            let url = elem.data('recipe');
            let html = 'img/recipes/'+url+'.gif'
            elem.next().attr('src', html);

            slider_recipes.on('changed.owl.carousel', function(event) {
                setTimeout(function() {
                    let prev_slide = slider_recipes.find('.owl-item.active').prev();
                    let elem = slider_recipes.find('.owl-item.active .recipe-static');
                    let url = elem.data('recipe');
                    let html = 'img/recipes/'+url+'.gif'
                    elem.next().attr('src', html);
                    prev_slide.find('.recipe-static').next().attr('src', '');
                }, 100)
            });
        }
    }
});