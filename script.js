let size = 16;
let currColor = "black";

function reset () {
    setup(size);
}

function changeSize(){
    const input = (document.querySelector("#sizeInput"));
    let value = input.value;
    if (value == "") return;
    value = parseInt(value);
    console.log(value);
    if (value < 1 || value > 100){
        if (!document.querySelector(".error"))
        {
            let errorMessage = document.createElement("div");
            errorMessage.classList.add("error");
            errorMessage.textContent = "Please enter a number from 1 to 100";
            let sizeSelector = document.querySelector("#sizeSelector");
            sizeSelector.insertBefore(errorMessage, document.querySelector("#changeSizeButton"));
        }
    }
    else {
        console.log(document.querySelector(".error"));
        if (document.querySelector(".error")){
            document.querySelector(".error").remove();
        }
        size = value;
        setup(size);
    }
}

function setup(size){
    let canvas = document.querySelector(".canvas");

    while (canvas.firstChild){
        canvas.removeChild(canvas.firstChild);
    }

    for (let i = 0; i < size; i++) {
        let currRow = document.createElement("div");
        currRow.classList.add("row");
        for (let j = 0; j < size; j++) {
            let currSquare = document.createElement("div");
            currSquare.classList.add("square");

            if (j == size - 1) {
                currSquare.classList.add("lastCol");
            }

            currRow.appendChild(currSquare);
        }
        if (i == size - 1) {
            currRow.classList.add("lastRow");
        }

        canvas.appendChild(currRow);
    }

    const squares = document.querySelectorAll(".square");
    squares.forEach( square => square.addEventListener('mouseover', function (e){
        e.target.style.backgroundColor = currColor;
    }));
}

setup(size);
const colors = document.querySelectorAll(".color");

colors.forEach(color => {
    color.style.backgroundColor = color.id;
    color.addEventListener("click", (e)=> currColor = e.target.id);
});

const picker = document.querySelector("#picker");
picker.addEventListener("input", (e) => currColor = e.target.value);
const wheel = document.querySelector("#thirdRow img");
wheel.addEventListener("click", picker.click());

document.querySelector("#eraser").addEventListener("click", () => currColor = "white");