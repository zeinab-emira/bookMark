let sName = document.getElementById("formNameInput");
let sUrl = document.getElementById("formUrlInput");
let addbtn = document.getElementById("addBtn");
let modal = document.getElementById("modal");
let modalCloseBtn = document.getElementById("closeBtn");
let section = document.getElementById("section");
let deleteAll = document.getElementById("deleteAll");
let IndexUpdate;
UpdateMode = false;
bookMarkContainer = JSON.parse(localStorage.getItem("allBookmarks")) ?? [];
if (bookMarkContainer ?? []) {
  deleteAll.classList.add("d-none");
}
display();
function addBookmark() {
  let bookmark = {
    name: sName.value,
    url: sUrl.value,
  };
  if (!UpdateMode) {
    bookMarkContainer.push(bookmark);
  } else {
    bookMarkContainer.splice(IndexUpdate, 1, bookmark);
    addbtn.innerHTML = "Base Class";
    UpdateMode = false;
  }
  deleteAll.classList.replace("d-none", "d-block");
  display();
  onChange();
  console.log(bookMarkContainer);
}
function display() {
  box = "";
  for (let i = 0; i < bookMarkContainer.length; i++) {
    box += `
    <tr>
          <td>${i + 1}</td>
          <td>${bookMarkContainer[i].name}</td>
          <td>
            <button class="btn btn-success px-2">
              <i class="fa-solid fa-eye pe-1"></i>
              <a href="${
                bookMarkContainer[i].url
              }" target="_blank"" class="text-light text-decoration-none px-2">Visit  </a>
            </button>
          </td>
          <td>
            <button onclick= 'updateBookmark(${i})' class="btn btn-info px-2">
              <i class="fa-solid fa-pen-nib text-white"></i> Update  
            </button>
          </td>
          <td>
            <button onclick= 'deleteBookmark(${i})' class="btn btn-danger px-2">
              <i class="fa-solid fa-trash-can pe-1"></i> Delete  
            </button>
          </td>
          </tr>
    `;
  }
  document.getElementById("bookmarkContent").innerHTML = box;
  clearForm();
}
function onChange() {
  localStorage.setItem("allBookmarks", JSON.stringify(bookMarkContainer));
  display();
}
function clearForm() {
  sName.value = null;
  sUrl.value = null;
  sName.classList.remove("is-valid");
  sUrl.classList.remove("is-valid");
}
function deleteBookmark(index) {
  bookMarkContainer.splice(index, 1);
  onChange();
  display();
}
function updateBookmark(index) {
  UpdateMode = true;
  IndexUpdate = index;
  sName.value = bookMarkContainer[index].name;
  sUrl.value = bookMarkContainer[index].url;
  addbtn.innerHTML = "Update";
}
function search(term) {
  box = "";
  for (let i = 0; i < bookMarkContainer.length; i++) {
    if (
      bookMarkContainer[i].name.toLowerCase().includes(term.toLowerCase()) ==
      true
    ) {
      box += `
    <tr>
          <td>${i + 1}</td>
          <td>${bookMarkContainer[i].name}</td>
          <td>
            <button class="btn btn-success p-1">
              <i class="fa-solid fa-eye pe-1"></i>
              <a href="${
                bookMarkContainer[i].url
              }" target="_blank"" class="text-light text-decoration-none">Visit</a>
            </button>
          </td>
          <td>
            <button onclick= 'updateBookmark(${i})' class="btn btn-info p-1">
              <i class="fa-solid fa-pen-nib text-white"></i> Update
            </button>
          </td>
          <td>
            <button onclick= 'deleteBookmark(${i})' class="btn btn-danger p-1">
              <i class="fa-solid fa-trash-can pe-1"></i> Delete
            </button>
          </td>
          </tr>
    `;
    }
  }
  document.getElementById("bookmarkContent").innerHTML = box;
}
function validtion() {
  let namePattern = /^[A-Z]?[a-z0-9]{3,10}$/;
  let urlPattern =
    /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
  if (!urlPattern.test(sUrl.value) || !namePattern.test(sName.value)) {
    modal.classList.replace("d-none", "d-block");
    section.classList.replace("d-block", "d-none");
    // sName.classList.remove("is-invalid");
    // sName.classList.remove("is-valid");
    // sUrl.classList.remove("is-valid");
    // sUrl.classList.remove("is-invalid");
  } else {
    addBookmark();
  }
}
modalCloseBtn.addEventListener("click", function () {
  section.classList.replace("d-none", "d-block");
  modal.classList.replace("d-block", "d-none");
  clearForm();
});

deleteAll.addEventListener("click", function () {
  bookMarkContainer.splice(0);
  deleteAll.classList.add("d-none");
  onChange();
});
function validInputs(element) {
  var regex = {
    formNameInput: /^[A-Z]?[a-z0-9]{3,10}$/,
    formUrlInput:
      /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}