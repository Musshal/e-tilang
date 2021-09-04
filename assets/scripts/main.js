document.addEventListener("DOMContentLoaded", () => {
  const submitBookForm = document.getElementById("inputBook");
  const submitBookSearch = document.getElementById("searchBook");

  submitBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addBook();
  });

  submitBookSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    searchBook();
  });

  loadDataFromStorage();
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBookshelf();
});
