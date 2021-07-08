var canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

var imgnum = 0;
var img = new Image();

playSequence();

function playSequence(){
    var timer = setInterval(function(){
        console.log("time Interval" + imgnum);

        if (imgnum > 270){
            imgnum = 0;
        }

        player(imgnum);
        imgnum++;
    }, 33);
}

function player(num){
    console.log(num);
    img.src = "images/t/" + num + ".png";
}

img.addEventListener('load', function(e) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(img,0,0);
})