//создаю холст для движущихся объектов
var canvasBeta = document.createElement('canvas'); // создаю холст
canvasBeta.id = 'canvasBeta';// присваиваю id
xPoint =  document.documentElement.clientWidth;// получаю ширину экрана
yPoint = document.documentElement.clientHeight;// получаю высоту экрана
canvasBeta.width =  xPoint;// присваиваю широту и высоту экрана холсту
canvasBeta.height = yPoint;// присваиваю широту и высоту экрана холсту
document.getElementById('mainBox').appendChild(canvasBeta); //добавляю холст в dom
//стандартная настройка холста
var canvasBeta = document.getElementById('canvasBeta');
var ctxBeta = canvasBeta.getContext('2d');
//cleaning canvas
clearCanvasBeta  = () => {
    ctxBeta.clearRect(0, 0, canvasBeta.width, canvasBeta.height);
}
//creating charakter
class CharacterBeta {
    constructor(name, gravity, acceleration) {
        this.name = name;
        this.width =  70 /3;
        this.height =  180 /3;
        this.gravity = gravity;
        this.acceleration = acceleration;
        this.flight = true;
    }
}
cubus = new CharacterBeta('Cubus', true, 0);
cubus.position = [10, 0];
drawCubus = () =>{
    clearCanvasBeta();
    attraction('000');
    obstacleFind();
    ctxBeta.fillStyle = 'black';
    ctxBeta.fillRect(cubus.position[0], cubus.position[1], cubus.width, cubus.height);
    window.requestAnimationFrame(drawCubus);
}
obstacleFind = () => {
    if ((cubus.position[1] + cubus.height) + cubus.acceleration >= betaEarth && cubus.flight){
        cubus.acceleration = 0;
        cubus.position[1] = betaEarth - cubus.height;
        cubus.flight = false;
        cubus.gravity = false;
    }else if(cubus.position[1] == betaEarth - cubus.height){
        cubus.mayJump = true;
    }else{
        cubus.gravity = true;
    }
}
window.requestAnimationFrame(drawCubus);
betaEarth = 300;
attraction = (id) => {
    if(id == '000'){
        if(cubus.gravity){
            cubus.position[1] -= cubus.acceleration;
            cubus.acceleration -= 0.2;
            cubus.flight = true;
        }
    }
}
document.addEventListener('keyup', (event) => {
    if (event.code == 'ArrowUp' && cubus.mayJump){
        cubus.acceleration = 8;
        cubus.gravity = true;
    }
});
