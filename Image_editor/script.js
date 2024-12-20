const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
let fileName = "";
let isImageLoaded = false;
let actionsStack = [];

const downloadBtn = document.getElementById("download-btn");
const uploadFile = document.getElementById("upload-file");
const revertBtn = document.getElementById("revert-btn");
const undoBtn = document.querySelector(".undo");

// Image Upload
uploadFile.addEventListener("change", () => {
    const file = uploadFile.files[0];
    const reader = new FileReader();

    if (file) {
        fileName = file.name;
        reader.readAsDataURL(file);
    }

    reader.onload = function(e) {
        img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            isImageLoaded = true;
            saveState(); // Save the initial state
        };
        img.src = e.target.result;
    };
});

// Save the state of the canvas
function saveState() {
    if (isImageLoaded) {
        // Ensure actionsStack doesn't grow indefinitely
        if (actionsStack.length >= 20) {
            actionsStack.shift();
        }
        actionsStack.push(canvas.toDataURL());
    }
}

// Undo the last action
undoBtn.addEventListener("click", () => {
    if (actionsStack.length > 1) {
        actionsStack.pop(); // Remove the current state
        const previousState = actionsStack[actionsStack.length - 1];
        const img = new Image();
        img.src = previousState;
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    }
});

// Filter & Effect Handlers
document.addEventListener("click", (e) => {
    if (isImageLoaded && e.target.classList.contains("filter-btn")) {
        if (e.target.classList.contains("brightness-add")) {
            Caman("#canvas", img, function () {
                this.brightness(5).render(saveState);
            });
        } else if (e.target.classList.contains("brightness-remove")) {
            Caman("#canvas", img, function () {
                this.brightness(-5).render(saveState);
            });
        } else if (e.target.classList.contains("contrast-add")) {
            Caman("#canvas", img, function () {
                this.contrast(5).render(saveState);
            });
        } else if (e.target.classList.contains("contrast-remove")) {
            Caman("#canvas", img, function () {
                this.contrast(-5).render(saveState);
            });
        } else if (e.target.classList.contains("saturation-add")) {
            Caman("#canvas", img, function () {
                this.saturation(5).render(saveState);
            });
        } else if (e.target.classList.contains("saturation-remove")) {
            Caman("#canvas", img, function () {
                this.saturation(-5).render(saveState);
            });
        } else if (e.target.classList.contains("vibrance-add")) {
            Caman("#canvas", img, function () {
                this.vibrance(5).render(saveState);
            });
        } else if (e.target.classList.contains("vibrance-remove")) {
            Caman("#canvas", img, function () {
                this.vibrance(-5).render(saveState);
            });
        } else if (e.target.classList.contains("vintage-add")) {
            Caman("#canvas", img, function () {
                this.vintage().render(saveState);
            });
        } else if (e.target.classList.contains("lomo-add")) {
            Caman("#canvas", img, function () {
                this.lomo().render(saveState);
            });
        } else if (e.target.classList.contains("clarity-add")) {
            Caman("#canvas", img, function () {
                this.clarity().render(saveState);
            });
        } else if (e.target.classList.contains("sincity-add")) {
            Caman("#canvas", img, function () {
                this.sinCity().render(saveState);
            });
        } else if (e.target.classList.contains("crossprocess-add")) {
            Caman("#canvas", img, function () {
                this.crossProcess().render(saveState);
            });
        } else if (e.target.classList.contains("pinhole-add")) {
            Caman("#canvas", img, function () {
                this.pinhole().render(saveState);
            });
        } else if (e.target.classList.contains("nostalgia-add")) {
            Caman("#canvas", img, function () {
                this.nostalgia().render(saveState);
            });
        } else if (e.target.classList.contains("hermajesty-add")) {
            Caman("#canvas", img, function () {
                this.herMajesty().render(saveState);
            });
        } else if (e.target.classList.contains("rotate-left")) {
            rotateImage(-90);
            saveState();
        } else if (e.target.classList.contains("rotate-right")) {
            rotateImage(90);
            saveState();
        } else if (e.target.classList.contains("crop")) {
            cropImage();
            saveState();
        }
    }
});

// Revert Filters
revertBtn.addEventListener("click", () => {
    Caman("#canvas", img, function () {
        this.revert(saveState);
    });
});

// Download Event
downloadBtn.addEventListener("click", () => {
    // Get extension
    const fileExtension = fileName.slice(-4);

    // New file name
    let newFileName;

    // Check image type
    if (fileExtension === ".jpg" || fileExtension === ".png") {
        newFileName = fileName.substring(0, fileName.length - 4) + "-edited.jpg";
    }

    // Download
    download(canvas, newFileName);
});

// Download
function download(canvas, filename) {
    // Create link
    const link = document.createElement("a");

    // Set properties
    link.download = filename;
    link.href = canvas.toDataURL("image/jpeg", 0.8);

    // Simulate click
    link.click();
}

// Rotate Image
function rotateImage(degrees) {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = degrees === 90 || degrees === -90 ? canvas.height : canvas.width;
    tempCanvas.height = degrees === 90 || degrees === -90 ? canvas.width : canvas.height;

    tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
    tempCtx.rotate((degrees * Math.PI) / 180);
    tempCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);

    canvas.width = tempCanvas.width;
    canvas.height = tempCanvas.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);
}

// Crop Image
function cropImage() {
    const cropWidth = canvas.width * 0.8;
    const cropHeight = canvas.height * 0.8;

    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = cropWidth;
    tempCanvas.height = cropHeight;

    tempCtx.drawImage(canvas, 0, 0, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

    canvas.width = cropWidth;
    canvas.height = cropHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);
}
