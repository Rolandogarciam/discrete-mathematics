"use strict";
//Declarar variables de entrada
const primeInput = document.querySelector("#num");
const buttonResult = document.querySelector(".button-result");

//Declarar Variables de salida
const cResult = document.querySelector(".c-result");
const dResult = document.querySelector(".d-result");
const uResult = document.querySelector(".u-result");
const desResult = document.querySelector(".des-result");

//Alert.
const alertsDisplay = document.querySelector("#alerts");

//Asocia envento de validación para solo aceptar números.
primeInput.addEventListener("keypress", onlyNumbers, false);
primeInput.addEventListener("paste", onlyNumbersPaste, false);

//Asocia evento click al boton de resultado.
buttonResult.addEventListener("click", getResult);

//Obtiene el resultado de la división de manera legible
function getResult(e) {
    try {
        //Limpia ejecuciones anteriores.
        cleanDOM()

        //Obtiene el valor ingresado.
        let num = primeInput.value;

        //Valida si se ingresaron datos.
        if(isNaN(parseInt(num))) {
            throw new Error('Debe ingresar un número!');
        }
        //Valida si el número es incia en cero.
        else if (parseInt(num.charAt(0)) === 0) {
            throw new Error("El número debe ser de 3 cifras");
        } 
        
        //Valida las cifras del número.
        if(num.length === 3) {
            //Obtiene centenas.
            let C = parseInt(num.charAt(0));
            //Obtiene unidades.
            let U = parseInt(num.charAt(2));
            //Obtiene decenas.
            let D = parseInt(num.charAt(1));
            
            //Salida    
            uResult.innerHTML = `Las unidades son: ${U}`; 
            dResult.innerHTML = `Las decenas son: ${D}`;
            cResult.innerHTML = `Las centenas son: ${C}`;
            desResult.innerHTML = `Descomposición: </br> ${C * 100} + ${D * 10} + ${U} = ${num}`;
        } 
        else if (num.length === 2) {
            //Obtiene unidades.
            let U = parseInt(num.charAt(1));
            //Obtiene decenas.
            let D = parseInt(num.charAt(0));

            //Salida    
            uResult.innerHTML = `Las unidades son: ${U}`; 
            dResult.innerHTML = `Las decenas son: ${D}`;
            desResult.innerHTML = `Descomposición: </br> ${D * 10} + ${U} = ${num}`;
        } else if (num.length === 1) {
            //Obtiene unidades.
            let U = parseInt(num.charAt(0));
            //Salida    
            uResult.innerHTML = `Las unidades son: ${U}`; 
            desResult.innerHTML = `Descomposición: </br> ${U} = ${num}`;
        }
    }
    catch(ex) {
        handleExeption(ex);
    }
}

//Limpia elementos renderizados en el DOM.
function cleanDOM() {
    uResult.innerHTML = ``;     
    dResult.innerHTML = ``;
    cResult.innerHTML = ``;
    desResult.innerHTML = ``;
}

//Manejador de exepciones: renderiza una alerta.
function handleExeption(ex) {

    let alertElem = document.createElement("div");
    alertElem.classList.add("alert");

    setTimeout(() => {
        alertElem.classList.add("open");
    }, 1);

    let innerElem = document.createElement("div");
    innerElem.classList.add("alert-block");
    alertElem.append(innerElem);

    let titleElem = document.createElement("div");
    titleElem.classList.add("alert-title");
    titleElem.append("Hay problemas");
    innerElem.append(titleElem);

    let messageElem = document.createElement("div");
    messageElem.classList.add("alert-message");
    messageElem.append(ex);
    innerElem.append(messageElem);

    alertsDisplay.append(alertElem);
    removeAlert(alertElem);
}

//elimina la alerta del DOM
function removeAlert(alertElem) {
    setTimeout((() => {
        alertElem.classList.remove("open");
        alertElem.addEventListener(
            "transitionend", 
            (e) => {  
                alertElem.remove()
            });
      }), 3000);
}

//Valida el evento keypress para aceptar solo números.
function onlyNumbers(e) {

    //Expresión regular "solo números".
    let regex = new RegExp("^[0-9]+$");

    //Bloquea las teclas diferentes de números.
    if(!regex.test(e.key)) {
        e.preventDefault();
        return false;
    }
    return true;
}

//Valida el evento paste para aceptar solo números.
function onlyNumbersPaste(e) {
    //Expresión regular "solo números".
    let regex = new RegExp("^[0-9]+$");

    //Bloquea los textos diferentes de números.
    if(!regex.test(e.clipboardData.getData("text"))) {
        e.preventDefault();
        return false;
    }
    return true;
}