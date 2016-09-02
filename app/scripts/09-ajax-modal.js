'use strict';

(function($){
    var modalTrigger = $('.morph-modal__btn');
    var modalWindow = $('.morph-modal');
    var modalBg = modalWindow.children('.morph-modal__background');
    var modalContent = modalWindow.children('.morph-modal__content');

    function getElementPosition(trigger){
        var top = trigger.offset().top - $(window).scrollTop();  // subract window document and set vertical scroll that matched element
        var left = trigger.offset().left; //offset retrieve the current position of relative

        return [top, left];
    }

    function evaluateScale(element, position){
        var scaleY = scaleValue(position[0], element.innerHeight(), $(window).height()); // topValue, heightElement(button), windowHeight
        var scaleX = scaleValue(position[1], element.innerWidth(), $(window).width());  // leftValue, widthElement(button), windowWidth
        return [scaleY, scaleX];
    }

    function scaleValue(firstCoordinate, elementDimension, windowDimension) {
        //retrieve bottom value
        var secondCoordinate = windowDimension - firstCoordinate - elementDimension; // heightWindow - topElement - heightElement
        var maxCoordinate = Math.max(firstCoordinate, secondCoordinate); // return max number value
        var scaleValue = (maxCoordinate*2 + elementDimension) / elementDimension; // final Height of element / initial height

        return Math.ceil(scaleValue*10)/10; //round up decimal value
    }

    //listen to the click on the modal trigger buttons
    modalTrigger.on('click', function(event){
        event.preventDefault();
        var selectedModalTrigger = $(this);
        //retrieve href of trigger
        var modalId = selectedModalTrigger.attr('href').replace('#', '');

        // remove this 2 lines, use 1 modal with different content -> retrieve from ajax
        // var selectedModalWindow = modalWindow.filter(modalId); // select morph-modal with the filter ID
        // var selectedMorphBg = selectedModalWindow.children('.morph-modal__background');

        //show the modal window
        modalWindow.addClass('morph-modal--open');

        //retrieve the trigger position
        var triggerPosition = getElementPosition(selectedModalTrigger); // return array back

        // retrieve scale value
        var scaleValues = evaluateScale(modalBg, triggerPosition);

        modalBg.css({
            'top': triggerPosition[0] + 'px',
            'left': triggerPosition[1] + 'px',
            'transform': 'scaleX(' + scaleValues[1] + ') scaleY(' + scaleValues[0] + ')',
        }).one('transitionend', function(){ // listen the transition event just once

            // modalContent.load(modalId+'.html', function(response, status){
            //  if( status == 'error' ) {
            //      modalContent.html('<p class="error">Sorry there was an error.</p>');
            //  }
            // modalContent.addClass('morph-modal--visible');
            // modalWindow.children('.morph-modal__btn-close').addClass('morph-modal--visible');
            // });

            // when the content loaded => show content
            $.ajax({
                method: 'GET', // define method POST or GET for request
                url: modalId+'.html', // document url what handle the request
                beforeSend: function() { // before the request send -> show loading
                    modalWindow.addClass('loading');
                },
                success: function(data) { // retrieve content(data)
                    modalContent.html(data);
                },
                error: function() {
                    modalContent.html('<p class="error">Sorry there was an error.</p>');
                },
                complete: function() {
                    modalWindow.removeClass('loading');
                    modalContent.addClass('morph-modal--visible');
                    modalWindow.children('.morph-modal__btn-close').addClass('morph-modal--visible');
                }
            });
        });
    });

    //listen to the click on the close-modal buttons
    modalWindow.on('click', '.morph-modal__btn-close', function(event){
        // remove this 2 lines, use 1 modal with different content -> retrieve from ajax
        // var selectedModalWindow = $(this).parent('.morph-modal'); // remeber: this refers to the element that just clicked (close-modal)
        // var modalBg = selectedModalWindow.children('.morph-modal__background');

        //hide the modal content
        modalWindow.children('.morph-modal__btn-close').removeClass('morph-modal--visible');
        modalContent.removeClass('morph-modal--visible');

        //scaleDown modal background
        modalBg.css({
            'transform': 'scaleX(1) scaleY(1)' //remeber 1 is the default value for the css scale tranfrom
        }).one('transitionend', function(){
            //wait for the transition to be over -> hide modal window
            modalWindow.removeClass('morph-modal--open');
        });
    });

}(jQuery)); // = $
