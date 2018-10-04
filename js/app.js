// store the number of squares
let squareNumbers = 6;
let selectedColor;

//let squaresContainer = document.querySelectorAll(".square");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");

let colors = generateRandomColor(squareNumbers);
// let colors = [];
let squaresContainer = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");
let headerOne = document.querySelector("h1");
let messageText = document.querySelector("#message");


selectedColor = pickColor();


function init() {
    reset();
    createSquares();
    activateModeButtons();
}

function createSquares() {
    for (let i = 0; i < squaresContainer.length; i++) {
        squaresContainer[i].style.backgroundColor = colors[i];
    
        //enable click functionality on each square
    
        squaresContainer[i].addEventListener("click", function() {
            let clickedColor = this.style.backgroundColor;
    
            // check if the clicked square has a corresponding color to the predefined selected color
            if (selectedColor === clickedColor) {
                changeColors(selectedColor);
                messageText.textContent = "Correct!";
                squaresContainer[i].classList.add("disabled");
            } else {
                squaresContainer[i].classList.add("disabled");
                this.style.backgroundColor = "#232323";
                messageText.textContent = "Wrong Choice";
            }
        })
    }
}


// mode buttons
// when easy is clicked, show 3 squares
//when hard is clicked, show 6 squares
// let hard be the default.

function activateModeButtons() {
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            // console.log(this);
            this.classList.add("selected");

            if (this.textContent === 'Easy') {
                squareNumbers = 3;
            } else {
                squareNumbers = 6;
            }
            reset();
        })    
    }
}


function changeColors(color) {
    for (let i = 0; i < squaresContainer.length; i++) {
        // change each color to match the correctly clicked color
        squaresContainer[i].style.backgroundColor = color;
        // change the header background color to match the correctly clicked color
        headerOne.style.backgroundColor = color;
        squaresContainer[i].classList.add("disabled");
    }
}

// this function is to get the random colors
function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// here we pick out random colors
function randomColor() {
    // recall that there are 255 colors.
    // we'll be picking from 0 - 255 hence the 256
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + b + ", " + g + ")";
}


// here we generate random colors to the squares given the number of squares (easy- 3, hard- 6)
function generateRandomColor(num) {
    let arr = [];

    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }

    return arr;
}

// generate a new array of colors
// pick new random color
// fill out squares with new colors

// reset colors
function reset() {
    colors = generateRandomColor(squareNumbers);
    selectedColor = pickColor();
    colorDisplay.textContent = selectedColor;
    messageText.textContent = "";
    headerOne.style.backgroundColor = "";
    
    for (let i = 0; i < squaresContainer.length; i++) {  
        squaresContainer[i].classList.remove("disabled");

        if(colors[i]){
			squaresContainer[i].style.display = "block";
			squaresContainer[i].style.backgroundColor = colors[i];
		} else {
			squaresContainer[i].style.display = "none";
		}
    }
}

resetButton.addEventListener("click", function() {
    reset();
})

init();