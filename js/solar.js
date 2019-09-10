//создаю холст для движущихся объектов
var canvasSolar = document.createElement('canvas'); // создаю холст
canvasSolar.id = 'canvasSolar';// присваиваю id
xPoint =  document.documentElement.clientWidth;// получаю ширину экрана
yPoint = document.documentElement.clientHeight;// получаю высоту экрана
canvasSolar.width =  xPoint;// присваиваю широту и высоту экрана холсту
canvasSolar.height = yPoint;// присваиваю широту и высоту экрана холсту
document.getElementById('mainBox').appendChild(canvasSolar); //добавляю холст в dom
//стандартная настройка холста
var canvasSolar = document.getElementById('canvasSolar');
var ctxSolar = canvasSolar.getContext('2d');
procentFunc = (value, direction) => {
    result = (direction == 'x') ? xPoint * value / 100 : yPoint * value / 100;
    return(result)
}
//cleaning canvas
fathersColor = {'value': '#010101',
                'name': [0,0,0,255]};
clearCanvasSolar  = () => {
    ctxSolar.fillStyle = fathersColor.value;
    ctxSolar.fillRect(0, 0, canvasSolar.width, canvasSolar.height);
}
//creating material world
mw = {

}
//creating materal worlds object
//creating minimals
minimalsList = []
class MINIMALS_C {
    constructor(accessory){
        this.accessory = accessory;
        this.xPosition = (accessory.xPosition - Math.floor(Math.random()* 100))+50;
        this.yPosition = (accessory.yPosition - Math.floor(Math.random()* 100))+50;
        this.color = accessory.color;
        this.xEnergi = 0;
        this.yEnergi = 0;
    }
}
creatingMinimals = (count, nuclear) =>{
    for (let i = 0; i < count; i++) {
        minimalsList.push(new MINIMALS_C(nuclear));
    }
}
minimalsVelocity = () =>{
    minimalsList.forEach(element => {
        element.xPosition += Math.sqrt(2*element.xEnergi);
        element.yPosition += Math.sqrt(2*element.yEnergi);
        if (element.xEnergi != 0 &&
            element.yEnergi != 0){
                borderControl();
            }
    });
}
borderControl = () => {
    minimalsList.forEach(element => {
        if (ctxSolar.getImageData(element.xPosition, element.yPosition, 1, 1).data != fathersColor){
            element.xEnergi -= 1.1*element.xEnergi;
            element.yEnergi += 0.9*element.yEnergi;
            minimalsList.forEach(subElement => {
                if(subElement.xPosition == element.xPosition && subElement.yPosition == element.yPosition){
                    element.xEnergi -= 1.1*element.xEnergi;
                    subElement.yEnergi +=0.9*element.yEnergi;
                }
            });
        }
    });
}
//creating nuclear
class M_W_C {
    constructor(color){
        this.color = color;
        this.mass = 2;
        this.elasticity = 0;
        this.height = 1;
        this.width = 1;
        this.nuclearAttraction = 2;
        this.xPosition = procentFunc(50, 'x');
        this.yPosition = procentFunc(50, 'y');
        this.xEnergi = 0;
        this.yEnergi = 0;
        this.minimals = [];
        this.minimalsCount = 0;
    }
}
//creating object
nuclearAttraction = () =>{
    minimalsList.forEach(element => {
        element.xEnergi = element.accessory.nuclearAttraction
        element.yEnergi = element.accessory.nuclearAttraction
    });
}
//creating red
mw.red = new M_W_C('red');
creatingMinimals(20, mw.red)

nuclearAttraction();
//drawingWorld 
counterTime = 0;
drawWorld = () =>{
    clearCanvasSolar();
    minimalsVelocity();
    //solarRadiation();
    //gravity();
    //borderControl();
    //energiImpact();
    //gravityVisualization();
    drawNuclear();
    counterTime += 0.01
    requestAnimationFrame(drawWorld);
}
requestAnimationFrame(drawWorld);
//draw nuclear
drawNuclear = () =>{
    drawMinimals();
    for(var key in mw){
        i = mw[key];
        ctxSolar.fillStyle = i.color;
        ctxSolar.fillRect(i.xPosition - 0.5,
                         i.yPosition - 0.5,
                         1, 1);
        
    }
}
//draw minimals
drawMinimals = () =>{
    minimalsList.forEach(element => {   
        ctxSolar.fillStyle = element.color;
        ctxSolar.fillRect(element.xPosition - 0.5,
            element.yPosition - 0.5,
            1, 1);
    });
}