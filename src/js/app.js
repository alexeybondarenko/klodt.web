//=include lib/jquery.js
//=include lib/slick.js

console.log('App is running')

$(document).ready(function () {
  $('.hamb').on('click', function() {
    $(this).toggleClass('hamb_active')
    $('.nav').toggleClass('nav_active')
    $(document.documentElement).toggleClass('disable-scroll')
  })

  $('.nav-submenu-item').on('click', function (e) {
    e.stopPropagation()
  })

  $('.nav__item_with-submenu').hover(function () {
    $(document.documentElement).addClass('nav-submenu-openned')
  }, function () {
    $(document.documentElement).removeClass('nav-submenu-openned')
  })

  function isMobileNav () {
    return document.body.offsetWidth < 1024;
  }

  $('.nav__item_with-submenu > a').on('click', function (e) {
    if (!isMobileNav()) return;
    var parent = $(this).parent('.nav__item_with-submenu')
    var hasClass = parent.hasClass('nav__item_active-submenu')

    e.preventDefault()
    e.stopPropagation()
    $('.nav__item_with-submenu').removeClass('nav__item_active-submenu')
    if (!hasClass) parent.addClass('nav__item_active-submenu')
  })

  $('.slider').each(function () {
    $(this).find('.slider__items').slick({
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      arrows: false,
      appendDots: $(this).find('.slider__dots')
    });
  })

  $('.gallery').each(function () {
    $(this).find('.gallery__items').slick({
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      arrows: false,
      // appendDots: $(this).find('.slider__dots')
    });
  })

  $('.gallery').each(function () {
    var $this = $(this)
    var $previews = $(this).find('.gallery-previews .gallery-previews__item')
    var $sliderIndicators = $(this).find('.gallery__slider-indicator')
    var $items = $(this).find('.gallery-image__image')
    var slickInstance = $this.find('.gallery-image__images').slick({
      infinite: true,
      arrows: false,
    })
    $(this).find('.gallery-image__arrow-left').on('click', function () {
      slickInstance.slick('slickPrev')
    })
    $(this).find('.gallery-image__arrow-right').on('click', function () {
      slickInstance.slick('slickNext')
    })
    slickInstance.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      $previews.removeClass('active')
      $previews.eq(nextSlide).addClass('active')
      $sliderIndicators.text(`${nextSlide + 1}/${$items.length}`)
    })
    $previews.on('click', function () {
      var index = $previews.index(this)
      slickInstance.slick('slickGoTo', index)
    })
    slickInstance.slick('slickGoTo', 0)
  })
})
