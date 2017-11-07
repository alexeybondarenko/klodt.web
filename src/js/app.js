//=include lib/jquery.js
//=include lib/slick.js

console.log('App is running')

$(document).ready(() => {
  $('.hamb').on('click', function() {
    $(this).toggleClass('hamb_active')
    $('.nav').toggleClass('nav_active')
    $(document.documentElement).toggleClass('disable-scroll')
  })

  $('.nav-submenu-item').on('click', function (e) {
    e.stopPropagation()
  })
  $('.nav__item_with-submenu > a').on('click', function (e) {
    e.preventDefault()
    e.stopPropagation()
    $(this).parent('.nav__item_with-submenu').toggleClass('nav__item_active')
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
    var $this = $(this)
    var $previews = $(this).find('.gallery-previews .gallery-previews__item')
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
      console.log('afterChange', slick, currentSlide)
      $previews.removeClass('active')
      $previews.eq(currentSlide).addClass('active')
    })
    $previews.on('click', function () {
      var index = $previews.index(this)
      slickInstance.slick('slickGoTo', index + 1)
    })
    slickInstance.slick('slickGoTo', 1)
  })
})
