table = document.getElementById('table');
weekNumberInput = document.getElementById('weekNumberInput');
weekNumberInfo = document.getElementById('weekNumberInfo');

const classmates = [
  'Ambrosini',
  'Angelucci',
  'Barcelli',
  'Bocchino',
  'Cetrone',
  'Cola',
  'Costantini',
  'Garbulli',
  'Ghiselli',
  'Giovanelli',
  'Kuta',
  'Giovannella',
  'Marchesani',
  'Ordonselli',
  'Paolinelli',
  'Pergolesi',
  'Riminucci',
  'Savino',
  'Scassellati',
  'Sebastianelli',
  'Shaini',
  'Valentini',
  'Vitalucci',
];
const subjects = [
  'Scienze',
  'Inglese',
  'Latino',
  'Italiano',
  'Storia',
  'Filosofia',
];
const weekdays = [
  'Lunedì',
  'Martedì',
  'Mercoledì',
  'Giovedì',
  'Venerdì',
  'Sabato',
  'Domenica',
];

renderTable(generateGroups(shuffleClassmates(getWeekNumber(new Date()))));

// returns an integer between 1 and 52
function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number
  return weekNo;

  // Source https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
}

// shuffles an array based on the week
function shuffleClassmates(weekNumber) {
  var weekList = Array.from(classmates);

  function random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  var m = weekList.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(random(weekNumber) * m--); // <-- MODIFIED LINE

    // And swap it with the current element.
    t = weekList[m];
    weekList[m] = weekList[i];
    weekList[i] = t;
    ++weekNumber; // <-- ADDED LINE
  }

  return weekList;
}

function generateGroups(weekList) {
  return [weekList.slice(0, 8), weekList.slice(8, 16), weekList.slice(16)];
}

// rendering current weekNumber
weekNumberInput.value = getWeekNumber(new Date());
// storing the selected weekNumber

// rendering the groups in the table
function renderTable(groups) {
  // empty table
  table.innerHTML = '';

  for (var i = 0; i < groups.length; i++) {
    // original code from https://morioh.com/p/f404b03572af

    // create a new row
    var newRow = table.insertRow(table.length);
    var cell = newRow.insertCell(0);

    // add value to the cell

    for (var j = 0; j < groups[i].length; j++) {
      // original code from https://morioh.com/p/f404b03572af

      // create a new row
      var newRow = table.insertRow(table.length);
      var cell = newRow.insertCell(0);

      // add value to the cell
      cell.innerHTML = groups[i][j];
    }
  }
}

// Displaying the selected list
weekNumberInput.addEventListener('input', function () {
  if (this.value > 0 && this.value <= 52) {
    const newWeekNumber = Number.parseInt(this.value);
    renderTable(generateGroups(shuffleClassmates(newWeekNumber)));
  } else if (this.value > 52) {
    window.alert(
      `non esiste la ${this.value}° settimana, inserisci un numero minore o uguale a 52`
    );
    weekNumberInput.value = getWeekNumber(new Date());
  } else if (this.value < 0) {
    window.alert(`che cacchio metti un numero negativo ah uagliò`);
    weekNumberInput.value = getWeekNumber(new Date());
  }
  if (this.value == getWeekNumber(new Date())) {
    weekNumberInfo.innerHTML = 'Inserisci un numero tra 1 e 52';
  } else {
    weekNumberInfo.innerHTML = `La settimana corrente è la numero ${getWeekNumber(
      new Date()
    )}`;
  }
});
