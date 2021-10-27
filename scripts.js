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
function shuffleClassmates(list, weekNumber) {
  function random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  var m = list.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(random(weekNumber) * m--); // <-- MODIFIED LINE

    // And swap it with the current element.
    t = list[m];
    list[m] = list[i];
    list[i] = t;
    ++weekNumber; // <-- ADDED LINE
  }

  return list;
}

// shuffled week list
var weekList = Array.from(classmates);
shuffleClassmates(weekList, getWeekNumber(new Date()));

console.log(getWeekNumber(new Date()), weekList);
