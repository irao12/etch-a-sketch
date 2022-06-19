let size = 16;

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
            currRow.appendChild(currSquare);
        }
    }
}

setup(size);