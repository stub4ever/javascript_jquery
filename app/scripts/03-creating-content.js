'use strict';

(function(){

    /*------------------------------------*\
        # Return parent of elements - function helper
    \*------------------------------------*/

    function getAncestor(el, ancestorClass) {
        var parent = el.parentElement;
        if( !parent.classList.contains(ancestorClass) ) {
            parent = getAncestor(parent, ancestorClass);
        }
        return parent;
    }

    var createNewList = document.querySelector('.todo__list--add');
    var placeholderCreateList = getAncestor(createNewList, 'todo__card-list--create');
    var placeholderListInput = placeholderCreateList.querySelector('.placeholder__tittle-input');
    var saveNewList = placeholderCreateList.querySelector('.todo__card-list--save');
    var todoWrapper = placeholderCreateList.parentElement; // get parent element

    function createList(event){
        var newList = document.createElement('ul');
        var newListName = placeholderListInput.value;
        var newListContent = '<li class="todo__card-list__tittle">' + newListName + '</li><li class="todo__card-item--create"><div class="todo__card-content"><input type="text" placeholder="add card tittle" class="placeholder__tittle-input" ><textarea placeholder="add card description" class="placeholder__description-area"></textarea></div><div class="todo__card-actions"><button class="btn__action todo__card-item--add">Add New Card</button><button class="btn__action todo__card-item--save">Save Card</button></div></li>'
        newList.setAttribute('class', 'todo__card-list');
        newList.innerHTML = newListContent;
        todoWrapper.insertBefore(newList, placeholderCreateList);

        //reset input
        placeholderCreateList.classList.remove('editing');
        placeholderListInput.value = '';
    };

    function createCard(event){
        var placeholderCreateCard = getAncestor(event.target, 'todo__card-item--create');
        placeholderCreateCard.classList.add('editing');
        placeholderCreateCard.querySelector('.placeholder__tittle-input').focus();
    }

    function saveCard(event){
        var editingCard = getAncestor(event.target, 'todo__card-item--create');
        var list = editingCard.parentElement;
        // Get card content value input
        var cardTittle = editingCard.querySelector('.placeholder__tittle-input').value;
        var cardDescription = editingCard.querySelector('.placeholder__description-area').value;
        // Create new card content
        var newCard = document.createElement('li');
        var newCardContent = '<div class="todo__card-content"><h2 class="todo__card-tittle">' + cardTittle + '</h2><p class="todo__card-description">' + cardDescription + '</p></div>'
        newCard.setAttribute('class', 'todo__card-item');
        newCard.innerHTML = newCardContent;
        // // Insert card
        list.insertBefore(newCard, editingCard);
        //reset .create-card element
        editingCard.classList.remove('editing');
        editingCard.querySelector('.placeholder__tittle-input').value = '';
        editingCard.querySelector('.placeholder__description-area').value = '';
    }

    // When click add list > show input & auto focus + save button
    createNewList.addEventListener('click', function(event){
        placeholderCreateList.classList.add('editing');
        placeholderListInput.focus(); // auto focus by default
    });

    // When click save list > insert a new list
    saveNewList.addEventListener('click', function(event){
        createList();
    });

    todoWrapper.addEventListener('click', function(event){
        // When click add card > show title & description input
        if(event.target.classList.contains('todo__card-item--add')) {
            createCard(event);

        // When click save card > insert a new card
        } else if(event.target.classList.contains('todo__card-item--save')){
            saveCard(event);
        }
    });

}());
