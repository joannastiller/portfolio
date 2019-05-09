// SHOW MORE BUTTON

$(function () {
    $("div.project").slice(0, 4).show();
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $("div.project:hidden").slice(0, 4).slideDown();
        if ($("div.project:hidden").length == 0) {
            $("#loadMore").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top - 200
        }, 1500);
    });
});

// SCROLL DOWN MENU

const burger = document.querySelector("i.fa-bars");
const times = document.querySelector("i.fa-times");
const nav = document.querySelector('nav');

burger.addEventListener('click', function () {
    burger.classList.remove('active');
    times.classList.add('active');
    nav.classList.add('active');
})

times.addEventListener('click', function () {
    times.classList.remove('active');
    burger.classList.add('active');
    nav.classList.remove('active');
})

$('nav ul li').on('click', function () {
    $('body, html').animate({
        scrollTop: $("#" + $(this).attr('class')).offset().top
    }, 1000)

    $('i.fa-times').removeClass('active');
    $('i.fa-bars').addClass('active');
    $('nav').removeClass('active');
})

//Back to top button

$('.totop').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 600);
    return false;
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('.totop').fadeIn();
    } else {
        $('.totop').fadeOut();
    }
});

//Stack animation

var $animation_elements = $('.animation-element');
var $window = $(window);

function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function () {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
            $element.addClass('in-view');
        } else {
            $element.removeClass('in-view');
        }
    });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');