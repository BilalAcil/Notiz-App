let titles = [];
let posts = [];

let deleteTitles = [];
let deletePosts = [];

load();


function render() {
  let content = document.getElementById('notizenContainer');
  content.innerHTML = '';
  content.innerHTML += `
  <div class="input">
    <div class="input-container">
      <form class="titel">
        <input class="notizen-titel" type="text" id="titleinput" placeholder="Titel" >
      </form>
      <form class="notiz">
        <textarea id="notizinput" placeholder="Notiz schreiben..."></textarea>
      </form>
      <div class="ready-container">
        <button class="close" onclick="newNote()">Senden</button>
      </div>
    </div>
  </div>
<div id="notes-Container" class="bg"></div>
  `;

  for (let i = 0; i < titles.length; i++) {
    const title = titles[i];
    const post = posts[i];
 
  document.getElementById('notes-Container').innerHTML += `
  <div class="posts">
    <b>${title}</b><br>
    <p>${post}</p>
  <div>
  <div onclick= "deleteNote(${i})" class="note-img"><img src="./img/icons/papierkorb.png"></div>
  `;
}
}


function deleteRender() {
  let content = document.getElementById('delete');
  content.innerHTML = '';
  content.innerHTML += `
  <div><h1 class="delete">Papierkorb</h1></div>
  <div class="bg" id="delete-container"></div>
  `;

  for (let i = 0; i < deleteTitles.length; i++) {
    const title = deleteTitles[i];
    const post = deletePosts[i];

    document.getElementById('delete-container').innerHTML += `
    <div class="posts">
      <b>${title}</b><br>
      <p>${post}</p>
    <div>
    <div class="delete-container">
      <div onclick= "deleteNoteForever(${i})" class="note-img-delete"><img src="./img/icons/papierkorb.png"></div>
      <div onclick= "returnNote(${i})" class="note-img-restore"><img src="./img/icons/aktPfeil.png"></div>
    </div>
    <p class="tooltip">löschen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbspzurück&nbsp</p>
    `;
  }
}


function newNote() {
  let title = document.getElementById('titleinput');
  let post = document.getElementById('notizinput');

  if (title.value.trim() === '' || post.value.trim() === '') {
    alert('Bitte füllen Sie alle Felder aus');
    return;
  }

  titles.push(title.value);
  posts.push(post.value);
  render();
  save();
}


function deleteNote(i) {
  let noteTitle = titles[i];
  let notePosts = posts[i];

  deleteTitles.push(noteTitle);
  deletePosts.push(notePosts);

  titles.splice(i, 1);
  posts.splice(i, 1);

  save();
  render();
}


function deleteNoteForever(i) {
  if (confirm("Notiz endgültig löschen?")) {
  deleteTitles.splice(i, 1);
  deletePosts.splice(i,1);
}
  save();
  deleteRender();
}


function returnNote(i) {
  let returnTitle = deleteTitles[i];
  let returnPost = deletePosts[i];

  titles.push(returnTitle);
  posts.push(returnPost);

  deleteTitles.splice(i, 1);
  deletePosts.splice(i, 1);

  save();
  deleteRender();

}


function save() {
  let titlesAsText = JSON.stringify(titles);
  localStorage.setItem('titles', titlesAsText);

  let postsAsText = JSON.stringify(posts);
  localStorage.setItem('posts', postsAsText);

  let deleteTitlesAsText = JSON.stringify(deleteTitles);
  localStorage.setItem('deleteTitles', deleteTitlesAsText);

  let deletePostsAsText = JSON.stringify(deletePosts);
  localStorage.setItem('deletePosts', deletePostsAsText);

}


function load() {
  let titlesAsText = localStorage.getItem('titles');
  let postsAsText = localStorage.getItem('posts');

  let deleteTitlesAsText = localStorage.getItem('deleteTitles');
  let deletePostsAsText = localStorage.getItem('deletePosts');

  if (titlesAsText && postsAsText) {
    titles = JSON.parse(titlesAsText);
    posts = JSON.parse(postsAsText);
  }

  if (deleteTitlesAsText && deletePosts) {
    deleteTitles = JSON.parse(deleteTitlesAsText);
    deletePosts = JSON.parse(deletePostsAsText);
  }
}


function showMenu() {
  document.getElementById('menu').classList.add('show-overlay-menu');
  document.getElementById('menu-icon').classList.add('d-none');
  document.getElementById('x-icon').classList.add('x-aktive');
}


function closeMenu() {
  document.getElementById('menu').classList.remove('show-overlay-menu');
  document.getElementById('menu-icon').classList.remove('d-none');
  document.getElementById('x-icon').classList.remove('x-aktive');
}
