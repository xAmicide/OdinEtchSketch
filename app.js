const selectionOptions = ["color", "rainbow", "eraser", "clear"];
let selection = selectionOptions[0];
let red = 0;
let green = 0;
let blue = 0;
let opacity = 1;

function getRandomColor() {
  min = Math.ceil(0);
  max = Math.floor(255);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function changeSelection(x) {
  let prev = document.getElementsByClassName("selected");
  prev[0].classList.remove("selected");

  let select = document.getElementById(selectionOptions[x]);
  select.classList.add("selected");
}

let colorMode = document.getElementById("color");
colorMode.addEventListener("click", () => {
  selection = selectionOptions[0];
  changeSelection(0);
  console.log(selection);
});

let rainbow = document.getElementById("rainbow");
rainbow.addEventListener("click", () => {
  selection = selectionOptions[1];
  changeSelection(1);
  console.log(selection);
});

let eraser = document.getElementById("eraser");
eraser.addEventListener("click", () => {
  selection = selectionOptions[2];
  changeSelection(2);
  console.log(selection);
});

let range = document.getElementById("range");
let val = range.value;
let rangeListener = document.getElementById("size-select");
rangeListener.innerText = range.value + "px x " + val + "px";
changeBox(val);

let clear = document.getElementById("clear");
clear.addEventListener("click", () => {
  selection = selectionOptions[3];
  changeSelection(3);
  changeBox(val, 0);
  console.log(selection);
});

range.addEventListener("change", () => {
  console.log("hi");
  let rangeListener = document.getElementById("size-select");
  let val = range.value;
  rangeListener.innerText = range.value + "px x " + val + "px";
  changeBox(val, 1);
});

function changeBox(val, opacity) {
  let previous = document.getElementsByClassName("etch-item");
  while (previous[0]) {
    previous[0].remove();
  }
  for (let i = 0; i < val * val; i++) {
    let a = document.createElement("div");
    a.style.opacity = opacity;
    a.classList.add("etch-item");
    a.style.height = 400 / val;
    a.style.width = 400 / val;
    a.addEventListener("mouseover", () => {
      switch (selection) {
        case "color":
          a.style.opacity = 1;
          a.style.backgroundColor = `rgba(${red}, ${green}, ${blue})`;
          break;
        case "rainbow":
          a.style.opacity = 1;

          a.style.backgroundColor = `rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`;
          break;
        case "eraser":
          a.style.opacity = 1;

          a.style.backgroundColor = `rgb(248, 248, 255)`;
          break;
        case "clear":
          currentOpacity = parseFloat(a.style.opacity);
          console.log(a.style.opacity);
          a.style.opacity = currentOpacity + 0.1;
          a.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        default:
          break;
      }
    });
    let etchbox = document.getElementById("etch-box");
    etchbox.appendChild(a);
  }
}
