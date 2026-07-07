const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const frameCount = 300;
const images = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = `frames/${String(i).padStart(4, "0")}.webp`;
    images.push(img);
}

function drawFrame(index) {

    const img = images[index];

    if (!img.complete) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const canvasRatio = canvas.width / canvas.height;
    const imageRatio = img.width / img.height;

    let drawWidth, drawHeight;
    let offsetX, offsetY;

    if (canvasRatio > imageRatio) {

        drawWidth = canvas.width;
        drawHeight = drawWidth / imageRatio;

        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;

    } else {

        drawHeight = canvas.height;
        drawWidth = drawHeight * imageRatio;

        offsetY = 0;
        offsetX = (canvas.width - drawWidth) / 2;

    }

    ctx.drawImage(
        img,
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
    );
}

function updateFrame() {

    const maxScroll =
        document.body.scrollHeight - window.innerHeight;

    const scrollFraction = window.scrollY / maxScroll;

    const frame = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * (frameCount - 1))
    );

    drawFrame(frame);
}

images[0].onload = () => {
    drawFrame(0);
};

window.addEventListener("scroll", updateFrame);

window.addEventListener("resize", () => {
    resizeCanvas();
    updateFrame();
});