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
fathersColor = '#010101';
clearCanvasBeta  = () => {
    ctxBeta.fillStyle = fathersColor;
    ctxBeta.fillRect(0, 0, canvasBeta.width, canvasBeta.height);
}
//material object father
mo = {

}
moList = []
//creating object
//material object constructor
MOIndexer = 0;
class M_O_C {
    constructor(name){
        this.name = name;
        this.mass = 2;
        this.elasticity = 0;
        this.height = 1;
        this.width = 1;
        this.nuclearAttraction = 100;
        this.xPosition = procentFunc(50, 'x');
        this.yPosition = procentFunc(50, 'y');
        this.color = 'white';
        this.xEnergi = 0;
        this.yEnergi = 0;
        this.minimals = [];
        this.minimalsCount = 0;
        this.index = MOIndexer;
        this.reflectionPower = [0, 0, 0, 0];
        moList[MOIndexer] = this;
        MOIndexer++;
    }
}
//all object here
//adam
mo.adam = new M_O_C('adam');
mo.adam.minimalsCount = 100;
//creating mo's miimals
minimalsList = []
minimalsIndexer = 0
class MINIMALS_C {
    constructor(){
        this.index = minimalsIndexer;
        minimalsList[minimalsIndexer] = this;
        minimalsIndexer++;
    }
}
for(var key in mo){
    i = mo[key];
    for (let i = 0; i < i.minimalsCount; i++) {
        
        
    }
}
//drawingWorld 
counterTime = 0;
drawWorld = () =>{
    clearCanvasBeta();
    //solarRadiation();
    //gravity();
    //borderControl();
    //energiImpact();
    //gravityVisualization();
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
