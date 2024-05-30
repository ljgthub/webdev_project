const noteInput = document.getElementById('noteInput');
const notesContainer = document.getElementById('notesContainer');
const menu = document.getElementById('menu-btn');
const sidebar = document.getElementsByClassName('sidebar_div')
const sidebar_label = document.getElementsByTagName("span");

let currentRow, rowCount = 1;
noteInput.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        const noteText = noteInput.value.trim();
        if(noteText !== ''){
            const noteBox = document.createElement('div');
            noteBox.classList.add('note-box');
            const noteContent = document.createElement('p');
            noteContent.textContent = noteText;            
            noteBox.appendChild(noteContent);
            noteBox.insertAdjacentHTML('beforeend','<span id="pencil"><img src="img/pen.png" alt="archive" width="15px" height="15px" class="note-btn"></span>');
            noteBox.insertAdjacentHTML('beforeend','<span><img src="img/archive.png" alt="archive" width="15px" height="15px" class="note-btn"></span>');
            noteBox.insertAdjacentHTML('beforeend','<span><img src="img/trash.png" alt="archive" width="15px" height="15px" class="note-btn"></span>');


            if(noteText.length >= 30){
                noteBox.classList.add('small');
            }

            if(!currentRow || currentRow.childElementCount === 2){
                currentRow = document.createElement('div');
                currentRow.classList.add('note-row');
                notesContainer.appendChild(currentRow);
                rowCount++;
            }
            currentRow.appendChild(noteBox);
            noteInput.value = '';
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


let x = [];
menu.addEventListener('click', function(){
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
            sidebar_label[i].innerHTML = x[i]
        }else {
            sidebar_label[i].innerHTML = ''
        }
    }

});