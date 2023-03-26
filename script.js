var selectedDays = [];
var unselectedDays = [];
var chosenWeekDayArray = [];
var currentMonthDays = [];
var daysToWork = [];
var daysNotWorked;

const date = new Date();

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
    document.querySelector(".date p").className = "otherMonth";
  } 


  let days = "";

  // Add the last days of the last month
  for(let x = firstDayIndex; x > 0 ;x--) {
    days += `<div class="prev-month">${prevLastDay - x + 1}</div>`;
    //x +=10 ==> x = x + 10
  }

  //Add the days of the current months
  for(let i = 1; i <= lastDay ;i++) {
    if(selectedDays.includes(i)){
      days += `<div class="day-select">${i}</div>`;
    } 
    else if(i === (new Date().getDate()) && (date.getMonth() === new Date().getMonth())){
      days += `<div class="today">${i}</div>`;
    }
    else {
      days += `<div>${i}</div>`;
    }
    unselectedDays.push(i)
  }

  //Add the first days of the next months
  for(let j = 1; j <= nextDays; j++) {
    days += `<div class="next-month">${j}</div>`;
  }


  //Print the days.
  monthDays.innerHTML = days;

  //WeekEnd
  currentMonthDays = document.querySelectorAll('.days div:not([class="prev-month"], [class="next-month"])');
  for(let w = 1; w < currentMonthDays.length; w++){
    let weekEnd = new Date(date.getFullYear(), date.getMonth(), w + 1).getDay();
    if((weekEnd == 0 || weekEnd == 6) && (currentMonthDays[w].className == '')){
      currentMonthDays[w].className += 'no-work';
    }
    else if(weekEnd == 0 || weekEnd == 6){
      currentMonthDays[w].className += ' no-work';
    }
  }

  //Add the day-select class and event listener in each day
  daysToWork = document.querySelectorAll('.days div:not([class="prev-month"], [class="next-month"], [class*="no-work"])');
  daysNotWorked = document.querySelectorAll('.days div:not([class*="no-work"])').length;
  
  for(let y = 0; y < daysToWork.length; y++){
    let day = parseInt(daysToWork[y].innerText);  
    if(selectedDays.includes(day) ){
        daysToWork[y].className = "day-select";
      } 
      else{
        daysToWork[y].className.replace("day-select", "").trim();
      }
    
    daysToWork[y].addEventListener("click", () => {
        if (daysToWork[y].className == ""){
          selectedDays.push(day);
          selectedDays = selectedDays.filter((item, pos) => selectedDays.indexOf(item) == pos)
        }
        else if(!daysToWork[y].className.includes("day-select")){y
          selectedDays.push(day);
          selectedDays = selectedDays.filter((item, pos) => selectedDays.indexOf(item) == pos);
        }
        else if(daysToWork[y].className == "day-select"){
          selectedDays.splice(selectedDays.indexOf(day),1);
        }
        //.today Case
        else if(daysToWork[y].className.includes("day-select")){ 
          selectedDays.splice(selectedDays.indexOf(day),1);
        }
        renderCalendar();
      })
    
    //Delete the repeated days
    selectedDays = selectedDays.filter((item, pos) => selectedDays.indexOf(item) == pos);
    unselectedDays = unselectedDays.filter((item, pos) => unselectedDays.indexOf(item) == pos);
    //Delete the selected days from unselected days
    unselectedDays = unselectedDays.filter(x => !selectedDays.includes(x))
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
  selectedDays = [];
  document.querySelectorAll('.weekDay-select').forEach(x=>x.className='')
  renderCalendar();
})

//The > icon to change month
document.querySelector('.next').
addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  ifMonthEqual();
  chosenWeekDayArray = [];
  selectedDays = [];
  document.querySelectorAll('.weekDay-select').forEach(x=>x.className='')
  renderCalendar();
})

//To go back to the current month
document.querySelector(".date p").addEventListener("click", () => {
  if(document.querySelector(".date p").className === "otherMonth"){
    date.setMonth(new Date().getMonth());
    document.querySelector(".date p").className = ""
    chosenWeekDayArray = [];
    selectedDays = [];
    document.querySelectorAll('.weekDay-select').forEach(x=>x.className='')
    renderCalendar();
  }
})

//Select all the days of z weekDay.
const weekDay = document.querySelectorAll('.weekdays div');
for(let z = 0; z < weekDay.length; z++){
    weekDay[z].addEventListener("click", () => {
      if(!chosenWeekDayArray.includes(z) && (z !== 0) && (z !== 6)) {
        chosenWeekDayArray.push(z);
        // To eliminate duplicates. definition of filter: filter((element) => { /* … */ }) |  filter((element, index) => { /* … */ }) | filter((element, index, array) => { /* … */ })}
        chosenWeekDayArray = chosenWeekDayArray.filter((item, pos) => chosenWeekDayArray.indexOf(item) == pos);
        weekDay[z].className = 'weekDay-select';
        //Add all the selected days of z weekdays
        selectedDays = selectedDays.concat(unselectedDays.filter((element) => z == new Date(date.getFullYear(), date.getMonth(), element).getDay()));
      } else if ((z !== 0) && (z !== 6)) {
          chosenWeekDayArray.splice(chosenWeekDayArray.indexOf(z),1);
          weekDay[z].className = '';
          selectedDays = selectedDays.filter((element) => z !== new Date(date.getFullYear(), date.getMonth(), element).getDay());
        } else {
          alert('hey')
          weekDay[z].className = 'weekend';
          }
    renderCalendar();
  })
}

renderCalendar();

//Contador
const counterDays = () => {
  daysToWork = Math.round((document.querySelectorAll('.days div:not([class="prev-month"], [class="next-month"], [class*="no-work"])').length)*0.60);
  var daysWorked = document.querySelectorAll('.day-select').length;
  if(daysWorked >= daysToWork ){
    alert("You are ok! and have " + (daysWorked - daysToWork)  + " days more")
  }
  else{
    alert("You need " + (daysToWork - daysWorked) + ' days more' )
  }
}

function firstMessage(){
  alert("Do a click in the name of the day when you go to the office");
}

document.getElementById("counter").addEventListener("click", counterDays)




