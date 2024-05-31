const noteInput = document.getElementById('noteInput');
const archiveBtn = document.getElementsByClassName('archiveBtn');
const trashBtn = document.getElementsByClassName('trashBtn');
const notesContainer = document.getElementById('notesContainer');
const menu = document.getElementById('menu-btn');
const sidebar = document.getElementsByClassName('sidebar_div')
const sidebar_label = document.getElementsByTagName("span");

let notesArr = [];
let currentRow = 0;

if (localStorage.getItem("noteTexts")) {
    let arr = JSON.parse(localStorage.getItem("noteTexts"));
    notesArr = arr

    for (let i=0; i < arr.length; i++) {
        const noteBox = document.createElement('div');
        noteBox.classList.add('note-box');
        const noteContent = document.createElement('p');
        noteContent.textContent = arr[i];
        noteBox.appendChild(noteContent);
        noteBox.insertAdjacentHTML('beforeend','<span id="pencil"><img src="img/pen.png" alt="archive" width="15px" height="15px" class="note-btn"></span>');
        noteBox.insertAdjacentHTML('beforeend','<span class="archiveBtn"><img src="img/archive.png" alt="archive" width="15px" height="15px" class="note-btn"></span>');
        noteBox.insertAdjacentHTML('beforeend','<span class="trashBtn"><img src="img/trash.png" alt="archive" width="15px" height="15px" class="note-btn"></span>');

        let x = JSON.parse(localStorage.getItem("currentRow"))
        if(!currentRow || x.childElementCount === 2){
            var currentRow3 = document.createElement('div');
            currentRow3.classList.add('note-row');
            notesContainer.appendChild(currentRow3);
        }
        if (!currentRow) {
            currentRow3.appendChild(noteBox);
        }
        localStorage.setItem("currentRow", x + 1);
        noteInput.value = '';
    }
}

noteInput.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        const noteText = noteInput.value.trim();
        if(noteText !== ''){
            const noteBox = document.createElement('div');
            noteBox.classList.add('note-box');
            const noteContent = document.createElement('p');
            noteContent.textContent = noteText;
            notesArr.push(noteText)
            localStorage.setItem("noteTexts", JSON.stringify(notesArr));    
            noteBox.appendChild(noteContent);
            noteBox.insertAdjacentHTML('beforeend','<span id="pencil"><img src="img/pen.png" alt="archive" width="15px" height="15px" class="note-btn"></span>');
            noteBox.insertAdjacentHTML('beforeend','<span class="archiveBtn"><img src="img/archive.png" alt="archive" width="15px" height="15px" class="note-btn"></span>');
            noteBox.insertAdjacentHTML('beforeend','<span class="trashBtn"><img src="img/trash.png" alt="archive" width="15px" height="15px" class="note-btn"></span>');


            if(noteText.length >= 30){
                noteBox.classList.add('small');
            }

            let x = JSON.parse(localStorage.getItem("currentRow"))
            if(!currentRow || x.childElementCount === 2){
                var currentRow2 = document.createElement('div');
                currentRow2.classList.add('note-row');
                notesContainer.appendChild(currentRow2);
            }

            currentRow2.appendChild(noteBox);
            localStorage.setItem("currentRow", x + 1);
            noteInput.value = '';
            location.reload()
        }
    }
});

searchInput.addEventListener('input', function(){
        const query = searchInput.value.toLowerCase();
        const notes = document.querySelectorAll('.note-box');

        notes.forEach(note => {
            const noteText = note.textContent.toLowerCase();
            const firstLetter = noteText.charAt(0);
            if(noteText.includes(query) || firstLetter === query){
                note.style.display = '';
            }else{
                note.style.display = 'none';
            }
    });
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let x = [];
menu.addEventListener('click', async function(){
    for (let i = 0; i < sidebar.length; i++) {
        if (sidebar[i].style.width == '30px') {
            sidebar[i].style.width = '250px'
        }else {
            sidebar[i].style.width = '30px'
        };
    }

    if (x.length == 0) { 
        for (let i = 0; i < sidebar_label.length; i++) {
            x[i] = sidebar_label[i].innerHTML
        }
    }
    for (let i = 0; i < sidebar_label.length; i++) {
        if (sidebar_label[i].innerHTML == '') {
            if (i == 2) {
                await sleep(200)
            }
            sidebar_label[i].innerHTML = x[i]
            
        }else {
            sidebar_label[i].innerHTML = ''
        }
    }

});

let archiveArr = []
if (archiveBtn) {
    for (let i = 0; i < archiveBtn.length; i++) {
        archiveBtn[i].addEventListener('click', function() {
            if (localStorage.getItem("archiveNotes")) {
                let x = JSON.parse(localStorage.getItem("archiveNotes"))
                archiveArr = x
            }
            let text = trashBtn[i].parentElement.firstChild.textContent
            archiveArr.push(text)
            localStorage.setItem("archiveNotes", JSON.stringify(archiveArr))
            const index = notesArr.indexOf(text);
            if (index > -1) {
                notesArr.splice(index, 1);
            }
            trashBtn[i].parentElement.style.display = 'none'
            localStorage.setItem("noteTexts", JSON.stringify(notesArr));
        })
    }
}

let trashArr = []
if (trashBtn) {
    for (let i = 0; i < trashBtn.length; i++) {
        trashBtn[i].addEventListener('click', function() {
            if (localStorage.getItem("trashNotes")) {
                let x = JSON.parse(localStorage.getItem("trashNotes"))
                trashArr = x
            }
            let text = trashBtn[i].parentElement.firstChild.textContent
            trashArr.push(text)
            localStorage.setItem("trashNotes", JSON.stringify(trashArr))
            const index = notesArr.indexOf(text);
            if (index > -1) {
                notesArr.splice(index, 1);
            }
            trashBtn[i].parentElement.style.display = 'none'
            localStorage.setItem("noteTexts", JSON.stringify(notesArr));
        })
    }
}