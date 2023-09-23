
var day = document.getElementById("day-input"),
    month = document.getElementById("month-input"),
    year = document.getElementById("year-input"),

    day_error_msg = document.getElementById("day-error"),
    month_error_msg = document.getElementById("month-error"),
    year_error_msg = document.getElementById("year-error"),

    days_num = document.getElementById("days-num"),
    months_num = document.getElementById("months-num"),
    years_num = document.getElementById("years-num"),
    btn_submit = document.getElementById("btn-submit");
    
    btn_submit.addEventListener("click", (e) => {
        e.preventDefault();
        calcAge();
      });
      
      function calcAge() {
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        let currentDay = currentDate.getDate();
      
        validateInput(year, year_error_msg, (value) => value <= currentYear && value > 0);
        validateInput(month, month_error_msg, (value) => value <= 12 && value > 0);
        validateInput(day, day_error_msg, (value) => value <= 31 && value > 0);
      
        let birthDate = new Date(year.value, month.value - 1, day.value);
        
        let yearsDiff = currentYear - birthDate.getFullYear();
        let monthsDiff = currentMonth - birthDate.getMonth();
        let daysDiff = currentDay - birthDate.getDate();
      
        if (monthsDiff < 0) {
          yearsDiff--;
          monthsDiff += 12;
        }
      
        if (daysDiff < 0) {
          monthsDiff--;
          if (monthsDiff < 0) {
            yearsDiff--;
            monthsDiff += 12;
          }
          const daysInLastMonth = new Date(currentYear, currentMonth, 0).getDate();
          daysDiff += daysInLastMonth;
        }

        let allInputDivs = document.querySelectorAll(".input-date > div");
        let hasInvalidClass = false;
        allInputDivs.forEach((el) => {
          if (el.classList.contains("invalid")) {
            hasInvalidClass = true;
            return;
          }
        });
        if (!hasInvalidClass) {
          showResult(years_num, yearsDiff);
          showResult(months_num, monthsDiff);
          showResult(days_num, daysDiff);
        } else {
          return false;
        }
      }
      
      function showResult(element, diff) {
        let i = 0;
        let timer = setInterval(() => {
          element.textContent = i;
          i++;
          if (i > diff) {
            clearInterval(timer);
          }
        }, 500/diff);
      }
      
      function validateInput(inputElement, errorMsgElement, validationConditions) {
        if (inputElement.value === "") {
          inputElement.parentNode.classList.add("invalid");
          errorMsgElement.textContent = "This field is required";
        } else if (!validationConditions(inputElement.value)) {
          inputElement.parentNode.classList.add("invalid");
          errorMsgElement.textContent = "Must be a valid value";
        } else {
          inputElement.parentNode.classList.remove("invalid");
        }
      }
    