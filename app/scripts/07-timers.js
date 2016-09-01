'use strict';

(function(){
    // setTimeout(function(){
    //     console.log('1');
    // }, 1000); //delay 1s

    var indexTopics = document.getElementsByClassName('index-topic')[0].querySelectorAll('li'); // select first element -> index-topic

// #1

    // function showIndex(array, n) {
    //     array[n].classList.add('visible');

    //     if( array.length > n + 1){ // if array is greater then 1
    //         setTimeout(function(){
    //             showIndex(array, n+1); // show -> array[n+1]
    //         }, 500); // .5s delay
    //     }
    // }

    // showIndex(indexTopics, 0); //start from 0

// #2

    // var n = 0;

    // var intervalID = setInterval(function(){ // method execute repeatly every 0.5s
    //     if(indexTopics.length > n){
    //         indexTopics[n].classList.add('visible');
    //         n++;
    //     } else {
    //         clearInterval(intervalID); // clear interval -> passing id -> if false it stop repeat
    //     }
    //     // console.log('test');  // after the 5 times it shows there no topics left to be shown
    // }, 500);

// #3

    // var timeoutID = setTimeout(function(){
    //     console.log('test');
    // }, 1000);
    // clearInterval(timeoutID); // no output -> this method clear interval before the code execute

// #4

    // by default scrolling = false
    var scrolling = false;

    function onScrolling() {
        console.log('scrolling');
        // after the code is executed it the variable return false again
        scrolling = false;
    }

    window.addEventListener('scroll', function(event){ // scroll listener
        // console.log('scrolling'); // print scroll output > fire only the function
            if ( !scrolling) { // check scrolling if false to execute setTimeout
                scrolling = true;

                // this methods are handy to break continous events for performance

                // requestAnimationFrame(onScrolling); // this work the same as setTimeOut -> the browser excute itself delay execution
                // setTimeout(onScrolling, 250); // In the parameter execution .25s delay this function

                // support browse 9
                // if(!window.requestAnimationFrame) {
                //     setTimeout(onScrolling, 250);
                // } else {
                //     requestAnimationFrame(onScrolling); // @new jquery version 3 has this method
                // }

                (!window.requestAnimationFrame) ? setTimeout(onScrolling, 250) : requestAnimationFrame(onScrolling);
            }
    });



}()); // = $
