let popContainer = document.getElementById("popContainer");
let close = document.getElementById("close");
let title = document.getElementById("title");
let description = document.getElementById("description");
let addBtn = document.getElementById("addBtn");
let popTitle = document.getElementById("popTitle");
let messegePopup = document.getElementById("messegePopup")
let ok =  document.getElementById("ok")
let cancel =  document.getElementById("cancel")
let allNotes = JSON.parse(localStorage.getItem("allNotes")  || "[]");
displayNote(allNotes) 
//get index for edite
let getIndex;
let getIndexForDelete
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Sep",
  "October",
  "November",
  "December",
];

//................................................................................................
//create new note
function createNewNote() {
  title.value = "";
  description.value = "";
  popTitle.innerHTML = "Add a new Note";
  addBtn.innerHTML = "Add Note";
  popContainer.style.display = "block";
}

//................................................................................................
//close the popUp container
close.addEventListener("click", function () {
  popContainer.style.display = "none";
});

//.................................................................................................
// add new note
function addNote() {
  let d = new Date();
  let day = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  if (title.value || description.value) {
    if (addBtn.innerHTML === "Add Note") {
      let note = {
        notetitle: title.value,
        noteDes: description.value,
        noteDate: `${month} ${day}, ${year}`,
      };
      allNotes.push(note);
      localStorage.setItem("allNotes", JSON.stringify(allNotes))
      displayNote(allNotes);
      clearFileds();
      popContainer.style.display = "none";
    }else{
      allNotes[getIndex].notetitle = title.value;
      allNotes[getIndex].noteDes = description.value;
      localStorage.setItem("allNotes", JSON.stringify(allNotes))
      displayNote(allNotes);
      popTitle.innerHTML = "Add a new Note";
      addBtn.innerHTML = "Add Note";
      popContainer.style.display = "none";
    }
  }else{
    alert("please fill the fields")
  }
}
addBtn.addEventListener("click", addNote);

//.................................................................................................
// display the note
function displayNote(arr) {
  let container = document.getElementById("container");
  let noteDetails = ``;
  for (let i = 0; i < arr.length; i++) {
    noteDetails += `
    <div id="note">
      <h3>${arr[i].notetitle}</h3>
      <p>${arr[i].noteDes}</p>
      <hr>
      <div class="row date">
            <div class="col-9">${arr[i].noteDate}</div>
            <div class="col-3" id="setting"> 
               <i  onclick="showMenu(this)" class="fa fa-ellipsis-h"></i> 
               <div id="menu" class="row p-1">
                    <div class="col-12" id="edite" onclick="getIndex = editeNote(${i})"> <i class="fa fa-pencil" aria-hidden="true"></i>   Edite </div>
                    <div class="col-12 mt-1" id="delete" onclick="getIndexForDelete = deleteNote(${i})"> <i class="fa fa-trash" aria-hidden="true"></i>   Delete </div>
               </div>
            </div>
      </div>
    </div>`;
  } 
   // addNewNote.insertAdjacentHTML("afterend",noteDetails)
  container.innerHTML = ` <div id="addNewNote" onclick="createNewNote()">
                          <div class="plus"><i class="fa fa-plus" style="font-size:40px; color:rgb(134, 100, 255);font-weight:normal;"></i> </div>
                          <h4>Add new note</h4></div>` +  noteDetails;
}

//................................................................................................
//show menue (setting)
function showMenu(ele) {
  ele.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target != ele) {
      ele.parentElement.classList.remove("show");
    }
  });
}

//................................................................................................
//Edite Note
function editeNote(index) {
  popContainer.style.display = "block";
  title.value = allNotes[index].notetitle;
  description.value = allNotes[index].noteDes;
  popTitle.innerHTML = "Update The Note";
  addBtn.innerHTML = "update Note";
  return index;
}

//................................................................................................
//delete Note
function deleteNote(index) {
  messegePopup.style.display = "flex"
  return index
}

//................................................................................................
//comferm the delete order 
ok.addEventListener("click",function(){
  allNotes.splice(getIndexForDelete, 1);
  localStorage.setItem("allNotes", JSON.stringify(allNotes))
  displayNote(allNotes);
  messegePopup.style.display = "none"
})

//................................................................................................
//cancel the delete order 
cancel.addEventListener("click",function(){
  messegePopup.style.display = "none"
})

//................................................................................................
//clear Fileds
function clearFileds() {
  title.value = "";
  description.value = "";
}

