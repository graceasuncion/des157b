// JS here
(function(){
    'use strict';
    console.log('reading.js');

    const newBtn = document.querySelector("#newbtn");
    const editBtns = document.querySelector(".fa-edit");
    const addFriendForm = document.querySelector("#add-friend");
    const editFriendForm = document.querySelector("#edit-friend");

    newBtn.addEventListener("click",function(event){
        event.preventDefault();
        addFriendForm.className = "add-friend-onscreen";
    })

    addFriendForm.addEventListener("submit",function(event){
        event.preventDefault();
        addFriendForm.className = "add-friend-offscren";
    });

    for(let i=0; i<editBtns.length; i++){
        editBtns[i].addEventListener("click",function(event){
            event.preventDefault();
            editFriendForm.className = "edit-friend-onscreen";
        })
    }

    editFriendForm.addEventListener("submit",function(event){
        event.preventDefault();
        editFriendForm.className = "edit-friend-offscreen";
    })

})();