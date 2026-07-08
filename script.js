const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const title = document.querySelector(".title");
const subtitle = document.querySelector(".subtitle");

const frameCount = 300;
const images = [];
const hero=document.getElementById("hero");

/* ---------------- Canvas ---------------- */

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

/* ---------------- Load Images ---------------- */

for (let i = 1; i <= frameCount; i++) {

    const img = new Image();

    img.src = `frames/${String(i).padStart(4, "0")}.webp`;

    images.push(img);

}

/* ---------------- Draw Frame ---------------- */

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

        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;

    }

    ctx.drawImage(
        img,
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
    );

}

/* ---------------- Scroll Frame ---------------- */

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

/* ---------------- Hero Animation ---------------- */

function updateHero() {

    const maxScroll =
        document.body.scrollHeight - window.innerHeight;

    const progress =
        window.scrollY / maxScroll;

    const heroEnd = 0.15;

    const t = Math.min(progress / heroEnd, 1);
    const opacity = Math.max(0,1-(t*1.3));

    hero.style.opacity = opacity;

    title.style.transform = `
        translateY(${-150 * t}px)
        scale(${1 + (0.2 * t)})
    `;

    title.style.opacity = 1 - t;

    subtitle.style.transform = `
        translateY(${-80 * t}px)
    `;

    subtitle.style.opacity = 1 - t;

}

/* ---------------- Initial Draw ---------------- */

images[0].onload = () => {

    drawFrame(0);

    updateHero();

};

/* ---------------- Events ---------------- */

window.addEventListener("scroll", () => {

    updateFrame();

    updateHero();

});

window.addEventListener("resize", () => {

    resizeCanvas();

    updateFrame();

    updateHero();

});