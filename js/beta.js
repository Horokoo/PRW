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
procentFunc = (value, direction) => {
    result = (direction == 'x') ? xPoint * value / 100 : yPoint * value / 100;
    return(result)
}
//cleaning canvas
clearCanvasBeta  = () => {
    ctxBeta.clearRect(0, 0, canvasBeta.width, canvasBeta.height);
}
//material object father
mo = {

}
moList = []
//creating object
//material object constructor
indexer = 0;
class MOC {
    constructor(name){
        this.name = name;
        this.mass = 2;
        this.elasticity = 0;
        this.height = 10;
        this.width = 10;
        this.nuclearAttraction;
        this.xPosition = procentFunc(50, 'x');
        this.yPosition = procentFunc(50, 'y');
        this.color = 'black';
        this.xEnergi = 0;
        this.yEnergi = 0;
        this.index = indexer;
        moList[indexer] = this;
        indexer++;
    }
}
//all object here
//adam
mo.adam = new MOC('adam');
mo.adam.color = 'red';
mo.adam.mass = 4;
mo.adam.yPosition = procentFunc(50, 'y') + 90;
//eva
mo.eva = new MOC('eva');
mo.eva.yPosition = procentFunc(30, 'y')
mo.eva.xPosition = procentFunc(50, 'x')
mo.eva.color = 'yellow';
//kain
mo.kain = new MOC('kain');
mo.kain.color = 'brown';
mo.kain.mass = 2;
mo.kain.yPosition = procentFunc(50, 'y') + 30;
//avel
mo.avel = new MOC('avel');
mo.avel.color = 'black';
mo.avel.mass = 2;
mo.avel.yPosition = procentFunc(50, 'y') + 70;
//drawingWorld 
counterTime = 0;
drawWorld = () =>{
    clearCanvasBeta();
    //gravity();
    borderControl();
    energiImpact();
    gravityVisualization();
    for(var key in mo){
        i = mo[key];
        ctxBeta.fillStyle = mo[key].color;
        ctxBeta.fillRect(i.xPosition - i.width/2,
                         i.yPosition - i.height/2,
                         i.width, i.height);
    }
    counterTime += 0.01
    requestAnimationFrame(drawWorld);
}
requestAnimationFrame(drawWorld);
//creating gravity
pointOfAttraction = [procentFunc(50, 'x') - 2.5, procentFunc(50, 'y') - 2.5];
gravity = () => {
    for(var key in mo){
        i = mo[key];
        i.yPosition;
    }
}
//gravity visualization
gravityVisualization = () => {
    ctxBeta.fillStyle = 'black';
    ctxBeta.fillRect(pointOfAttraction[0], pointOfAttraction[1], 5, 5);
}
// energi impact
energiImpact = () => {
    for(var key in mo){
        i = mo[key];
        i.xPosition+=i.xEnergi;
        i.yPosition+=i.yEnergi;
    }
}
//
stopCollisionX= false;
stopCollisionY= false;
borderControl = () =>{
    for(var key in mo){
        i = mo[key];
        if (i.index != 3){
            //x direction
            if(Math.abs(moList[i.index+1].xPosition - moList[i.index].xPosition) <= Math.abs(-i.width/2 - moList[i.index+1].width/2) &&
               Math.abs(moList[i.index+1].yPosition - moList[i.index].yPosition) <= Math.abs(-i.height/2 - moList[i.index+1].height/2)){
                if (Math.abs(moList[i.index+1].xPosition - moList[i.index].xPosition) <= Math.abs(-i.width/2 - moList[i.index+1].width/2) && ! stopCollisionX){
                    if (moList[i.index+1].xEnergi > 0){
                        moList[i.index].xEnergi += 0.6*(moList[i.index+1].xEnergi);
                        moList[i.index+1].xEnergi *= 0.4;
                    }else{
                        moList[i.index+1].xEnergi += 0.6*moList[i.index].xEnergi;
                        moList[i.index].xEnergi *= 0.4;
                    }
                    stopCollisionX= true;
                }
                if(Math.abs(moList[i.index+1].xPosition - moList[i.index].xPosition) > i.width*2){
                    stopCollisionX= false;
                }
                //y direction
                if (Math.abs(moList[i.index+1].yPosition - moList[i.index].yPosition) <= Math.abs(-i.height/2 - moList[i.index+1].height/2) && ! stopCollisionY){
                    if (moList[i.index+1].yEnergi > 0){
                        moList[i.index].yEnergi = (0.6*i.mass*moList[i.index+1].mass)/(i.mass + moList[i.index+1].mass) * moList[i.index+1].yEnergi;
                        moList[i.index+1].yEnergi = (moList[i.index+1].mass-i.mass)/(i.mass + moList[i.index+1].mass) * moList[i.index+1].yEnergi;
                    }else{
                        moList[i.index+1].yEnergi = (2*i.mass*moList[i.index+1].mass)/(i.mass + moList[i.index+1].mass) * i.yEnergi;
                        moList[i.index].yEnergi = (i.mass - moList[i.index+1].mass)/(i.mass + moList[i.index+1].mass) * i.yEnergi;
                    }
                    stopCollisionY = true;
                }
                if(Math.abs(moList[i.index+1].yPosition - moList[i.index].yPosition) > i.height*2){
                    stopCollisionY = false;
                }
            }
        }
    }
}