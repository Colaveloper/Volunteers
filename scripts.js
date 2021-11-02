groupsTable = document.getElementById('groupsTable');
volunteersTable = document.getElementById('volunteersTable');
weekNumberInput = document.getElementById('weekNumberInput');
weekNumberInfo = document.getElementById('weekNumberInfo');
newExaminationSubjects = document.getElementById('newExaminationSubjects');
newExaminationDate = document.getElementById('newExaminationDate');
newExaminationForm = document.getElementById('newExaminationForm');
examinationList = document.getElementById('examinationList');

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
  'scienze',
  'inglese',
  'latino',
  'italiano',
  'storia',
  'filosofia',
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
const months = [
  'gennaio',
  'febbraio',
  'marzo',
  'aprile',
  'maggio',
  'giugno',
  'luglio',
  'agosto',
  'settembre',
  'ottobre',
  'novembre',
  'dicembre',
];
var examinations = [];

renderGroups(generateGroups(shuffleClassmates(getWeekNumber(new Date()))));

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

// splitting weeklist in 3 groups
function generateGroups(weekList) {
  return [weekList.slice(0, 8), weekList.slice(8, 16), weekList.slice(16)];
}

// rendering current weekNumber
weekNumberInput.value = getWeekNumber(new Date());

// rendering the volunteers
function renderVolunteers() {
  const volunteers = groupsToExam();

  // empty table
  volunteersTable.innerHTML = '';

  for (var i = 0; i < volunteers.length; i++) {
    // create a new row
    var newRow = volunteersTable.insertRow(volunteersTable.length);
    for (var j = 0; j < volunteers[i].length; j++) {
      // create a new cell
      var cell = newRow.insertCell(j);

      // add value to the cell
      if (j == 2) {
        cell.innerHTML = `${volunteers[i][2].getDate()} ${
          months[volunteers[i][2].getMonth()]
        }`;
      } else {
        cell.innerHTML = volunteers[i][j];
      }
    }
  }
}

// rendering the groups
function renderGroups(groups) {
  // empty table
  groupsTable.innerHTML = '';

  for (var i = 0; i < groups.length; i++) {
    // original code from https://morioh.com/p/f404b03572af

    // create a new row
    var newRow = groupsTable.insertRow(groupsTable.length);
    var cell = newRow.insertCell(0);

    // add value to the cell

    for (var j = 0; j < groups[i].length; j++) {
      // original code from https://morioh.com/p/f404b03572af

      // create a new row
      var newRow = groupsTable.insertRow(groupsTable.length);
      var cell = newRow.insertCell(0);

      // add value to the cell
      cell.innerHTML = groups[i][j];
    }
    cell.innerHTML = '<br>';
  }
}

// Displaying the selected list
weekNumberInput.addEventListener('input', function () {
  if (this.value > 0 && this.value <= 52) {
    const newWeekNumber = Number.parseInt(this.value);
    renderVolunteers();
    renderGroups(generateGroups(shuffleClassmates(newWeekNumber)));
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

// Displaying the subject options for creating a new examination
subjects.forEach((subject) => {
  newExaminationSubjects.innerHTML += `<option>${subject}</option>`;
});

// Setting today as default & minimum date for creating a new examination
Date.prototype.toDateInputValue = function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};
newExaminationDate.value = new Date().toDateInputValue();
newExaminationDate.setAttribute('min', new Date().toDateInputValue());

// Check if examination is already registered
function isExaminationRegistered(newExamination) {
  var answer = false;
  examinations.forEach((examination) => {
    if (newExamination[0] == examination[0]) {
      if (newExamination[1].getDate() == examination[1].getDate()) {
        answer = true;
      }
    }
  });
  return answer;
}

// Adding new examination
newExaminationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newExamination = [
    newExaminationSubjects.value,
    new Date(newExaminationDate.value),
  ];
  if (isExaminationRegistered(newExamination)) {
    window.alert(
      `Questa interrogazione di ${newExaminationSubjects.value} è già nel database 👍`
    );
  } else {
    examinations.push(newExamination);
  }
  deleteOld(examinations);
  examinationList.innerHTML = '';
  examinations.forEach((el, idx) => {
    examinationList.innerHTML += `<p>${idx + 1}° interrogazione in ${
      el[0]
    } in data ${el[1].getDate()} ${months[el[1].getMonth()]} </p>`;
  });
  groupsToExam();
  renderVolunteers();
});

// Self-explanatory
function deleteOld(examinations) {
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  examinations.forEach((examination, idx) => {
    if (examination[1] < yesterday) {
      examinations.splice(idx, 1);
    }
  });
}

// matches groups to examinations, reversing the order every 3 groups
function groupsToExam() {
  // threeGroups should depend on the given week, not only for the current week
  const threeGroups = generateGroups(
    shuffleClassmates(getWeekNumber(new Date()))
  );
  var volunteers = [];
  examinations.forEach((exam, idx) => {
    const groupIndex = idx % 3;
    var newGroup = Array.from(threeGroups[groupIndex]);
    if (idx % 6 >= 3) {
      newGroup.reverse();
      console.log('invertion!');
    }
    newGroup.forEach((person) => {
      volunteers.push([
        person,
        exam[0], // subject
        exam[1], // date
      ]);
    });
  });
  console.log(volunteers);
  return volunteers;
}
