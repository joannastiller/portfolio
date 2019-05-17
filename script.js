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

//BACK TO TOP

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

//STACK ANIMATION

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
        if ((element_bottom_position >= window_top_position - 100) &&
            (element_top_position <= window_bottom_position)) {
            $element.addClass('in-view');
        } else {
            $element.removeClass('in-view');
        }
    });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');


// INPUT VALIDATION

// Add the novalidate attribute when the JS loads
var forms = document.querySelectorAll('.validate');
for (var i = 0; i < forms.length; i++) {
    forms[i].setAttribute('novalidate', true);
}

// Validate the field
var hasError = function (field) {

    // Don't validate submit field
    if (field.type === 'submit') return;

    // Get validity
    var validity = field.validity;

    // If valid, return null
    if (validity.valid) return;

    // If field is required and empty
    if (validity.valueMissing) return 'Wypełnij to pole';

    // If not the right type
    if (validity.typeMismatch) {
        if (field.type === 'email') return 'Wpisz poprawny adres e-mail';
    }

    // If too short
    if (validity.tooShort) return 'Wpisana wartość jest za krótka. Musi mieć co najmniej ' + field.getAttribute('minLength') + ' znaków. W tej chwili jest ' + field.value.length + ' znaków.';

    // If too long
    if (validity.tooLong) return 'Skróć wartość do ' + field.getAttribute('maxLength') + ' znaków. W tej chwili jest ' + field.value.length + ' znaków.';

    // If pattern doesn't match
    if (validity.patternMismatch) {

        // If pattern info is included, return custom error
        if (field.hasAttribute('title')) return field.getAttribute('title');

        // Otherwise, generic error
        return 'Wpisz poprawną wartość';

    }
    // If all else fails, return a generic catchall error
    return 'Sprawdź, czy pole jest wypełnione prawidłowo';
};

//Show an error message
var showError = function (field, error) {

    // Add error class to field
    field.classList.add('error');

    // Get field id or name
    var id = field.id || field.name;
    if (!id) return;

    // Check if error message field already exists
    // If not, create one
    var message = field.form.querySelector('.error-message#error-for-' + id);
    if (!message) {
        message = document.createElement('div');
        message.className = 'error-message';
        message.id = 'error-for-' + id;
        field.parentNode.insertBefore(message, field.nextSibling);
    }

    // Add ARIA role to the field
    field.setAttribute('aria-describedby', 'error-for-' + id);

    // Update error message
    message.innerHTML = error;

    // Show error message
    message.style.display = 'block';
    message.style.visibility = 'visible';

};

// Remove the error message
var removeError = function (field) {

    // Remove error class to field
    field.classList.remove('error');

    // Remove ARIA role from the field
    field.removeAttribute('aria-describedby');

    // Get field id or name
    var id = field.id || field.name;
    if (!id) return;

    // Check if an error message is in the DOM
    var message = field.form.querySelector('.error-message#error-for-' + id + '');
    if (!message) return;

    // If so, hide it
    message.innerHTML = '';
    message.style.display = 'none';
    message.style.visibility = 'hidden';

};

// Listen to all blur events
document.addEventListener('blur', function (event) {

    // Only run if the field is in a form to be validated
    if (!event.target.form.classList.contains('validate')) return;

    // Validate the field
    var error = hasError(event.target);

    // If there's an error, show it
    if (error) {
        showError(event.target, error);
        return;
    }

    // Otherwise, remove any existing error message
    removeError(event.target);

}, true);

// Check all fields on submit
document.addEventListener('submit', function (event) {

    // Only run on forms flagged for validation
    if (!event.target.classList.contains('validate')) return;

    // Get all of the form elements
    var fields = event.target.elements;

    // Validate each field
    // Store the first field with an error to a variable so we can bring it into focus later
    var error, hasErrors;
    for (var i = 0; i < fields.length; i++) {
        error = hasError(fields[i]);
        if (error) {
            showError(fields[i], error);
            if (!hasErrors) {
                hasErrors = fields[i];
            }
        }
    }

    // If there are errors, don't submit form and focus on first element with error
    if (hasErrors) {
        event.preventDefault();
        hasErrors.focus();
    }

    // Otherwise, let the form submit normally
}, false);