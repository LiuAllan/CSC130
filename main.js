$(document).ready(function() {
  //$("#add-note").click(addNote)
  $("#add-note").click(function(){
    addNote()
  })
  $("#remove-all").click(removeNotes)
  loadNotes();
})

/*
 Creates a new note and adds it to the sticky-notes div
*/
function addNote(text) {
  var newNote = $("<div class= \"note\"></div>");
  var inputText = $("<textarea class= \"test\"></textarea>");
  var removeOne = $('<i id="x" class=\"fa fa-times\" aria-hidden=\"true\"></i>');
  
  removeOne.click(function() {
    newNote.remove()
    saveNotes();
  });
  if (text !== undefined) {
    inputText.val(text);
  }
  inputText.blur(function() {
    saveNotes();
  });
  
  removeOne.appendTo(newNote);
  inputText.appendTo(newNote);
  newNote.appendTo($("#sticky-notes"))
  saveNotes();
  /*
  newNote.append(removeOne)
  newNote.append($("<textarea></textarea>"))
  newNote.appendTo($("#sticky-notes"))
  saveNotes();
  */
  
  
}

/*
 Removes all the notes from the sticky-notes div
*/
function removeNotes() {
  $("#sticky-notes").html("");
  saveNotes();
}

/*
  Saves all the notes in the browser local storage
*/
function saveNotes() {
  var notesArray = [];
  //$("textarea").each(function() {
  $(".test").each(function() {
    notesArray.push($(this).val());
  });
  var jsonStr = JSON.stringify(notesArray);
  localStorage.setItem("notes", jsonStr);
}

/* 
  Loads the notes previously saved in the local storage, if any, and adds them to the sticky-notes div
*/
function loadNotes() {
  if (localStorage.notes == undefined) return;
  
  var notes = JSON.parse(localStorage.getItem("notes"));
  for (var i of notes) {
    addNote(i);
  }
}