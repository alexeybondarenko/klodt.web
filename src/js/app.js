//=include lib/jquery.js
//=include lib/jquery.chocolat.js
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
    var $this = $(this)
    var $previews = $(this).find('.gallery-previews .gallery-previews__item')
    var $sliderIndicators = $(this).find('.gallery__slider-indicator')
    var $items = $(this).find('.gallery-image__image')
    var slickInstance = $this.find('.gallery-image__images').slick({
      infinite: true,
      arrows: false,
    })
    $(this).Chocolat({
      imageSelector: '.gallery-image__image:not(.slick-cloned)',
      imageSize: 'contain'
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

  const INSTAGRAM_NAME = 'oa_london'
  function addImages(element, images = []) {
    images.forEach((image) => {
      const link = document.createElement('a')
      const img = document.createElement('img')
      const inner = document.createElement('span')

      img.src = image.thumbnail_resources[0].src;
      img.alt = image.caption

      link.href = `https://instagram.com/p/${image.code}`
      link.rel = "noreferrer nofollow"
      link.target = "__blank"

      inner.classList.add('instagram-widget__in')

      inner.appendChild(img)
      link.appendChild(inner)

      element.append(link)
    })
  }

  $.get(`https://www.instagram.com/${INSTAGRAM_NAME}/?__a=1`)
  .then((resp) => {
    const images = resp.user.media.nodes.slice(0, 4);
    $('.js-instagram-widget').each(function () {
      addImages($(this), images)
    })
  })

})
