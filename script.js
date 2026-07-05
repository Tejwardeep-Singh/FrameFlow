const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 300;
const images = [];

for(let i=1;i<=frameCount;i++){
    const img=new Image();
    img.src=
    `frames/${String(i).padStart(4,"0")}.webp`;
    images.push(img);

}

function drawFrame(index){
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    ctx.drawImage(
        images[index],
        0,
        0,
        canvas.width,
        canvas.height
    );
}

images[0].onload=()=>{
    drawFrame(0);
}
window.addEventListener("scroll",()=>{
});


const maxScroll = document.body.scrollHeight- window.innerHeight;
const scrollFraction = window.scrollY/maxScroll;
const frame=Math.floor(
scrollFraction*
(frameCount-1)
);

drawFrame(frame);

window.addEventListener("scroll",()=>{

    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = window.scrollY/maxScroll;
    const frame=Math.floor( scrollFraction * (frameCount-1));
    drawFrame(frame);
});