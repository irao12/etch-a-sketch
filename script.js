let size = 16;

function reset () {
    setup(size);
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
    console.log(squares);
    squares.forEach( square => square.addEventListener('mouseover', function (e){
        e.target.style.backgroundColor = "black";
        console.log(e.target.style.backgroundColor);
    }));
}

setup(size);