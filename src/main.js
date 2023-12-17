/*
    TP1 - Dessins d'Enfants
    Version 1 (complète)
    Date: 16/12/2023
*/

import { 
    drawCircles, 
    populateTable, 
    randomColor, 
    Circle, 
    Point } from " https://cdn.jsdelivr.net/gh/didiercrunch/cours-420-301-ah@tp1.1/modules-examples/mod.js";

// VARIABLES PORTÉE GLOBALE
const svg = document.getElementById("canvas");
const table = document.getElementById("table-body");
const STEP = 10;
let circles = [];

// FONCTIONS LOGIQUE APPLICATION

function emptyCircles(){
    circles.splice(0, circles.length);
}

function addCircle(x, y, r){
    const c = new Circle(new Point(x,y), r, Date.now());
    circles.push(c);
    return c;
}

function render(){
    populateTable(table,circles, 
                        pointToString, 
                        onClickUp, 
                        onClickDown, 
                        onClickLeft, 
                        onClickRight,
                        onClickPaint);
    drawCircles(svg,circles);
}

function retrieveCircleId(event){
    return Number(event.target.
                        parentElement.
                            parentElement.
                                firstElementChild.textContent);
}

function getCircleById(circleId){
    console.log(circleId)
    for (const circle of circles){
        console.log(circle.getId())
        if(circle.getId() === circleId){
            return circle;
        }
    }
}

function moveCircle(event, step){

    const d = retrieveArrowDirection(event);
    const c = getCircleById(retrieveCircleId(event));

    if (d === 'up' || d === 'down'){
        c.setCenter(new Point(  c.getCenter().getX(), 
                                c.getCenter().getY() + step));
    }
    if( d === 'left' || d === 'right'){
        c.setCenter(new Point(  c.getCenter().getX() + step, 
                                c.getCenter().getY()));
    }
}

function retrieveArrowDirection(event){
    const directions = ['up', 'down', 'left', 'right'];
    const arrowSpec = event.target.className;

    for (const direction of directions){
        if(arrowSpec.includes(direction)){
            return direction;
        }
    }
}

function changeCircleColor(event){

    const c = getCircleById(retrieveCircleId(event));
    // Sélection au hasard d'un entier entre 0 et 255
    c.setColor(randomColor(Math.floor(Math.random()*256)));
}

// GESTIONNAIRES D'ÉVÉNEMENTS CRÉÉS dans main.js

document.getElementById("draw-simple-circle").addEventListener("click", simpleCercleBtn);

function simpleCercleBtn(){
    emptyCircles();
    addCircle(250,250,50);
    render();
}

document.getElementById("draw-circle").addEventListener("click", addBtn);

function addBtn(){
    const x = Number(document.getElementById("cx").value);
    const y = Number(document.getElementById("cy").value);
    const r = Number(document.getElementById("cr").value);
    addCircle(x,y,r);
    render();
}

document.getElementById("clear-drawing").addEventListener("click", clearBtn);

function clearBtn(){
    emptyCircles();
    render();
}

document.getElementById("inverse-drawing").addEventListener("click", reverseOrderBtn);

function reverseOrderBtn(){
    // Modifie le tableau 'en place'
    circles.reverse();
    render();
}

// GESTIONNAIRES D'ÉVÉNEMENTS CRÉÉS PAR LA FONCTION IMPORTÉE populateTable()

// Dans populateTable: lors de la création du td : pointToString(circle.getCenter())
// La méthode getCenter() est donc appelée pour chaque cercle de circles lors du rendu
// et c'est ce qui donne sa valeur au paramètre center
function pointToString(center){
    console.log('Dans pointToString');
    console.log(center);
    return `(${center.getX()}, ${center.getY()})`;
}

function onClickUp(){
    const up = (- STEP);
    moveCircle(event, up);
    render();
}

function onClickDown(){
    const down = (+ STEP);
    moveCircle(event, down);
    render();
}

function onClickLeft(){
    const left = (- STEP);
    moveCircle(event, left);
    render();
}

function onClickRight(){
    const right = (+ STEP);
    moveCircle(event, right)
    render();
}

function onClickPaint(){
    changeCircleColor(event);
    render();
}

