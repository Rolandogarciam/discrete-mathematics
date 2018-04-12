"use strict";
//Variables de entrada.
const primeInput = document.querySelector("#num");
const buttonResult = document.querySelector(".button-result");

//Variables de salida.
const primResult = document.querySelector(".prim-result");

//Alert.
const alertsDisplay = document.querySelector("#alerts");

//Asocia envento de validación para solo aceptar números.
primeInput.addEventListener("keypress", onlyNumbers, false);
primeInput.addEventListener("paste", onlyNumbersPaste, false);

//Asocia evento click al boton de resultado.
buttonResult.addEventListener("click", getResult);

//Obtiene el resultado de la división de manera legible.
function getResult(e) {
    try {
        let result = "";
        let values = [];

        //Obteine el valor ingresado.
        let num = parseInt(primeInput.value);

        //Valida si se ingresaron datos.
        if(isNaN(num)) {
            throw new Error('Debe ingresar un número!');
        }
        //Valida si el número es diferente de cero.
        else if (num === 0) {
            throw new Error('El número debe ser diferente de 0');
        } 
        //Valida si el número es diferente de uno.
        else if (num == 1) {
            throw new Error('El número debe ser diferente de 1');
        }        

        //Obtiene divisores del número.
        for(let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
            if(num % i === 0) {
                values.push(i);
            }
        }

        //Valida si el número obtuvo divisores.
        if(values.length != 0){
            result = `El número ${num} es compuesto y sus divisores son: </br> ${values.join(", ")}`;
        } else {
            result = `El número ${num} es primo`
        }

        //Salida
        primResult.innerHTML = result; 
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