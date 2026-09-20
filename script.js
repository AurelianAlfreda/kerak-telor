
$(document).ready(function () {

    $('.faq-answer').hide();
    $('.faq-question').on('click', function () {
        var jawaban = $(this).next('.faq-answer');
        $('.faq-answer').not(jawaban).slideUp();
        $('.faq-question').not(this).removeClass('open');
        jawaban.slideToggle();
        $(this).toggleClass('open');

    });

});