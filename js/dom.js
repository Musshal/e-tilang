var LIST_ID = "bookList";
var BOOK_ID = "bookId";

const addBook = () => {
  const bookList = document.getElementById(LIST_ID);

  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;

  const book = makeBook(bookTitle, bookAuthor, bookYear);
  const bookshelfObject = composeBookObject(bookTitle, bookAuthor, bookYear);

  book[BOOK_ID] = bookshelfObject.id;
  bookshelf.push(bookshelfObject);
  bookList.append(book);
  updateDataToStorage();
}

const makeBook = (bookTitle, bookAuthor, bookYear) => {
  const textTitle = document.createElement("h3");
  textTitle.innerText = bookTitle;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = bookAuthor;

  const textYear = document.createElement("p");
  textYear.innerText = bookYear;

  const containerDiv = document.createElement("div");

  const container = document.createElement("article");
  container.classList.add("book_item");
  container.append(textTitle, textAuthor, textYear, containerDiv);

  return container;
}

const searchBook = () => {
  const inputSearchBook = document.getElementById("searchBookTitle");
  const searchBook = inputSearchBook.value.toLowerCase();
  const books = document.querySelectorAll(".book_item");

  Array.from(books).forEach((book) => {
    const textTitle = book.firstElementChild.textContent;
    if (textTitle.toLowerCase().indexOf(searchBook) != -1) {
      book.style.display = "block";
    } else {
      book.style.display = "none";
    }
  });
}
