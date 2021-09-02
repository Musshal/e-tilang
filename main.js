var xml = new XMLHttpRequest();
xml.open("GET", 'data.xls', true);
xml.responseType = 'arraybuffer'

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

xml.onload = () => {
  const bookList = document.getElementById('bookList');
  var workbook = XLSX.read(xml.response, {type: 'array'});
  var result = [];

  workbook.SheetNames.forEach((name) => {
    result.push(...XLSX.utils.sheet_to_json(workbook.Sheets[name], {header: 1}));
  });

  result.forEach((i) => {
    if (typeof i[0] === 'number' && typeof i[3] === 'string') {

      bookList.append(makeBook(i[3], i[4], i[0]))
    }
  })
}

xml.onreadystatechange = () => {
  const submitBookSearch = document.getElementById("searchBook");

  submitBookSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    searchBook();
  });
}

xml.send();
