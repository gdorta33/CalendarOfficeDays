const date = new Date();

var check = 0;
var chosenDay;
var chosenDayArray = [];

const renderCalendar = () => {

  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDay = new Date(date.getFullYear(), date.getMonth() , 0).getDate();

  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

  const nextDays = 7 - lastDayIndex - 1;

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

  for(let x = firstDayIndex; x > 0 ;x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    //x +=10 ==> x = x + 10
  }

  for(let i = 1; i <= lastDay ;i++) {
    let findDay = chosenDayArray.find(e=>e==new Date(date.getFullYear(), date.getMonth(), i).getDay()); //Return the value of the day found in the array of the chosen days.
    if(findDay !== undefined){
      days += `<div class="column-select">${i}</div>`;
    } 
    else if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
      days += `<div class="today">${i}</div>`;
    }
    else {
      days += `<div>${i}</div>`;
    }
  }

  for(let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
  }

  monthDays.innerHTML = days;

};

const ifMonthEqual = () => {
  if(new Date().getMonth() === date.getMonth()){
  document.querySelector(".date p").className = ""
} 
}

document.querySelector('.prev').
addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  ifMonthEqual();
  renderCalendar();
})

document.querySelector('.next').
addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  ifMonthEqual();
  renderCalendar();
})

document.querySelector(".date p").addEventListener("click", () => {
  if(document.querySelector(".date p").className === "otherMonth"){
    date.setMonth(new Date().getMonth());
    document.querySelector(".date p").className = ""
    renderCalendar();
  }
})

// Aca empiezo a toca yo para ver el tema de elegir los dias de trabajo
const weekDay = document.querySelectorAll('.weekdays div');


for(let z = 0; z < weekDay.length; z++){
  weekDay[z].addEventListener("click", () => {
      if(!chosenDayArray.includes(z)) {
        chosenDayArray.push(z)
        // To eliminate duplicates. definition of filter: filter((element) => { /* … */ }) |  filter((element, index) => { /* … */ }) | filter((element, index, array) => { /* … */ })}
        chosenDayArray = chosenDayArray.filter(function(item, pos) { 
        return chosenDayArray.indexOf(item) == pos;
        })
      } else {
        let indexDayArray = chosenDayArray.findIndex((e) => e == z)
        if(indexDayArray !== -1){
          chosenDayArray.splice(indexDayArray,1)
          chosenDayArray = chosenDayArray.filter(function(item, pos) { 
            return chosenDayArray.indexOf(item) == pos;
            })
        }
        check = 0;
      }
    renderCalendar();
  })
}


renderCalendar();

//Despues del render por que sino van a estar vacios los nodos de .day div

const day = document.querySelectorAll('.days div');

for(let y = 0; y < day.length; y++){
  if (day[y].className == ""){
    day[y].addEventListener("click", () => {
      if (day[y].className == ""){
        day[y].className = "selectDay";
      }
      else {
        day[y].className = "";
      }
    })
  }
}
