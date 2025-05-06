/*
Author: Mr.Brian Design
Author URL: http://mrbriandesign.com
*/
jQuery(function ($) {
    'use strict';

    // Scroll event handler
    $(window).scroll(function () {
        Scroll();
    });

    // Smooth scrolling for navigation links
    $('.navbar-collapse ul li a').on('click', function (e) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 5
            }, 1000);
        } else {
            console.error("Target element not found for hash:", this.hash);
        }
    });

    // Scroll function to highlight active menu item
    function Scroll() {
        var contentTop = [];
        var contentBottom = [];
        var winTop = $(window).scrollTop();
        var rangeTop = 200;
        var rangeBottom = 500;

        $('.navbar-collapse').find('.scroll a').each(function () {
            var target = $($(this).attr('href'));
            if (target.length) {
                contentTop.push(target.offset().top);
                contentBottom.push(target.offset().top + target.height());
            }
        });

        $.each(contentTop, function (i) {
            if (winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom) {
                $('.navbar-collapse li.scroll')
                    .removeClass('active')
                    .eq(i).addClass('active');
            }
        });
    }

    // Smooth scrolling for #tohash links
    $('#tohash').on('click', function (e) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 5
            }, 1000);
        } else {
            console.error("Target element not found for hash:", this.hash);
        }
    });

    // Initialize WOW.js for animations
    new WOW().init();

    // Initialize smoothScroll
    if (typeof smoothScroll !== 'undefined') {
        smoothScroll.init();
    } else {
        console.warn("smoothScroll is not defined.");
    }

    // Portfolio filtering with Isotope
    $(window).on('load', function () {
        var $portfolioSelectors = $('.portfolio-filter > li > a');
        var $portfolio = $('.portfolio-items');

        if ($portfolio.length && typeof $.fn.isotope !== 'undefined') {
            $portfolio.isotope({
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows'
            });

            $portfolioSelectors.on('click', function (e) {
                e.preventDefault();
                $portfolioSelectors.removeClass('active');
                $(this).addClass('active');
                var selector = $(this).attr('data-filter');
                $portfolio.isotope({
                    filter: selector
                });
            });
        } else {
            console.warn("Isotope is not initialized or portfolio items are missing.");
        }
    });

    // Animate numbers
    $(document).ready(function () {
        $.fn.animateNumbers = function (stop, commas, duration, ease) {
            return this.each(function () {
                var $this = $(this);
                var start = parseInt($this.text().replace(/,/g, ""), 10) || 0;
                commas = commas === undefined ? true : commas;

                $({ value: start }).animate({ value: stop }, {
                    duration: duration || 1000,
                    easing: ease || "swing",
                    step: function () {
                        $this.text(Math.floor(this.value));
                        if (commas) {
                            $this.text($this.text().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
                        }
                    },
                    complete: function () {
                        if (parseInt($this.text(), 10) !== stop) {
                            $this.text(stop);
                            if (commas) {
                                $this.text($this.text().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
                            }
                        }
                    }
                });
            });
        };

        $('.business-stats').on('inview', function (event, visible) {
            var $this = $(this);
            if (visible) {
                $this.animateNumbers($this.data('digit'), false, $this.data('duration'));
                $this.off('inview');
            }
        });
    });

    // Initialize PrettyPhoto
    if ($.fn.prettyPhoto) {
        $("a[rel^='prettyPhoto']").prettyPhoto({
            social_tools: false
        });
    } else {
        console.warn("PrettyPhoto is not initialized.");
    }
});