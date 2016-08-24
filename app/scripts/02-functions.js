'use strict';


(function(){

    function updateTabs(e, navigation, content){
        var queryVal = 'section' + e.target.hash; //li + '#id';
        e.preventDefault();

        if (!e.target.classList.contains('selected')) { // e.target.classList.contains('selected') === false
            // Update the top navigation
            navigation.querySelector('a.selected').classList.remove('selected'); // remove current class selected
            e.target.classList.add('selected'); // add class selected

            // Update content
            content.querySelector('section.selected').classList.remove('selected');
            content.querySelector(queryVal).classList.add('selected');

            return queryVal; //access variable outside this function scope
        }
    }

    var tabsContainerList = document.getElementsByClassName('tab'); // take every classes 'tab'
    var TotalTabLinks = 0;
    for( var i = 0; i < tabsContainerList.length; i++) {
        (function(i){  // closure function - remember the value of increment loops
            var tabContainer = tabsContainerList[i]; // add increment
            // var tabContainer = document.getElementsByClassName('tab')[0]; // take only one class 'tab'
            var tabNavigation = tabContainer.querySelector('.tab__navigation'); // acces only 1 selector from the dom
            var tabContent = tabNavigation.nextElementSibling;
            TotalTabLinks = TotalTabLinks + tabNavigation.querySelectorAll('.tab__item-link').length; // get sum of total tab__navigation > all '<a>' links

            // Listen to the click on top nav <a>
            tabNavigation.addEventListener('click', function(event){
                // Show the new content
                if (event.target.tagName.toLowerCase() === 'a'){ // return when 'a' is string
                    var functionVar = updateTabs(event, tabNavigation, tabContent); //insert variables in the parameter
                    console.log(functionVar); // return query value of the function 'updateTabs'
                }
            });
        }(i));
    }
    console.log(TotalTabLinks); // return total number of tablinks
}());
