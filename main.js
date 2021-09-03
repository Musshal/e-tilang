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
  const elNama = document.createElement("h3");
  elNama.innerText = nama;

  const elKendaraanPlat = document.createElement("p");
  elKendaraanPlat.innerText = kendaraan.replace(/spm/gi, "Sepeda Motor").replace(/l.truck/gi, "Light Truck") + ' (' + plat + ')';

  const elDenda = document.createElement("p");
  elDenda.innerText = angkaify(denda);

  const elPasal = document.createElement("p");
  elPasal.innerText = pasal;

  const elBukti = document.createElement("p");
  elBukti.innerText = bukti;

  const container = document.createElement("article");
  container.append(elNama, elKendaraanPlat, elDenda, elPasal, elBukti);
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
  const elDaftar = document.getElementById('daftar');
  const elCari = document.getElementById("cari");
  var excel = XLSX.read(http.response, {
    type: 'array'
  });
  var hasil = [];

  if (http.readyState == 4 && http.status == 200) {
    for (name of excel.SheetNames) {
      hasil.push(...XLSX.utils.sheet_to_json(excel.Sheets[name], {
        header: 1
      }));
    }

    for (i of hasil) {
      if (typeof i[0] === 'number' && typeof i[3] === 'string') {
        elDaftar.append(render(i[3], i[7], i[2], i[10] + i[11], i[8], i[9]))
      }
    }

    elCari.addEventListener("submit", (event) => {
      event.preventDefault();
      cari();
    });
  } else {
    location.reload();
  }
}

http.send();
