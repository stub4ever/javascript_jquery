'use strict';

(function($){
    var pageSections = $('.animated-section'); //#1

    function animateScroll(){ //#4
        // console.log('scrolling'); // test events scrolling
        var windowScroll = $(window).scrollTop(); // #6
        pageSections.each(function(){ // jquery each method #5
            var singleSection = $(this);
            // if( singleSection.offset().top <= windowScroll ){    // #7 if this offset top value is lesser or equal
            //     singleSection.addClass('fixed'); // add fixed class to the content
            // } else {
            //     singleSection.removeClass('fixed'); // remove fixed class to the content
            // }
            singleSection.toggleClass('fixed', singleSection.offset().top <= windowScroll);

            // singleSection.toggleClass('fixed', singleSection.offset().top <= windowScroll); // if the element doesnt has class fixed -> add itself or otherwise remove it
        });
        scrolling = false;// update scrolling to false;
    }

    var scrolling = false;
    // Scroll events
    $(window).on('scroll', function(){ //#2
        if( !scrolling ) { // if scrolling is false = > excute te code
            scrolling = true; // Updating scrolling true;

            ( !window.requestAnimationFrame ) // if window browse doesnt support requestAnimationFrame
                ? setTimeout(animateScroll, 250) // return fallback if requestAnimationFrame is not defined
                : requestAnimationFrame(animateScroll); // Else Return requestAnimationFrame
        }
    });
    // by default update section even when scrolling is different
    animateScroll(); //#3

}(jQuery)); // = $
