'use strict';

(function(){

    function slider(element){
        this.element = element; // .carousel
        this.slides = this.element.querySelector('.carousel__slides').getElementsByClassName('carousel__slide-item');
        this.slidesNumber = this.slides.length;
        this.arrowsNavigation = this.element.querySelector('.carousel__navigation');
        this.dotsNavigation = this.element.querySelector('.carousel__dots-navigation');
        this.dots = this.dotsNavigation.getElementsByClassName('carousel__dot');

        this.selectedSlide = 0; //store the index of the visible slide at 0 => the first slide is by default visible
        this.prevSelectedSlide = 0; // also store the index at 0
        this.intervalId; //store interval id
        this.hovered = false; // check if mouse is over the slide element

        this.bindEvents(); // bind all Listener events
        this.initAutoPlay();
    }

    slider.prototype.bindEvents = function() {
        var self = this;

        //detect click on arrows
        this.arrowsNavigation.addEventListener('click', function(event){
            if(event.target.tagName.toLowerCase() == 'a') {
                event.preventDefault();

                // if(event.target.classList.contains('carousel__arrow-next')){
                //     var newSlideIndex = self.selectedSlide + 1; // move to next index
                // } else {
                //     var newSlideIndex = self.selectedSlide - 1; // move to prev index
                // }

                //determine new slide index
                var newSlideIndex = ( event.target.classList.contains('carousel__arrow-next') ) // condition we want to check
                    ? self.selectedSlide + 1 // use questionmark to execute if the boolean is true
                    : self.selectedSlide - 1; // use colon to execute if the boolean is false

                self.showNewSlide(newSlideIndex); // new function to show new slide base on index
            }
        });

        //detect click on dots navigation
        this.dotsNavigation.addEventListener('click', function(event){
            if( event.target.tagName.toLowerCase() == 'a' ) {
                event.preventDefault();
                //determine new slide index
                var newSlideIndex = elementIndex(event.target.parentElement); // click dots with target parentElement
                self.showNewSlide(newSlideIndex);
            }
        });

        //stop autoplay while hovering over the slider
        this.element.addEventListener('mouseenter', function(){
            self.hovered = true;
            clearInterval(self.intervalId);
        });
        //initialize autoplay when leaving the slider
        this.element.addEventListener('mouseleave', function(){
            self.hovered = false;
            self.initAutoPlay();
        });
    }

    slider.prototype.initAutoPlay = function() {
        var self = this;
        this.intervalId = setInterval(function(){
            self.showNewSlide(self.selectedSlide + 1);
        }, 3000); // auto play slide by 3 sec
    };

    slider.prototype.showNewSlide = function(index) {
        clearInterval(this.intervalId); // stop interval when new slide show
        if (index < 0) index = this.slidesNumber - 1; // if index is below 0 -> show the last slide
        if (index > this.slidesNumber - 1) index = 0; // if index is greater then slidesNumber-1 -> show the first slide
        this.prevSelectedSlide = this.selectedSlide // update prev slide to selected slide
        this.selectedSlide = index; // Retrieve newSlideIndex

        // console.log(this.selectedSlide); // check if it works

        for( var i = 0; i < this.slidesNumber; i++) {
            if (i < this.selectedSlide) { // if selected slide is greater > show to the left from the viewport
                this.slides[i].classList.add('move-left');
                this.slides[i].classList.remove('selected', 'visible'); // make sure that selected slide doesnt contain class 'selected' + if the slider isnt selected remove visible
                this.dots[i].classList.remove('selected');  // remove prev selected dot
            } else if (i == this.selectedSlide) {
                this.slides[i].classList.add('selected');
                this.slides[i].classList.remove('move-left'); // make sure that selected slide doesnt contain class 'move-left'
                this.dots[i].classList.add('selected');
            } else {
                this.slides[i].classList.remove('selected', 'move-left', 'visible');
                this.dots[i].classList.remove('selected');
            }
        }
        this.slides[this.prevSelectedSlide].classList.add('visible'); // add prev selectedSlide visible class to fix bug
        if( !this.hover ) this.initAutoPlay(); // if hover is false return autoplay & default return autoplay
    };

    function elementIndex(element) {
        var siblings = element.parentElement.children; // store sibling of current element => retrieve parentElement with all childeren
        for ( var i = 0; i < siblings.length; i++){
            if(siblings[i] == element) return i; // get element we are lookin for
        }
        return -1; // provide an fallback -> if there is an error or doesnt retrieve parent elemeent
    }

    // 1) Initialize the object of Slider
    var sliders = document.getElementsByClassName('carousel');
    for(var i = 0; i < sliders.length; i++) {
        // Need JS closure => for event listeners of slider object
        (function(i){
            new slider(sliders[i]);
        }(i));
    }

}());
