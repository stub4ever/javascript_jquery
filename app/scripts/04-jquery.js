'use strict';

(function($){

    var paragraph = $('p');
    var span = paragraph.children();
    var firstBlock = paragraph.parent('.block:first-of-type');
    var secondBlock = paragraph.parent().siblings('.block:nth-of-type(2)');

    var listItems = $('.my-roadmap-list').children();

    // listItems.eq(1).addClass('topic-item-2'); // this add only the second item of list
    // listItems.each(function(index){  // add class with index
    //     $(this).addClass('topic-item-' + (index + 1));
    // });

    var evenListItems = listItems.filter(':even'); //css even selector
    // evenListItems.css('background-color', 'black').css('color', 'white'); // give styling even number on each styling

    var newListItem = $('<li class="topic-item">insert this item in the list on the dom</li>');
    // var firstNewItem = newListItem.insertBefore(listItems.eq(0));
    // var lastNewItem = newListItem.insertAfter(listItems.eq(8));

    firstBlock.children(paragraph).on('click', function(event){
        firstBlock.addClass('selected');
        span.addClass('name').addClass('is--displayed');
        secondBlock.removeClass('selected');
        secondBlock.children('p').css('font-size', '1em').css('margin-bottom', '5px');

    });

    secondBlock.on('click', 'p', function(event){
        $(this).css('font-size', '30px').css('margin-bottom', '20px');
        secondBlock.addClass('selected');
        firstBlock.removeClass('selected');
        span.removeClass('name').removeClass('is--displayed');
    });
    // console.log(secondBlock[0].classList); // check classList on browse


}(jQuery)); // = $
