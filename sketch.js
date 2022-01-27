var hypnoticBall, database;
var position;

function setup(){
    database = firebase.database(); //Se guarda la base de datos en le programa
    console.log(database),

    createCanvas(500,500);
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";

    //.ref() se utiliza para hacer referencia a la ubicación del valor de la base de datos que nos interesa.
    var hypnoticBallPosition = database.ref('ball/position');

    //.on() crea un oyente, que sigue escuchando los cambios en la base de datos.
    hypnoticBallPosition.on("value",readPosition,showError);
}
    
    
function draw(){
    background("white");

    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }

    drawSprites();
}

//Escribe la nueva posición en la base de datos para que se actualice
function writePosition(x,y){
  
}

function changePosition(x,y){
    hypnoticBall.x = hypnoticBall.x + x;
    hypnoticBall.y = hypnoticBall.y + y;
}
//Sí existe un cambio en la base de datos se llama a la función readPosition
function readPosition(data){
    position = data.val();
    console.log(position.x);
    console.log(position.y);
    hypnoticBall.x = position.x;
    hypnoticBall.y = position.y;
}
//Sí llegara a haber un error con la base de datos se llamara a esta función 
function showError(){
    console.log("Datos NO recibidos de base de datos");
}
