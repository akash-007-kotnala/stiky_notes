console.log('This is console and it is working');
showNotes();

// adding the notes , add it to the localStorage.

let addbtn = document.getElementById("addBtn");
addbtn.addEventListener("click", function (e) {
    console.log('button was clicked');
    let addtitle = document.getElementById("title");
    let addtext = document.getElementById("textarea");

    if(addtitle.value == 0 && addtext.value == 0)
    {
       alert('Title and text cannot be empty!!!');

    }
else{
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    let objitem = {
    text:addtext.value,
    title:addtitle.value
    }

    noteObj.push(objitem);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    addtext.value = "";
    addtitle.value = "";
}
    console.log(noteObj);
    showNotes();

});


//  Function to show the elements from the localStorage

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }

    let html = "";

    noteObj.forEach(function (element, index) {

        html += 
        `
        <div class=" noteCard my-2 mx-2" style="width: 18rem; background-color: bisque;">
        <div class="card-body"> 
            <h5 class="card-title">${index + 1} : ${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button  id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-danger my-2 my-sm-0" type="submit">Delete</button>
        </div>
    </div>`;
    });

    let noteElm = document.getElementById("notes");
    if (noteObj.length != 0) {
        noteElm.innerHTML = html;
    }
    else {
        noteElm.innerHTML = `There is nothing to show here!! Click on <strong>"Add note" </strong>in the above section to add a sctiky note`;
    }
}


// Function to delete a note
function deleteNote(index) {
    

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}


// searching the values..

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        
        console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        
        else {
            element.style.display = "none";
    
        }
        
        
    })
})
