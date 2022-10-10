console.log("Hello Programmers");

showNotes()

let addBtn = document.getElementById("addBtn")
addBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let addTitle = document.getElementById('addTitle')
    let addTxt = document.getElementById('addTxt')
    if (addTxt.value === "") {
        alert("Fields are empty!!!")
    } else {
        let notes = localStorage.getItem('notes')
        if (notes == null) {
            notesObj = []
        } else {
            notesObj = JSON.parse(notes);
        }
        let myObj = {
            title: addTitle.value,
            text: addTxt.value
        }
        notesObj.push(myObj)
        localStorage.setItem('notes', JSON.stringify(notesObj))
        addTitle.value = ""
        addTxt.value = ""
        showNotes()
    }
})

function showNotes(element, index) {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = ""
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style=" width: 20rem;">
        <div class="card-body">
        <h4 class="card-title">${element.title}</h4>
        <p class="card-text"> ${element.text}</p>
        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete ToDo</button>
        </div>
        </div>
        `
    })
    let notesElem = document.getElementById('notes')
    if (notesObj.length !== 0) {
        notesElem.innerHTML = html;
    } else {
        notesElem.innerHTML = `<h5>Nothing to show! Use "Add ToDo" to add your todo's.</h5>`
    }
}

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

let search = document.getElementById('searchTxt')
search.addEventListener('input', function searchNotes() {
    let input = search.value
    if (input == "") {
        showNotes()
    } else {
        input = input.toLowerCase();
        let x = document.getElementsByClassName('noteCard');

        for (i = 0; i < x.length; i++) {
            if (!x[i].innerHTML.toLowerCase().includes(input)) {
                x[i].style.display = "none";
            }
            else {
                x[i].style.display = "noteCard";
            }
        }
    }
})

let form = document.getElementById('formgroup')
form.addEventListener('submit', function (e) {
    e.preventDefault()
})