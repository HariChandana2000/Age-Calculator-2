const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const form = document.getElementById("form");

const calculatBtn = document.getElementById("calculate-btn");
calculatBtn.addEventListener("click", (e) => ageCalculate(e));

function ageCalculate(e) {
  e.preventDefault();
  let today = new Date();
  let inputDate = new Date(document.getElementById("dob-input").value);
  let birthMonth, birthDate, birthYear;
  let birthDetails = {
    date: inputDate.getDate(),
    month: inputDate.getMonth() + 1,
    year: inputDate.getFullYear(),
  };
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth() + 1;
  let currentDate = today.getDate();

  leapChecker(currentYear);

  if (
    birthDetails.year > currentYear ||
    (birthDetails.month > currentMonth && birthDetails.year == currentYear) ||
    (birthDetails.date > currentDate &&
      birthDetails.month == currentMonth &&
      birthDetails.year == currentYear)
  ) {
    form.className = "animate";
    alert("Not Born Yet");
    displayResult("-", "-", "-");
    setTimeout(() => {
      form.className = "";
      return;
    }, 500);
    return;
  }

  birthYear = currentYear - birthDetails.year;

  if (currentMonth >= birthDetails.month) {
    birthMonth = currentMonth - birthDetails.month;
  } else {
    birthYear--;
    birthMonth = 12 + currentMonth - birthDetails.month;
  }

  if (currentDate >= birthDetails.date) {
    birthDate = currentDate - birthDetails.date;
  } else {
    birthMonth--;
    let days = months[currentMonth - 2];
    birthDate = days + currentDate - birthDetails.date;
    if (birthMonth < 0) {
      birthMonth = 11;
      birthYear--;
    }
  }
  displayResult(birthDate, birthMonth, birthYear);
}

function displayResult(bDate, bMonth, bYear) {
  if (
    document.getElementById("dob-input").value === "" ||
    document.getElementById("dob-input").value === undefined
  )
    form.className = "animate";
  document.getElementById("years").innerText = bYear;
  document.getElementById("months").innerText = bMonth;
  document.getElementById("days").innerText = bDate;
  setTimeout(() => {
    form.className = "";
    return;
  }, 500);
}

function leapChecker(year) {
  if (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
    months[1] = 29;
  } else {
    months[1] = 28;
  }
}
