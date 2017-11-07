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
  // $('.hamb').click()
})
