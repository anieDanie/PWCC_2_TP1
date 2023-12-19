/*
    TP1 - Dessins d'Enfants
    Date: 17/12/2023
*/

import { 
    drawCircles, 
    populateTable, 
    randomColor, 
    Circle, 
    Point } from " https://cdn.jsdelivr.net/gh/didiercrunch/cours-420-301-ah@tp1.1/modules-examples/mod.js";



/*
 * Correction.
 * Une variable globale devrait toujours être immutable (sauf force majeur).  Ici, `document.getElementById("canvas")`
 * est mutable, vous seriez mieux avec la variable `const svgId = "canvas"`.
 * 
 * Si vous voulez vraiment avoir une "variable globale mutable", vous pouvez toujours créer une
 * fonction qui prend aucun argument et qui retourne une nouvelle version de la variable à chaque
 * fois qu'elle est appelé.
 * 
 * function svg(){
 *     return document.getElementById("canvas");
 * } 
 */

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
 * Récupère l'ID d'un cercle dans le 1er élément HTML <td> de
 * l'élément HTML <tr> parent d'un icône visé par un événement 'clic'.
 * @param {EVENT} event
 * @returns {Number} id d'un cercle
 */
function retrieveCircleId(event){
    return Number(event.target.
                        parentElement.
                            parentElement.
                                firstElementChild.textContent);
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
 * Modifie la position en x ou en y du centre du cercle d'un nombre
 * donné de pixels (step) selon la direction spécifiée par l'icône 'flèche'.
 * @param {Event} event
 * @param {Number} step
 */
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

/**
 * Récupère la direction spécifiée par la flèche dans la
 * classe de l'élément HTML visé
 * @param {Event} event
 * @returns {String}
 */
function retrieveArrowDirection(event){
    const directions = ['up', 'down', 'left', 'right'];
    const arrowSpec = event.target.className;

    for (const direction of directions){
        if(arrowSpec.includes(direction)){
            return direction;
        }
    }
}

/**
 * Modifie la couleur d'un cercle sur une échelle de gris
 * en sélectionnant un code RGB de façon aléatoire.
 * @param {EVENT} event
 */
function changeCircleColor(event){

    const c = getCircleById(retrieveCircleId(event));
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

/**
 * Correction 
 * J'imagine que la documentation n'est pas claire mais, la fonction "onClickUp"
 * reçoit en argument l'ID du cercle qui a été cliqué.  Il n'est pas nécessaire d'utiliser 
 * event (et je me demande même pourquoi ça fonctionne).
 * 
 * Vous pouvez donc simplifier l'action de onClickUp par quelque chose comme:
 * 
 * function onClickUp(circleId){
 *     const circle = getCircleById(circleId);
 *     circle.setCenter(new Point(circle.getCenter().getX(), 
                                  circle.getCenter().getY() - 10));
       }
 *     render();
 * }
 */

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

