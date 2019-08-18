/***** Advanced JS. Prototypes. HomeWork_03. Field with colors (Event bubbling). *****/

;
(()=>{

// Создать поле 30*30 из белых клеточек с помощью элемента <table>.

const $table = $(`<table class="table"></table>`);
$table.insertAfter($('h1'));

for (let y = 1; y <= 30; y++) {
    let $row = $(`<tr class="row row__${y}"></tr>`);
    $row.appendTo($table);
    for (let x = 1; x <= 30; x++) {
        let $cell = $(`<td class="cell cell__${y}.${x}"></td>`);
        $cell.appendTo($row);
    }
};


// изменить цвет при клике:

$('body').on('click', function(event) {

    //При клике на клеточку она должна менять цвет

    if ($(event.target).hasClass('cell')) {
        $(event.target).toggleClass('cell--black');
    } else if ($(event.target).hasClass('table') || $(event.target).hasClass('row') ) {
        return;

    //При клике на любое место документа вне таблицы, все цвета клеточек должны поменяться на противоположные.

    } else {
        $table.toggleClass('table--black');
    }
});

})();