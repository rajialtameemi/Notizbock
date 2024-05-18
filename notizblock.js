let titleNote = [];
let noteNote = [];

let trashtitle = [];
let trashNote = [];

load();
loadtrash();

function render() {
  let conent = document.getElementById("content");
  content.innerHTML = "";
  content.innerHTML += `<input type="text" id="tit" class="input" placeholder="Bitte hier den Titel eingeben"  >
    <textarea id="aufgaben" placeholder="Bitte hier deine Erinnerung eingeben" ></textarea>
    <button onclick="addNote()">Hinzufügen</button>`;

  rendern();
}

function rendern() {
  for (let i = 0; i < titleNote.length; i++) {
    const title = titleNote[i];
    const note = noteNote[i];

    content.innerHTML += `</div>
            <div class="delsection">
            <h1>Heute ist zum tun: ${title} </p>
            <p>Ihre heutige Aufgaben sind: ${note}</p>
            <img src="img/trash.png" style="width: 50px; height: 50px;" onclick="delNote(${i})"></div>`;
  }
}

function addNote() {
  let title = document.getElementById("tit");
  let aufgabe = document.getElementById("aufgaben");

  if (title.value == 0 || aufgabe.value == 0) {
    alert("Bitte gebe etwas ein");
  } else {
    titleNote.push(tit.value);
    noteNote.push(aufgabe.value);
    render();
    save();
  }
}

function delNote(i) {
  trashNote.push(titleNote[i]);
  trashtitle.push(noteNote[i]);

  titleNote.splice(i, 1);
  noteNote.splice(i, 1);

  savetrash();
  render();
  save();
}

function save() {
  let titleNoteAsText = JSON.stringify(titleNote);
  let noteNoteAsText = JSON.stringify(noteNote);

  localStorage.setItem("titleNote", titleNoteAsText);
  localStorage.setItem("noteNote", noteNoteAsText);
}

function load() {
  let titleNoteAsText = localStorage.getItem("titleNote");
  let noteNoteAsText = localStorage.getItem("noteNote");

  if (titleNoteAsText && noteNoteAsText) {
    titleNote = JSON.parse(titleNoteAsText);
    noteNote = JSON.parse(noteNoteAsText);
  }
}

function rendercontent() {
  let content = document.getElementById("contain");
  content.innerHTML = "";

  for (let i = 0; i < trashNote.length; i++) {
    const title = trashtitle[i];
    const note = trashNote[i];

    content.innerHTML += `
            <div class="delsection">
                <h1>Titel: ${title} </p>
                <p>Aufgaben: ${note}</p>
                <img src="img/return.png" style="width: 40px; height: 50px;" onclick="returnNote(${i})">
                <img src="img/trash.png" style="width: 50px; height: 50px;" onclick="delTrash(${i})">
            </div>`;
  }

  savetrash();
}

function delTrash(i) {
  trashtitle.splice(i, 1);
  trashNote.splice(i, 1);

  rendercontent();
  savetrash();
}

function returnNote(i) {
  titleNote.push(trashtitle[i]);
  noteNote.push(trashNote[i]);

  trashtitle.splice(i, 1);
  trashNote.splice(i, 1);

  save();
  savetrash();
  rendercontent();
}

function savetrash() {
  let trashTitleAsText = JSON.stringify(trashtitle);
  let trashNoteAsText = JSON.stringify(trashNote);

  localStorage.setItem("trashtitle", trashTitleAsText);
  localStorage.setItem("trashNote", trashNoteAsText);
}

function loadtrash() {
  let trashtitleAsText = localStorage.getItem("trashtitle");
  let trashNoteAsText = localStorage.getItem("trashNote");

  if (trashtitleAsText && trashNoteAsText) {
    trashtitle = JSON.parse(trashtitleAsText);
    trashNote = JSON.parse(trashNoteAsText);
  }
}
