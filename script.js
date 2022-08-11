function reset() {
	setup(size);
}

function changeSize() {
	const input = document.querySelector("#sizeInput");
	let value = input.value;
	if (value == "") return;
	value = parseInt(value);
	console.log(value);
	if (value < 1 || value > 100) {
		if (!document.querySelector(".error")) {
			let errorMessage = document.createElement("div");
			errorMessage.classList.add("error");
			errorMessage.textContent = "Please enter a number from 1 to 100";
			let sizeSelector = document.querySelector("#sizeSelector");
			sizeSelector.insertBefore(
				errorMessage,
				document.querySelector("#changeSizeButton")
			);
		}
	} else {
		console.log(document.querySelector(".error"));
		if (document.querySelector(".error")) {
			document.querySelector(".error").remove();
		}
		size = value;
		setup(size);
	}
}

function setup(size) {
	let canvas = document.querySelector(".canvas");

	while (canvas.firstChild) {
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

	function changeColor(event) {
		event.target.style.backgroundColor = isRandom
			? random_rgba()
			: currColor;
	}

	const squares = document.querySelectorAll(".square");
	squares.forEach((square) => {
		square.addEventListener("mouseover", changeColor);
		square.addEventListener("touchmove", (e) => {
			e.preventDefault();
		});
		square.isSquare = true;
	});
}

function removeSelected() {
	const selected = document.querySelector(".selected");
	selected.classList.remove("selected");
}

function random_rgba() {
	let o = Math.round,
		r = Math.random,
		s = 255;
	return (
		"rgba(" +
		o(r() * s) +
		"," +
		o(r() * s) +
		"," +
		o(r() * s) +
		"," +
		r().toFixed(1) +
		")"
	);
}

function randomize() {
	removeSelected();
	document.querySelector("#randomButton").classList.add("selected");
	isRandom = true;
}

// default grid is of size 16, color is black
let size = 16;
let currColor = "black";
let isRandom = false;

document.querySelector("#black").classList.add("selected");

setup(size);
const colors = document.querySelectorAll(".color");

// the color changes to the id of the preset colors, remove any selected options
colors.forEach((color) => {
	color.style.backgroundColor = color.id;
	color.addEventListener("click", (e) => {
		const target = e.target;
		currColor = target.id;

		if (isRandom) isRandom = false;
		removeSelected();

		target.classList.add("selected");
	});
});

const picker = document.querySelector("#picker");
picker.addEventListener("input", (e) => {
	currColor = e.target.value;

	if (isRandom) isRandom = false;
	removeSelected();

	e.target.classList.add("selected");
});

document.querySelector("#eraser").addEventListener("click", (e) => {
	currColor = "white";
	if (isRandom) isRandom = false;
	removeSelected();
	document.querySelector("#eraser").classList.add("selected");
});

const canvas = document.querySelector(".canvas");

canvas.addEventListener("touchmove", (e) => {
	e.preventDefault();

	const touch = e.touches[0];
	const pageX = touch.clientX;
	const pageY = touch.clientY;

	const square = document.elementFromPoint(pageX, pageY);

	const mouseoverEvent = new Event("mouseover");
	if (square && square.isSquare) {
		if (!canvas.lastSquare) {
			square.dispatchEvent(mouseoverEvent);
			canvas.lastSquare = square;
		} else if (canvas.lastSquare !== square) {
			square.dispatchEvent(mouseoverEvent);
			canvas.lastSquare = square;
		}
	}
});

const closeMenuButton = document.querySelector(".close");
const openMenuButton = document.querySelector(".open");
const tools = document.querySelector("#tools");
const modal = document.querySelector(".modal");

openMenuButton.addEventListener("click", () => {
	openMenuButton.classList.remove("active");
	closeMenuButton.classList.add("active");
	tools.classList.add("active");
	modal.classList.add("active");
});

closeMenuButton.addEventListener("click", () => {
	openMenuButton.classList.add("active");
	closeMenuButton.classList.remove("active");
	tools.classList.remove("active");
	modal.classList.remove("active");
});

modal.addEventListener("click", () => {
	openMenuButton.classList.add("active");
	closeMenuButton.classList.remove("active");
	tools.classList.remove("active");
	modal.classList.remove("active");
});
