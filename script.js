const date = new Date();

var check = 0;
var chosenDay;
var chosenDayArray = [];
var day;

const renderCalendar = () => {

  date.setDate(1);

  const monthDays = document.querySelector(".days");
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); //If you put 0 or negative values in day, start to go back to the days.
  const prevLastDay = new Date(date.getFullYear(), date.getMonth() , 0).getDate();
  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const nextDays = 6 - lastDayIndex;
  const months = [
    "January",  
    "February",  
    "March",  
    "April",  
    "May",  
    "June",  
    "July",  
    "August",  
    "September",  
    "October",  
    "November",  
    "December",
  ]

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  if(new Date().getMonth() != date.getMonth()){
    document.querySelector(".date p").className = "otherMonth"
  } 

  let days = "";

  // Add the last days of the last month
  for(let x = firstDayIndex; x > 0 ;x--) {
    days += `<div class="prev-month">${prevLastDay - x + 1}</div>`;
    //x +=10 ==> x = x + 10
  }

  //Add the days of the current months
  for(let i = 1; i <= lastDay ;i++) {
    let findWeekDay = chosenDayArray.find(e => e==new Date(date.getFullYear(), date.getMonth(), i).getDay()); //Return the value of the day found in the array of the chosen days.
    if(findWeekDay !== undefined){
      days += `<div class="day-select">${i}</div>`;
    } 
    else if(i === (new Date().getDate()) && (date.getMonth() === new Date().getMonth())){
      days += `<div class="today">${i}</div>`;
    }
    else {
      days += `<div>${i}</div>`;
    }
  }

  //Add the first days of the next months
  for(let j = 1; j <= nextDays; j++) {
    days += `<div class="next-month">${j}</div>`;
  }

  //Print the days.
  monthDays.innerHTML = days;

  day = document.querySelectorAll('.days div:not([class="prev-month"], [class="next-month"])');
  for(let y = 0; y < day.length; y++){
      day[y].addEventListener("click", () => {
        if (day[y].className == ""){
          day[y].className = "day-select";
        }
        else {
          day[y].className = "";
        }
      })
  }
};

//date = newDate()... so wtf with this function. Ohhh the month could be change ater... xd
const ifMonthEqual = () => { 
  if(new Date().getMonth() === date.getMonth()){
  document.querySelector(".date p").className = ""
} 
}

//The < icon to change month
document.querySelector('.prev').
addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  ifMonthEqual();
  chosenDayArray = [];
  renderCalendar();
})

//The > icon to change month
document.querySelector('.next').
addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  ifMonthEqual();
  chosenDayArray = [];
  renderCalendar();
})

//To go back to the current month
document.querySelector(".date p").addEventListener("click", () => {
  if(document.querySelector(".date p").className === "otherMonth"){
    date.setMonth(new Date().getMonth());
    document.querySelector(".date p").className = ""
    chosenDayArray = [];
    renderCalendar();
  }
})

// This start officialy my code
const weekDay = document.querySelectorAll('.weekdays div');

//Select all the days of x day.
for(let z = 0; z < weekDay.length; z++){
  weekDay[z].addEventListener("click", () => {
      if(!chosenDayArray.includes(z)) {
        chosenDayArray.push(z)
        // To eliminate duplicates. definition of filter: filter((element) => { /* … */ }) |  filter((element, index) => { /* … */ }) | filter((element, index, array) => { /* … */ })}
        chosenDayArray = chosenDayArray.filter((item, pos) => chosenDayArray.indexOf(item) == pos)
      } else {
        let indexDayArray = chosenDayArray.indexOf(z)
        chosenDayArray.splice(indexDayArray,1)
        check = 0;
      }
    renderCalendar();
  })
}

renderCalendar();






