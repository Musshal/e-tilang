var http = new XMLHttpRequest();
http.open("GET", 'data.xls', true);
http.responseType = 'arraybuffer'

function angkaify(angka) {
  bagian = angka.toString().split('.');
  bagian[0] = bagian[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return bagian.join(',');
}

function kuncify(kunci) {
  return kunci.replace(/\s+/g, '').toLowerCase()
}

function render(nama, kendaraan, plat, denda, pasal, bukti) {
  const h3Nama = document.createElement("h3");
  h3Nama.innerText = nama;

  const pKendaraanPlat = document.createElement("p");
  pKendaraanPlat.innerText = kendaraan.replace(/spm/gi, "Sepeda Motor").replace(/l.truck/gi, "Light Truck") + ' (' + plat + ')';

  const pDenda = document.createElement("p");
  pDenda.innerText = angkaify(denda);

  const pPasal = document.createElement("p");
  pPasal.innerText = pasal;

  const pBukti = document.createElement("p");
  pBukti.innerText = bukti;

  const container = document.createElement("article");
  container.append(h3Nama, pKendaraanPlat, pDenda, pPasal, pBukti);
  container.classList.add("item");

  return container;
}

function cari() {
  const kunci = kuncify(document.getElementById("kunci").value);
  const daftarItem = document.querySelectorAll(".item");

  for (item of daftarItem) {
    const kunci1 = kuncify(item.children[0].textContent);
    const kunci2 = kuncify(item.children[1].textContent);

    if (kunci1.indexOf(kunci) != -1 || kunci2.indexOf(kunci) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  }
}

http.onload = () => {
  const daftar = document.getElementById('daftar');
  var excel = XLSX.read(http.response, {
    type: 'array'
  });
  var hasil = [];

  for (name of excel.SheetNames) {
    hasil.push(...XLSX.utils.sheet_to_json(excel.Sheets[name], {
      header: 1
    }));
  }

  for (i of hasil) {
    if (typeof i[0] === 'number' && typeof i[3] === 'string') {
      daftar.append(render(i[3], i[7], i[2], i[10] + i[11], i[8], i[9]))
    }
  }
}

http.onreadystatechange = () => {
  const formCari = document.getElementById("cari");

  formCari.addEventListener("submit", (event) => {
    event.preventDefault();
    cari();
  });
}

http.send();
