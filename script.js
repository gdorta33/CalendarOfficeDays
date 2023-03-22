const date = new Date();

var chosenDayArray = [];
var chosenWeekDayArray = [];
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
    let findWeekDay = chosenWeekDayArray.includes(new Date(date.getFullYear(), date.getMonth(), i).getDay()); //If the day includes the number of the week day then return true
    if((findWeekDay == true) || chosenDayArray.includes(i-1) ){
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
          chosenDayArray.push(y);
          chosenDayArray = chosenDayArray.filter((item, pos) => chosenDayArray.indexOf(item) == pos)
        }
        else if(!day[y].className.includes("day-select")){
          day[y].className += " day-select";
          chosenDayArray.push(y);
          chosenDayArray = chosenDayArray.filter((item, pos) => chosenDayArray.indexOf(item) == pos);
        }
        else if(day[y].className == "day-select"){
          day[y].className = "";
          chosenDayArray.splice(chosenDayArray.indexOf(y),1)
        }
        else{
          day[y].className = day[y].className.replace("day-select", "").trim();
          chosenDayArray.splice(chosenDayArray.indexOf(y),1);
        }
      })
  }

  //WeekEnd
 
  for(let w = 1; w < day.length; w++){
    let weekEnd = new Date(date.getFullYear(), date.getMonth(), w + 1).getDay();
    if((weekEnd == 0 || weekEnd == 6) && (day[w].className == '')){
      day[w].className += 'no-work';
    }
    else if(weekEnd == 0 || weekEnd == 6){
      day[w].className += ' no-work';
    }
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
  chosenWeekDayArray = [];
  chosenDayArray = [];
  renderCalendar();
})

//The > icon to change month
document.querySelector('.next').
addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  ifMonthEqual();
  chosenWeekDayArray = [];
  chosenDayArray = [];
  renderCalendar();
})

//To go back to the current month
document.querySelector(".date p").addEventListener("click", () => {
  if(document.querySelector(".date p").className === "otherMonth"){
    date.setMonth(new Date().getMonth());
    document.querySelector(".date p").className = ""
    chosenWeekDayArray = [];
    chosenDayArray = [];
    renderCalendar();
  }
})

// This start officialy my code
const weekDay = document.querySelectorAll('.weekdays div');

//Select all the days of x day.
for(let z = 0; z < weekDay.length; z++){
    weekDay[z].addEventListener("click", () => {
      if(!chosenWeekDayArray.includes(z)) {
        chosenWeekDayArray.push(z)
        // To eliminate duplicates. definition of filter: filter((element) => { /* … */ }) |  filter((element, index) => { /* … */ }) | filter((element, index, array) => { /* … */ })}
        chosenWeekDayArray = chosenWeekDayArray.filter((item, pos) => chosenWeekDayArray.indexOf(item) == pos)
      } else {
        let indexDayArray = chosenWeekDayArray.indexOf(z);
        chosenWeekDayArray.splice(indexDayArray,1);
        chosenDayArray = chosenDayArray.filter((element) => z !== new Date(date.getFullYear(), date.getMonth(), element + 1).getDay());
      }
    renderCalendar();
  })

}

renderCalendar();

//Contador

const counterDays = () => {
  var toWorkDays = Math.round((document.querySelectorAll('.days div:not([class="prev-month"], [class="next-month"], [class*="no-work"])').length)*0.60);
  var workedDays = document.querySelectorAll('.day-select').length;
  if(workedDays >= toWorkDays ){
    alert("You are ok! and have " + (workedDays - toWorkDays)  + " days more")
  }
  else{
    alert("You need " + (toWorkDays - workedDays) + ' days more' )
  }
}

document.getElementById("counter").addEventListener("click", counterDays)






