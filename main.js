object = [];
status = "";

function preload(){
    video = createVideo("video.mp4");
}
function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "status: detectando objeto"; 
}
function modelLoaded(){
    console.log("modelo carregado");
    status = true;
    video.loop();
    video.speed(30);
    video.volume(2);
}
function gotResults(error,results){
    if(error){
        console.error(error);
        }
    console.log(results);
    object = results;
}
function draw(){
    image(video, 0, 0, 480, 380);
    if(status!=""){
        objectDetector.detect(video, gotResults);
        for(i=0;i<object.length;i++){
             document.getElementById("status").innerHTML = "status: objeto detectado";             
             document.getElementById("numberOfObject").innerHTML = "quantidade de objeto detectados:" + object.length;
             fill("red");
             percent = floor(object[i].confidence*100);
             text(object[i].label+" " +percent + "%", object[i].x+15,object[i].y+15);
             noFill();
             stroke("red");
             rect(object[i].x,object[i].y,object[i].width,object[i].height);             
        }
    }
}