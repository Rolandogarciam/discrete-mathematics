"use strict";
//Variables constantes.
const rgxBin = "^[0-1]+$";

//Variables de entrada.
const inputs = document.querySelectorAll(".content__entry__input");
const buttonResult = document.querySelector(".button-result");

//Variables de salida.
const binResult = document.querySelector(".bin-result");

//Alert.
const alertsDisplay = document.querySelector("#alerts");

//Asocia las validaciones a los campos de entrada de la división.
inputs.forEach((item) => {
    item.addEventListener("keypress", onlyNumbers, false);
    item.addEventListener("paste", onlyNumbersPaste, false);
});

//Asocia evento click al boton de resultado.
buttonResult.addEventListener("click", getResult);

//Obtiene el resultado de la división de manera legible
function getResult(e) {
    try {
        
        let longer = "";
        let lower = "";
        let values = [];
        let bin = [];

        inputs.forEach((item) => { 
            values.push({ name: item.name, value: item.value  });
        });

        //Obtiene los valores de entrada para la división.
        let first = values.shift().value;
        let second = values.pop().value;
        
        //Valida si los números han sido ingresados.
        if(!first || !second) {
            throw new Error("Debe completar los campos de número!");
        }
        
        if (first.length > second.length) {
            longer = first;
            lower = second;
        } else {
            longer = second;
            lower = first;
        }
        
        let longerReverse = longer.split("").reverse().join("");
        let lowerReverse = lower.split("").reverse().join("");
        let accumulated = 0;
        
        //obtiene el resultado de la suma
        for (var i = 0; i < longer.length; i++) {
            let intLonger = parseInt(longerReverse[i]) | 0;
            let intLower = parseInt(lowerReverse[i]) | 0;
            let sumBase = intLonger + intLower + accumulated;
            
            bin.push(sumBase % 2);
            accumulated = Math.floor(sumBase / 2); 
        }
        
        //Si existe valor acumulado lo pasamos para n+1
        if (accumulated) {
            bin.push(accumulated);
        }

        //Salida
        binResult.innerHTML = `el resultado de la suma es: ${bin.reverse().join("")}`; 
        
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
    let regex = new RegExp(rgxBin);

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
    let regex = new RegExp(rgxBin);

    //Bloquea los textos diferentes de números.
    if(!regex.test(e.clipboardData.getData("text"))) {
        e.preventDefault();
        return false;
    }
    return true;
}