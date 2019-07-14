/********** HEADER **********/


$('.close-btn').hide();

$('.open-btn').on('click', function() {
    $(this).hide();
    $('.close-btn').show();
    $('.top-menu').show().css({display: 'flex'});
})

$('.close-btn').on('click', function() {
    $(this).hide();
    $('.open-btn').show();
    $('.top-menu').hide();
})
