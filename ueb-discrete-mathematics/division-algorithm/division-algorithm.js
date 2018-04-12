"use strict";
//Variables de entrada.
const divisorInputs = document.querySelectorAll(".content__entry__input");
const buttonResult = document.querySelector(".button-result");

//Variables de salida.
const divResult = document.querySelector(".div-result");
const modResult = document.querySelector(".mod-result");
const expResult = document.querySelector(".exp-result");

//Alert.
const alertsDisplay = document.querySelector("#alerts");

//Asocia las validaciones a los campos de entrada de la división.
divisorInputs.forEach((item) => {
    item.addEventListener("keypress", onlyNumbers, false);
    item.addEventListener("paste", onlyNumbersPaste, false);
});

//Asocia evento click al boton de resultado.
buttonResult.addEventListener("click", getResult);

//Obtiene el resultado de la división de manera legible
function getResult(e) {
    try {
        
        let values = [];

        divisorInputs.forEach((item) => { 
            values.push({ name: item.name, value: item.value  });
        });

        //Obtiene los valores de entrada para la división.
        let divident = parseInt(values.shift().value);
        let divisor = parseInt(values.pop().value);
        
        //Valida si los números han sido ingresados.
        if(isNaN(divident) || isNaN(divisor)) {
            throw new Error("Debe completar los campos de número!");
        }
        //Valida si el divisor es diferente de cero.
        if (divisor === 0) {
            throw new Error("El divisor debe ser diferente de 0");
        } 
        //Valida si el divisor es mayor que el dividendo.
        else if (divident < divisor) {
            throw new Error("El divisor debe ser menor que el dividendo");
        }
        //Obtiene el valor DIV de la división.
        let div = Math.floor(divident / divisor);

        //Obtiene el valor MOD de la división
        let mod = divident % divisor;

        //Salida
        divResult.innerHTML = `Conciente: ${div}`; 
        modResult.innerHTML = `Residuo: ${mod}`;
        expResult.innerHTML = `Se expresa de la forma: </br> ${divident} = ${divisor} * ${div} + ${mod}`; 
    }
    catch(ex) {
        handleExeption(ex);
    }
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
      }), 4000);
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