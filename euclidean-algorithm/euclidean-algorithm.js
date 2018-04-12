"use strict";
//Variables de entrada.
const mcdInputs = document.querySelectorAll(".content__entry__input");
const buttonResult = document.querySelector(".button-result");

//Variables de salida.
const mcdResult = document.querySelector(".mcd-result");
const mathResult = document.querySelector(".math-result");

//Alert.
const alertsDisplay = document.querySelector("#alerts");

//Asocia las validaciones a los campos de entrada de la división.
mcdInputs.forEach((item) => {
    item.addEventListener("keypress", onlyNumbers, false);
    item.addEventListener("paste", onlyNumbersPaste, false);
});

//Asocia evento click al boton de resultado.
buttonResult.addEventListener("click", getResult);

//Obtiene el resultado de la división de manera legible
function getResult(e) {
    try {
        cleanDOM();
        let values = [];

        mcdInputs.forEach((item) => { 
            values.push({ name: item.name, value: item.value  });
        });

        //Obtiene los valores de entrada para hallar el MCD.
        let first = parseInt(values.shift().value);
        let second = parseInt(values.pop().value);
        
        //Valida si los números han sido ingresados.
        if(isNaN(first) || isNaN(second)) {
            throw new Error("Debe completar los campos de número!");
        }
        //Valida si el divisor es diferente de cero.
        if (first === 0 || second === 0) {
            throw new Error("los números deben ser diferente de 0");
        }

        if(first < second)
        {
            //intercambiar los valores para poder dividir.
            //Ejemplo 10; 20;
            //first = 10 + 20;
            first += second;
            //second = 20 - 30;
            second = first - second;
            //first = 30 - 10;
            first -= second;
        }        

        let mod = 0;
        //Obtiene el MCD de los números.
        while (second != 0) {
            mod = first % second;
            values.push({first, second, mod});
            first = second;
            second = mod;
        }

        //Salida
        values.forEach((item, i) => {
            let explampleElem = document.createElement("div");
            explampleElem.innerHTML = `${item.first} mod ${item.second} = ${item.mod}`;
            if (i == values.length - 1) {
                explampleElem.style.border = "2px solid #AED581";
            }
            if (i == values.length - 2) {
                explampleElem.style.border = "2px solid #388E3C";
            }
            mathResult.append(explampleElem);
        });

        mcdResult.innerHTML = `</br> El MCD es: </br> ${first}`; 
    }
    catch(ex) {
        handleExeption(ex);
    }
}

//Limpia elementos renderizados en el DOM.
function cleanDOM() {
    mathResult.innerHTML = ``; 
    mcdResult.innerHTML = ``;
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