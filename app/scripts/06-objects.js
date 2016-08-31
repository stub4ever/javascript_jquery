'use strict';

(function($){
    var modalWindow = $('.morph-modal');

    // Js Constuctor
    function morphModal(element, trigger) {
        this.element = element; // refer single element of morphModalObjects
        this.trigger = trigger; // Refer to generic modal buttonId that trigger
        this.morphBg = this.element.children('.morph-modal__background');
        this.closeBtn = this.element.children('.morph-modal__btn-close');
        this.morphBgPosition = [0, 0];
        this.morphBgScale = [1, 1]; // value scale 1 by default

        this.bindEvents(); // bind events function for all objects (properties) > inside the constructor
    }

    morphModal.prototype.bindEvents = function() { // call events of objects(properties) outside the constructor
        // console.log(this); // check where this element refer
        var self = this; // able to refer target of the event and not instance object anymore -> inside the callback method

        // listen to click on trigger button
        this.trigger.on('click', function(event){
            event.preventDefault();
            self.open(); // = function open();
        });

        this.closeBtn.on('click', function(event){
            self.close(); // = function close();
        });
    }

    morphModal.prototype.open = function() {
        var self = this;

        //show the modal window
        // selectedModalWindow.addClass('morph-modal--open');
        this.element.addClass('morph-modal--open');

         //retrieve the trigger position
        // var triggerPosition = getElementPosition(selectedModalTrigger);
        this.morphBgPosition = getElementPosition(this.trigger);

        // retrieve scale value
        // var scaleValues = evaluateScale(selectedMorphBg, triggerPosition);
        this.morphBgScale = evaluateScale(this.morphBg, this.morphBgPosition);

        //move and scale morphing background
        // selectedMorphBg.css({
        //     'top': triggerPosition[0] + 'px',
        //     'left': triggerPosition[1] + 'px',
        //     'transform': 'scaleX(' + scaleValues[1] + ') scaleY(' + scaleValues[0] + ')',
        // }).one('transitionend', function(){ // listen the transition event just once
        //     //wait for the transition to be over -> show modal content
        //     selectedModalWindow.children('.morph-modal__content').addClass('morph-modal--visible');
        //     selectedModalWindow.children('.morph-modal__btn-close').addClass('morph-modal--visible');
        // });
        this.morphBg.css({
            'top': this.morphBgPosition[0] + 'px',
            'left': this.morphBgPosition[1] + 'px',
            'transform': 'scaleX(' + this.morphBgScale[1] + ') scaleY(' + this.morphBgScale[0] + ')',
        }).one('transitionend', function(){ // listen the transition event just once
            //wait for the transition to be over -> show modal content
            self.element.children('.morph-modal__content').addClass('morph-modal--visible');
            self.closeBtn.addClass('morph-modal--visible');
        });
    };

    morphModal.prototype.close = function() {
        var self = this;

        // hide the modal content
        // selectedModalWindow.children('.morph-modal__btn-close').removeClass('morph-modal--visible');
        this.closeBtn.removeClass('morph-modal--visible');
        // selectedModalWindow.children('.morph-modal__content').removeClass('morph-modal--visible');
        this.element.children('.morph-modal__content').removeClass('morph-modal--visible');

        //scaleDown modal background
        // selectedMorphBg.css({
        //     'transform': 'scaleX(1) scaleY(1)' //remeber 1 is the default value for the css scale tranfrom
        // }).one('transitionend', function(){
        //     //wait for the transition to be over -> hide modal window
        //     selectedModalWindow.removeClass('morph-modal--open');
        // });
        this.morphBg.css({
            'transform': 'scaleX(1) scaleY(1)'
        }).one('transitionend', function(){
            self.element.removeClass('morph-modal--open');
        });
    };

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

    // Define Element objects
    var morphModalObjects = [];
    modalWindow.each(function(){
        var modal = $(this);
        var modalTrigger = $('button[href="#'+ modal.attr('id')+'"]'); // From another element

        // add element to array
        morphModalObjects.push( new morphModal(modal, modalTrigger) ); // refer modalWindow that iteration > pass element itself
    });

}(jQuery)); // = $
