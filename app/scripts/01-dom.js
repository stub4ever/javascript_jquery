'use strict';

// read @ https://github.com/desandro/classie
// Using plugin class helper function
// - support classList & old browsers fallback

(function(){
    var modalTrigger = document.getElementsByClassName('modal--trigger')[0];
    var modal = document.getElementById('modal');
    var modalClose = document.getElementById('modal--close');

    // detect the click on the class .modal--trigger
    // ^ open the modal window
    modalTrigger.addEventListener('click', function(event){
        event.preventDefault();  // => unable url link #modal--msg
        // modal.setAttribute('class', 'is--visible');  => overwrite class
        // modal.classList.add('is-visible');           => doesnt support old browser
        classie.add(modal, 'is--visible');
    });

    // Detect the click #close--modal
    // ^ close modal window
    modalClose.addEventListener('click', function(event){
        // modal.removeAttribute('class');      => remove all classes of #modal
        // modal.classList.remove('is-visible');
        classie.remove(modal, 'is--visible');
    });

    document.addEventListener('keyup', function(event){
        // ^ if esc has been released (esc keycode = 27) - close the modal window
        if(event.keyCode == 27) {
            classie.remove(modal, 'is--visible');
        }
    });
})();


