const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

//Values for Chaldean Numerology
const values = {
  A: "1",
  B: "2",
  C: "3",
  D: "4",
  E: "5",
  U: "6",
  O: "7",
  F: "8",
  I: "1",
  K: "2",
  G: "3",
  M: "4",
  H: "5",
  V: "6",
  Z: "7",
  P: "8",
  J: "1",
  R: "2",
  L: "3",
  T: "4",
  N: "5",
  W: "6",
  Q: "1",
  S: "3",
  X: "5",
  Y: "1",
};
//Values for Pythagorean  Numerology
const phyvalues = {
  A: "1",
  B: "2",
  C: "3",
  D: "4",
  E: "5",
  U: "3",
  O: "6",
  F: "6",
  I: "9",
  K: "2",
  G: "7",
  M: "4",
  H: "8",
  V: "4",
  Z: "8",
  P: "7",
  J: "1",
  R: "9",
  L: "3",
  T: "2",
  N: "5",
  W: "5",
  Q: "8",
  S: "1",
  X: "6",
  Y: "7",
};

// values for desired & personality number
const desValues = {
  A: "1",
  B: "2",
  C: "3",
  D: "4",
  E: "5",
  F: "6",
  G: "7",
  H: "8",
  I: "9",
  J: "1",
  K: "2",
  L: "3",
  M: "4",
  N: "5",
  O: "6",
  P: "7",
  Q: "8",
  R: "9",
  S: "1",
  T: "2",
  U: "3",
  V: "4",
  W: "5",
  X: "6",
  Y: "7",
  Z: "8",
};
// Method to calculate Fate & root Number

function myFate() {
  var dobVal = getElement(".dob").value.toString().replaceAll("-", "");
  var sumRoot = parseInt(dobVal[6]) + parseInt(dobVal[7]);
  var rootVal = getElement(".root");
  rootVal.value = sumRoot;
  var sumFate = 0;
  for (let i = 0; i < dobVal.length; i++) {
    sumFate += parseInt(dobVal[i]);
  }
  var fateVal = getElement(".fate");
  var fatestr = sumFate.toString();
  fateVal.value = parseInt(fatestr[0]) + parseInt(fatestr[1]);
}

function personalityCal(fullName) {
  var personalityValue = getElement(".person");
  var personalityNumber1 = 0,
    personalityNumber2 = 0,
    personalityNumber3 = 0,
    strone = 0,
    strtwo = 0,
    strthree = 0;
  var firstName = fullName[0];
  var middleName = fullName[1];
  var lastName = fullName[2];
  if (firstName) {
    const noVowels1 = firstName.replace(/[aeiou]/gi, "");
    for (let i = 0; i < noVowels1.length; i++) {
      if (Object.keys(desValues).includes(noVowels1[i].toUpperCase())) {
        var pn1 = noVowels1[i].toUpperCase();
        var ptotal1 = parseInt(desValues[pn1]);
        personalityNumber1 += ptotal1;
      }
      var perstr1 = personalityNumber1.toString();
      strone = parseInt(perstr1[0]) + parseInt(perstr1[1]);
    }
  }
  if (middleName) {
    const noVowels2 = middleName.replace(/[aeiou]/gi, "");
    for (let i = 0; i < noVowels2.length; i++) {
      if (Object.keys(desValues).includes(noVowels2[i].toUpperCase())) {
        var pn2 = noVowels2[i].toUpperCase();
        var ptotal2 = parseInt(desValues[pn2]);
        personalityNumber2 += ptotal2;
      }
      var perstr2 = personalityNumber2.toString();
      strtwo = parseInt(perstr2[0]) + parseInt(perstr2[1]);
    }
  }
  if (lastName) {
    const noVowels3 = lastName.replace(/[aeiou]/gi, "");
    for (let i = 0; i < noVowels3.length; i++) {
      if (Object.keys(desValues).includes(noVowels3[i].toUpperCase())) {
        var pn3 = noVowels3[i].toUpperCase();
        var ptotal3 = parseInt(desValues[pn3]);
        personalityNumber3 += ptotal3;
      }
      var perstr3 = personalityNumber3.toString();
      strthree = parseInt(perstr3[0]) + parseInt(perstr3[1]);
    }
  }
  var perTotal = (
    parseInt(strone) +
    parseInt(strtwo) +
    parseInt(strthree)
  ).toString();
  var calpersonality = parseInt(perTotal[0]) + parseInt(perTotal[1]);
  personalityValue.value = `${calpersonality}`;
}
//CALCULATION FOR PERSONALITY NUMBER -  ONLY CONSONENTS,CALCULATION FOR DESIRED NUMBER -  ONLY VOWELS
function myChaldean() {
  var nameVal = getElement(".Name").value;
  var chaldValue = getElement(".chald");
  var pyvalue = getElement(".pytha");

  var sum = 0;
  if (nameVal) {
    for (let i = 0; i < nameVal.length; i++) {
      if (Object.keys(values).includes(nameVal[i].toUpperCase())) {
        var dx = nameVal[i].toUpperCase();
        var t = parseInt(values[dx]);
        sum += t;
      }
      chaldValue.value = `${sum}`;
    }
  }
  var psum = 0;

  if (nameVal) {
    for (let i = 0; i < nameVal.length; i++) {
      if (Object.keys(phyvalues).includes(nameVal[i].toUpperCase())) {
        var dx = nameVal[i].toUpperCase();
        var t = parseInt(phyvalues[dx]);
        psum += t;
      }
      pyvalue.value = `${psum}`;
    }
  }
  var fullName = nameVal.split(" ");
  personalityCal(fullName);
  desire(nameVal);
}
function desire(nameVal) {
  var desireValue = getElement(".Desire");
  var dtotal = 0;
  const vowels = 'aeiouAEIOU'; 
  for (let i = 0; i < nameVal.length; i++) {
    const character = nameVal[i];
    if (vowels.includes(character)) {
      const upperCaseChar = character.toUpperCase();
      if (Object.keys(desValues).includes(upperCaseChar)) {
        var dx = upperCaseChar;
        var t = parseInt(desValues[dx]);
        dtotal += t;
      }
    }
  }
  desireValue.value = `${dtotal}`;
};

document.addEventListener('DOMContentLoaded', function () {
  const infoIcons = document.querySelectorAll('.info-icon');

  infoIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
      const tooltipText = icon.getAttribute('data-tooltip');

      if (tooltipText) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        const iconRect = icon.getBoundingClientRect();
        tooltip.style.top = iconRect.bottom + 'px';
        tooltip.style.left = iconRect.left + 'px';

        document.body.appendChild(tooltip);
        setTimeout(() => {
          document.body.removeChild(tooltip);
        }, 9500);
      }
    });
  });
});
