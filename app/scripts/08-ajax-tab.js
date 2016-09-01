'use strict';

(function(){

    function updateTabs(e, navigation, content){
        var docName = e.target.hash.replace('#', '');  // replace # with empty string
        e.preventDefault();

        if (!e.target.classList.contains('selected')) { // e.target.classList.contains('selected') === false
            // Update the top navigation
            navigation.querySelector('a.selected').classList.remove('selected'); // remove current class selected
            e.target.classList.add('selected'); // add class selected

            //update tab content
            content.classList.add('loading'); // add class loading -> give user an better idea whats happening
            setTimeout(function(){ // call ajax after 1s delay // able to test display loading
                myAjaxCall(content, docName);
            }, 1000);
        }
    }

    function myAjaxCall(content, docName){ // .tab__content + name of file
        var xhr = new XMLHttpRequest();

        xhr.onload = function(){ //XMLHttpRequest  has own events detect onload -> fired when the server respond

            content.classList.remove('loading');
            if( xhr.status === 200) { // check server status
                // replace the tab content with new content
                content.innerHTML = xhr.responseText;
            } else {
                // show error message
                content.innerHTML = 'There was an error';
            }
        }

        // Prepare Request by using open method
        xhr.open('GET', docName+ '.html');// get -> retrieve new gallery from html file

        // Send request to the server
        xhr.send();
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
                    updateTabs(event, tabNavigation, tabContent); //insert variables in the parameter
                }
            });
        }(i));
    }

}()); // = $
