var xml = new XMLHttpRequest();
xml.open("GET", 'data.xls', true);
xml.responseType = 'arraybuffer'

const makeBook = (nama, kendaraan, plat, denda, pasal, bukti) => {
  const h3Nama = document.createElement("h3");
  h3Nama.innerText = nama;

  const pKendaraanPlat = document.createElement("p");
  pKendaraanPlat.innerText = kendaraan.replace(/spm/gi, "Sepeda Motor").replace(/l.truck/gi, "Light Truck") + ' (' + plat + ')';

  const pDenda = document.createElement("p");
  pDenda.innerText = denda;

  const pPasal = document.createElement("p");
  pPasal.innerText = pasal;

  const pBukti = document.createElement("p");
  pBukti.innerText = bukti;

  const container = document.createElement("article");
  container.append(h3Nama, pKendaraanPlat, pDenda, pPasal, pBukti);
  container.classList.add("book_item");

  return container;
}

const searchBook = () => {
  const inputSearchBook = document.getElementById("searchBookTitle");
  const searchBook = inputSearchBook.value.replace(/\s+/g, '').toLowerCase();
  const books = document.querySelectorAll(".book_item");

  for (book of books) {
    const textTitle = book.children[0].textContent.replace(/\s+/g, '').toLowerCase();
    const textTitle2 = book.children[1].textContent.replace(/\s+/g, '').toLowerCase();
    if (textTitle.indexOf(searchBook) != -1 || textTitle2.indexOf(searchBook) != -1) {
      book.style.display = "block";
    } else {
      book.style.display = "none";
    }
  }
}

xml.onload = () => {
  const bookList = document.getElementById('bookList');
  var workbook = XLSX.read(xml.response, {
    type: 'array'
  });
  var result = [];

  for (name of workbook.SheetNames) {
    result.push(...XLSX.utils.sheet_to_json(workbook.Sheets[name], {
      header: 1
    }));
  }

  for (i of result) {
    if (typeof i[0] === 'number' && typeof i[3] === 'string') {
      bookList.append(makeBook(i[3], i[7], i[2], i[10] + i[11], i[8], i[9]))
    }
  }
}

xml.onreadystatechange = () => {
  const submitBookSearch = document.getElementById("searchBook");

  submitBookSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    searchBook();
  });
}

xml.send();
