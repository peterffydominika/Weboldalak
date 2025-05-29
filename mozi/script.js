const filmek = [
    {
      cim: "Oppenheimer",
      leiras: "Egy zseni fizikus története, aki megváltoztatta a világot.",
      kep: "kepek/oppenheimer.jpg",
    },
    {
      cim: "Dűne: Második rész",
      leiras: "Paul Atreides visszatér, hogy bosszút álljon családjáért.",
      kep: "kepek/dune.jpg",
    },
    {
      cim: "Agymanók 2",
      leiras: "Érzelmek új kalandja Riley fejében, ahogy kamaszodik.",
      kep: "kepek/Agymanók_2.png",
    },
    {
      cim: "Godzilla x Kong",
      leiras: "Két szörnyeteg egyesíti erejét egy új fenyegetés ellen.",
      kep: "kepek/kong.jpg",
    },
    {
      cim: "Furiosa: A Mad Max Saga",
      leiras: "A posztapokaliptikus világ új hősnője színre lép.",
      kep: "kepek/furiosa.png",
    },
    {
      cim: "Kung Fu Panda 4",
      leiras: "Po visszatér, hogy új kihívásokkal nézzen szembe.",
      kep: "kepek/panda.jpg",
    },
    {
      cim: "Deadpool & Wolverine",
      leiras: "A két ikonikus karakter újra akcióban – egy közös filmben.",
      kep: "kepek/deadpool.jpg",
    },
    {
      cim: "A kis hableány (2023)",
      leiras: "Disney klasszikus újragondolva élőszereplős formában.",
      kep: "kepek/Kis_Hableány.png",
    },
    {
      cim: "Barbie",
      leiras: "Barbie felfedezi a valódi világot – egy szatirikus és látványos kalandban.",
      kep: "kepek/barbie.jpg",
    },
    {
      cim: "Wonka",
      leiras: "A híres csokikészítő varázslatos eredettörténete.",
      kep: "kepek/wonka.jpg",
    },
    {
      cim: "Mission: Impossible – Leszámolás",
      leiras: "Ethan Hunt új küldetésben, még nagyobb tétért.",
      kep: "kepek/mission.jpg",
    },
    {
      cim: "A kék bogár",
      leiras: "Egy átlagos fiú különleges szupererőkre tesz szert egy idegen eszközzel.",
      kep: "kepek/bogar.jpg",
    },
    {
      cim: "A Marvel Kapitány 2",
      leiras: "Carol Danvers visszatér, ezúttal szövetségesekkel az oldalán.",
      kep: "kepek/marvel.jpg",
    }
  ];
  
  const filmListaElem = document.getElementById("filmek");
  const popup = document.getElementById("popup");
  const popupSzoveg = document.getElementById("popup-szoveg");
  
  // filmek.forEach((film) => {
  //   const div = document.createElement("div");
  //   div.className = "film";
  //   div.innerHTML = `
  //     <img src="${film.kep}" alt="${film.cim}" />
  //     <h3>${film.cim}</h3>
  //     <p>${film.leiras}</p>
  //     <button onclick="foglalas('${film.cim}')">Jegyet foglalok</button>
  //   `;
  //   filmListaElem.appendChild(div);
  // });

  const eredetiCimek = filmek.map(f => f.cim); // eredeti címek mentése

  filmek.forEach((film, index) => {
    const div = document.createElement("div");
    div.className = "film";
  
    div.innerHTML = `
      <img src="${film.kep}" alt="${film.cim}" />
      <h3 id="film-cim-${index}">${film.cim}</h3>
      <p>${film.leiras}</p>
      <input type="text" id="input-cim-${index}" value="${film.cim}" style="display:none; margin: 0.5rem auto;" />
      <button onclick="foglalas('${film.cim}')">Jegyet foglalok</button>
      <button onclick="szerkesztCim(${index})">✏️ Szerkesztés</button>
      <button onclick="visszaallitCim(${index})">↩️ Visszaállítás</button>
    `;
    filmListaElem.appendChild(div);
  });
  



  
  function foglalas(cim) {
    popupSzoveg.textContent = `Sikeresen lefoglaltad a jegyet: ${cim}`;
    popup.classList.remove("rejtett");
  }
  
  function bezarPopup() {
    popup.classList.add("rejtett");
  }
  function searchFilmek() {
    const keresettSzoveg = document.getElementById("searchBar").value.toLowerCase();
    const filmDivok = document.querySelectorAll(".film");
  
    filmDivok.forEach((filmDiv) => {
      const cim = filmDiv.querySelector("h3").textContent.toLowerCase();
      const leiras = filmDiv.querySelector("p").textContent.toLowerCase();
  
      if (cim.includes(keresettSzoveg) || leiras.includes(keresettSzoveg)) {
        filmDiv.style.display = "block";
      } else {
        filmDiv.style.display = "none";
      }
    });
  }
  
  const szekContainer = document.getElementById("szekek-container");
const kosarElem = document.getElementById("kosar");
const kosarLista = document.getElementById("kosar-lista");
let aktivFilm = "";
let kivalsztottSzekek = [];

function foglalas(cim) {
  aktivFilm = cim;
  popupSzoveg.textContent = `Válaszd ki a székeket a(z) "${cim}" filmre:`;
  popup.classList.remove("rejtett");
  szekContainer.classList.remove("rejtett");
  kosarElem.classList.remove("rejtett");
  szekekGeneralasa();
}

function szekekGeneralasa() {
  szekContainer.innerHTML = "";
  kivalsztottSzekek = [];
  for (let i = 1; i <= 40; i++) {
    const szek = document.createElement("div");
    szek.classList.add("szek");
    szek.textContent = i;
    szek.addEventListener("click", () => szekKivalasztas(i, szek));
    szekContainer.appendChild(szek);
  }
  frissitKosar();
}

function szekKivalasztas(sorszam, szekElem) {
  if (szekElem.classList.contains("foglalt")) return;
  if (szekElem.classList.contains("kivalasztva")) {
    szekElem.classList.remove("kivalasztva");
    kivalsztottSzekek = kivalsztottSzekek.filter(sz => sz !== sorszam);
  } else {
    szekElem.classList.add("kivalasztva");
    kivalsztottSzekek.push(sorszam);
  }
  frissitKosar();
}

function frissitKosar() {
  kosarLista.innerHTML = "";
  kivalsztottSzekek.forEach(sz => {
    const li = document.createElement("li");
    li.textContent = `${aktivFilm} – ${sz}. szék`;
    kosarLista.appendChild(li);
  });
}

function vasarlas() {
  alert(`Sikeres vásárlás: ${kivalsztottSzekek.length} jegy!`);
  bezarPopup();
}

function bezarPopup() {
  popup.classList.add("rejtett");
  szekContainer.classList.add("rejtett");
  kosarElem.classList.add("rejtett");
  kivalsztottSzekek = [];
}

function szekKivalasztas(sorszam, szekElem) {
  if (szekElem.classList.contains("foglalt")) return;

  if (szekElem.classList.contains("kivalasztva")) {
    szekElem.classList.remove("kivalasztva");
    kivalsztottSzekek = kivalsztottSzekek.filter(sz => sz.sorszam !== sorszam);
  } else {
    const tipus = prompt(`Válaszd ki a jegytípust a(z) ${sorszam}. székre: felnott vagy diak`).toLowerCase();
    if (tipus !== "felnott" && tipus !== "diak") {
      alert("Érvénytelen típus. Csak 'felnott' vagy 'diak' lehetséges.");
      return;
    }
    szekElem.classList.add("kivalasztva");
    kivalsztottSzekek.push({ sorszam, tipus });
  }

  frissitKosar();
}

function frissitKosar() {
  kosarLista.innerHTML = "";
  let osszeg = 0;

  kivalsztottSzekek.forEach(jegy => {
    const li = document.createElement("li");
    const ar = jegy.tipus === "felnott" ? 2500 : 1800;
    osszeg += ar;
    li.textContent = `${aktivFilm} – ${jegy.sorszam}. szék (${jegy.tipus}) – ${ar} Ft`;
    kosarLista.appendChild(li);
  });

  const li = document.createElement("li");
  li.innerHTML = `<strong>Összesen: ${osszeg} Ft</strong>`;
  kosarLista.appendChild(li);
}
function vasarlas() {
  const kosar = kivalsztottSzekek.map(jegy => ({
    film: aktivFilm,
    szek: jegy.sorszam,
    tipus: jegy.tipus
  }));
  const regi = JSON.parse(localStorage.getItem("kosar")) || [];
  localStorage.setItem("kosar", JSON.stringify([...regi, ...kosar]));
  alert("Jegyek hozzáadva a kosárhoz!");
  bezarPopup();
}
const kosarListaElem = document.getElementById("kosar-lista");
const jegyek = JSON.parse(localStorage.getItem("kosar")) || [];
let osszeg = 0;

if (jegyek.length === 0) {
  kosarListaElem.innerHTML = "<li>A kosár üres.</li>";
} else {
  jegyek.forEach(jegy => {
    const ar = jegy.tipus === "felnott" ? 2500 : 1800;
    osszeg += ar;
    const li = document.createElement("li");
    li.textContent = `${jegy.film} – ${jegy.szek}. szék (${jegy.tipus}) – ${ar} Ft`;
    kosarListaElem.appendChild(li);
  });
  const li = document.createElement("li");
  li.innerHTML = `<strong>Összesen: ${osszeg} Ft</strong>`;
  kosarListaElem.appendChild(li);
}


function szerkesztCim(index) {
  const cimElem = document.getElementById(`film-cim-${index}`);
  const inputElem = document.getElementById(`input-cim-${index}`);

  if (inputElem.style.display === "none") {
    inputElem.style.display = "block";
    inputElem.focus();
  } else {
    const ujCim = inputElem.value.trim();
    if (ujCim !== "") {
      cimElem.textContent = ujCim;
      filmek[index].cim = ujCim;
    }
    inputElem.style.display = "none";
  }
}

function visszaallitCim(index) {
  const eredeti = eredetiCimek[index];
  const cimElem = document.getElementById(`film-cim-${index}`);
  const inputElem = document.getElementById(`input-cim-${index}`);

  filmek[index].cim = eredeti;
  cimElem.textContent = eredeti;
  inputElem.value = eredeti;
}
