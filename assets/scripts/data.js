const STORAGE_KEY = "BOOKSHELF_APPS";

let bookshelf = [];

const updateDataToStorage = () => {
  const parsed = JSON.stringify(bookshelf);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

const loadDataFromStorage = () => {
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (data !== null)
    bookshelf = data;

  document.dispatchEvent(new Event("ondataloaded"));
}

const composeBookObject = (bookTitle, bookAuthor, bookYear) => {
  return {
    id: +new Date(),
    bookTitle,
    bookAuthor,
    bookYear
  }
}

const findBook = (bookId) => {
  for (book of bookshelf) {
    if (book.id === bookId)
      return book;
  }

  return null;
}

const findBookIndex = (bookId) => {
  let index = 0;
  for (book of bookshelf) {
    if (book.id === bookId)
      return index;

    index++;
  }

  return -1;
}

const refreshDataFromBookshelf = () => {
  let bookList = document.getElementById(LIST_ID);

  for (book of bookshelf) {
    const newBook = makeBook(book.bookTitle, book.bookAuthor, book.bookYear);
    newBook[BOOK_ID] = book.id;
    bookList.append(newBook);
  }
}
