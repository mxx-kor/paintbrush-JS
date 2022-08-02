const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const color = document.getElementById("selected_color");
const colorOptions = Array.from(document.getElementsByClassName("color_option"));
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const resetBtn = document.getElementById('reset_btn');
const eraseBtn = document.getElementById('erase_btn');
const saveBtn = document.getElementById("jsSave");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 800;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.lineWidth = 2.5;
ctx.lineCap = "round";
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseUp() {
    stopPainting();
}

function onColorChange(event) {
    const color = event.target.value;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill"
    }else {
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]🖌";
    link.click();
}

function onResetClick() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function onEraseClick() {
    ctx.strokeStyle = "white";
    filling = false
    mode.innerText = "Fill";
}

function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function () {
        ctx.drawImage(image, 0, 0, CANVAS_SIZE, CANVAS_SIZE)
    };
    fileInput.value = null;
}

function onDoubleClick(event) {
    const text = textInput.value;
    if (text !== "") {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "48px serif";
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
canvas.addEventListener("click", handleCanvasClick);
canvas.addEventListener("contextmenu", handleCM);

colorOptions.forEach(color => color.addEventListener("click", onColorClick))


range.addEventListener("change", handleRangeChange);

mode.addEventListener("click", handleModeClick);

saveBtn.addEventListener("click", handleSaveClick);

resetBtn.addEventListener('click', onResetClick);

eraseBtn.addEventListener('click', onEraseClick);

color.addEventListener('change', onColorChange);

fileInput.addEventListener("change", onFileChange)


