const canvas = document.getElementById('snake-board');
const ctx = canvas.getContext("2d")
const boardFrame = document.getElementById('snake');


const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
boardFrame.style.width = CANVAS_WIDTH + "px"
boardFrame.style.margin = "50px auto"