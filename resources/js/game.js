"use strict"; 
let height,
    width,
    socket,
    input,
    messages = [],
    currentTime; 
function setup() {
    socket = io(); 
    height = windowHeight-15;
    width = windowWidth-15; 
    createCanvas(width, height);
    socket.on("message",(msg)=>{
        msg.x = random(width);
        msg.y = random(height);
        messages.push(msg);
    }); 
}
function draw() {
    clear();
    currentTime = (new Date).getTime();
    fill(0);
    messages.forEach(function(item){
        if(currentTime - item.time < 10000){
            text(item.text, item.x, item.y);
        }
    });
}
window.onload = function(){
    input = document.getElementById("input");
    input.addEventListener("keyup",function(e){
        let key = e.which || e.keyCode;
        if(key === 13){
            console.log(key);
            socket.emit("message",{text: input.value, time: (new Date).getTime()})
        }
    });

}

