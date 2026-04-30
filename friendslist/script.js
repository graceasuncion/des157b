// JS here
(function(){
    'use strict';
    console.log('reading.js');

    Parse.initialize("lYMGLuciwQ4dC1iKiXENi0S66w4XAC12xz9wud3z","MEdSU8HPdZAysA9zApR3SXeDMMKYch5IgBGnMnZv"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = 'https://parseapi.back4app.com/';


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

    async function displayFriends() {
    const friends = Parse.Object.extend('Friends');
    const query = new Parse.Query(friends);
    const results = await query.ascending('lname').find();
    console.log(results);
}

displayFriends();

})();