//  button variables

const left_buttons = document.querySelector(".btn-left").children;
const right_buttons = document.querySelector(".btn-right").children;

//  inputs varibales

const left_input = document.querySelector('.l-input');
const right_input = document.querySelector('.r-input');

//  rates visualisation variables

const l_p = document.querySelector('.l-p');
const r_p = document.querySelector('.r-p');

//  wrapper element
const wrapper = document.querySelector('.wrapper');

init();

//  The function witch returns the dynamic url

function init() {
  wrapper.style.flexDirection = "row";

  buttonChanger(left_buttons);
  buttonChanger(right_buttons);

  getData(left_buttons, right_buttons, left_input, right_input, l_p, r_p);

  // Events

  left_input.addEventListener("keyup", () => {
    getData(left_buttons, right_buttons, left_input, right_input, l_p, r_p);
  });

  right_input.addEventListener("click", () => {
    wrapper.style.flexDirection === "row"
      ? (wrapper.style.flexDirection = "row-reverse")
      : (wrapper.style.flexDirection = "row");
    left_input.focus();
  });

}

function getLink(base, to) {
  return `https://api.exchangerate.host/latest?base=${base}&symbols=${to}`;
}

//  The function to change buttons active class

function buttonChanger(btns) {
  for (let btn of btns) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      for (let btn of btns) {
        btn.classList.remove("active-button");
      }

      e.target.classList.add("active-button");
      getData(left_buttons, right_buttons,left_input,right_input,l_p,r_p);
    });
  }
}

//  the function to get data

function getData(lButtons,rButtons,l_input,r_input,l_p,r_p) {
  let base;
  let to;

  for (let btn of lButtons) {
    if (btn.classList.contains('active-button')) {
      base = btn.innerText;
     }
   }
  for (let btn of rButtons) {
    if (btn.classList.contains('active-button')) {
       to = btn.innerText
     }
  }
  if (base !== to) {
    fetch(getLink(base, to))
      .then((res) => res.json())
      .then((data) => {
        
        r_input.value = (+l_input.value * data.rates[to]).toFixed(2);
        l_p.innerText = `1 ${base} = ${data.rates[to]} ${to}`;
        r_p.innerText = `1 ${to} = ${(1 / data.rates[to]).toFixed(4)} ${base}`;
      }).catch(error => console.log("Check your internet connection"))
  } else {
    r_input.value = l_input.value
    r_p.innerText = `1 ${base} = 1 ${to}`
    l_p.innerText = r_p.innerText
  }
  
 
}








