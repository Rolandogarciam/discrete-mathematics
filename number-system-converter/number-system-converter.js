"use strict";
//Variables constantes.
const rgxDecimal = "^[0-9]+$";
const rgxBin = "^[0-1]+$";
const rgxHex = "^[0-9A-Fa-f]+$";
const rgxOctal = "^[0-7]+$";

//Variables Globales 
let $regex = rgxDecimal;
let $base = 10;
let $baseResult = 10;

//Variables de entrada.
const controlInputs = document.querySelectorAll(".control__input");
const controlResults = document.querySelectorAll(".control__result");
const input = document.querySelector(".content__entry__input");
const buttonResult = document.querySelector(".button-result");

//Variables de salida.
const inputResult  = document.querySelector(".content__result__input");

//Alerts.
const alertsDisplay = document.querySelector("#alerts");

//Asocia las validaciones a los campos de entrada de la división.
input.addEventListener("keypress", onlyNumbers, false);
input.addEventListener("paste", onlyNumbersPaste, false);

//Asocia evento click a los radiobuttons del sistema numérico 
controlInputs.forEach((item) => {
    item.addEventListener("click", handleCheckedBase, false); 
});

//Asocia evento click a los radiobuttons del sistema numérico a convertir
controlResults.forEach((item) => {
    item.addEventListener("click", handleCheckedResult, false); 
});

//Asocia evento click al boton de resultado.
buttonResult.addEventListener("click", getResult);

//Obtiene el resultado de la conversion de la base
function getResultBase() {
    try {
        
        let values = [];
        let result  = 0;

        //Obtiene los valores de entrada para la conversion.
        let strNum = input.value;
        
        //Valida si los números han sido ingresados.
        if(!strNum) {
            throw new Error("Debe escribir un número!");
        }
        
        strNum.toUpperCase();
        
        //Obtiene el resultado del numero en la base.
        result = strNum.split("").reverse().reduce((total, current, i) => {
        	let resultPow = $base**i;
        	let exp = (($base == 16) ? getHexNum(current) : parseInt(current)) * resultPow;
        	return total + exp;
        }, 0);
        
        return result;
    }
    catch(ex) {
        handleExeption(ex);
    }
}

//Obtiene el resultado de la conversion del resultado
function getResult(e) {
    try {
        let num = getResultBase();
        let values = [];
        
        while(num > 0) {
            let mod = num % $baseResult;
            values.push(($baseResult == 16) ? getHexWord(mod) : mod);
            num = Math.floor(num / $baseResult);
        }
        
        //Salida
        inputResult.value = values.reverse().join(""); 
    }
    catch(ex) {
        handleExeption(ex);
    }
}

//Obtiene una letra para el valor de un numero hexadecimal
function getHexWord(num) {
    if (num == 10) {
        return "A";
    } else if (num == 11) {
        return "B";
    } else if (num == 12) {
        return "C";
    } else if (num == 13) {
        return "D";
    } else if (num == 14) {
        return "E";
    } else if (num == 15) {
        return "F";
    } else {
        return num;
    }
}

//Obtiene un numero para el valor de una letra hexadecimal
function getHexNum(word) {
    if (word == "A") {
        return 10;
    } else if (word == "B") {
        return 11;
    } else if (word == "C") {
        return 12;
    } else if (word ==  "D") {
        return 13;
    } else if (word == "E") {
        return 14;
    } else if (word ==  "F") {
        return 15;
    } else {
        return word;
    }
}

//Setea la expresion regular para la validar el campo de entrada
function setRegex(base) {
    if (base == 16) {
        $regex = rgxHex;
    } else if (base == 10) {
        $regex = rgxDecimal;
    } else if (base == 8) {
        $regex = rgxOctal;
    } else if (base == 2) {
        $regex = rgxBin;
    }
} 

//Manejador de radio buttons: obtiene valor de la base y establece la expresión regular para los datos de entrada.
function handleCheckedBase(e) {
    input.value = "";
    $base = parseInt(e.currentTarget.value);
    setRegex($base);
}

//Manejador de expresión regular para el resultado
function handleCheckedResult(e) {
    $baseResult = parseInt(e.currentTarget.value);
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
    let regex = new RegExp($regex);

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
    let regex = new RegExp($regex);

    //Bloquea los textos diferentes de números.
    if(!regex.test(e.clipboardData.getData("text"))) {
        e.preventDefault();
        return false;
    }
    return true;
}