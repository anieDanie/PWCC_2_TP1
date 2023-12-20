/*
    TP1 - Dessins d'Enfants
    Date: 19/12/2023
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
const STEP = 10; // 10 pixels
let circles = [];

// FONCTIONS DE LA LOGIQUE DE L'APPLICATION

/**
 * Vide la liste circles de tous ses éléments.
 */
function emptyCircles(){
    circles.splice(0, circles.length);
}

/**
 * Créé et ajoute un cercle dans la liste circles selon
 * la position et le rayon spécicifiés
 * @param {Number} x (coordonnée du centre en x)
 * @param {Number} y (coordonnée du centre en y)
 * @param {Number} r (rayon du cercle)
 * @returns {Circle}
 */
function addCircle(x, y, r){
    const c = new Circle(new Point(x,y), r, Date.now());
    circles.push(c);
    return c;
}

/**
 * Fait le rendu de l'image SVG et du tableau des cercles créés
 */
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

/**
 * Recherche un cercle selon son ID dans la liste circles.
 * @param {Number} circleId
 * @returns {Circle}
 */
function getCircleById(circleId){
    for (const circle of circles){
        if(circle.getId() === circleId){
            return circle;
        }
    }
}

/**
 * Modifie la couleur d'un cercle sur une échelle de gris
 * en sélectionnant un code RGB de façon aléatoire.
 * @param {INT} circleId
 */
function changeCircleColor(circleId){

    const c = getCircleById(circleId);
    // Sélection au hasard d'un entier entre 0 et 255
    c.setColor(randomColor(Math.floor(Math.random()*256)));
}

// GESTIONNAIRES D'ÉVÉNEMENTS CRÉÉS dans main.js

document.getElementById("draw-simple-circle").addEventListener("click", simpleCircleBtn);

function simpleCircleBtn(){
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

function pointToString(center){
    return `(${center.getX()}, ${center.getY()})`;
}

function onClickUp(circleId){
    const circle = getCircleById(circleId);
    circle.setCenter(new Point( circle.getCenter().getX(), 
                                circle.getCenter().getY() - STEP));
    render();
}

function onClickDown(circleId){
    const circle = getCircleById(circleId);
    circle.setCenter(new Point( circle.getCenter().getX(), 
                                circle.getCenter().getY() + STEP));
    render();
}

function onClickLeft(circleId){
    const circle = getCircleById(circleId);
    circle.setCenter(new Point( circle.getCenter().getX() - STEP, 
                                circle.getCenter().getY()));
    render();    
}

function onClickRight(circleId){
    const circle = getCircleById(circleId);
    circle.setCenter(new Point( circle.getCenter().getX() + STEP, 
                                circle.getCenter().getY()));
    render();     
}

function onClickPaint(circleId){
    changeCircleColor(circleId);
    render();
}

