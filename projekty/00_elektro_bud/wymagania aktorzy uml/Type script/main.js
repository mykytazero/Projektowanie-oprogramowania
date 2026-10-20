"use strict";

let bazaTowarow = [];
let edycjaId = null;

const myForm = document.getElementById('towar-form');
const poleNazwa = document.getElementById('input-nazwa');
const poleIlosc = document.getElementById('input-ilosc');
const tbody = document.getElementById('tabela-body');

function odswiezTabele() {
    tbody.innerHTML = "";
    
    for (let i = 0; i < bazaTowarow.length; i++) {
        let el = bazaTowarow[i];
        let tr = tbody.insertRow();
        tr.insertCell().textContent = el.nazwa;
        tr.insertCell().textContent = el.ilosc;
        let akcjeTd = tr.insertCell();
        let btnEdytuj = document.createElement('button');
        btnEdytuj.textContent = "Edycja";
        btnEdytuj.onclick = function() {
            poleNazwa.value = el.nazwa;
            poleIlosc.value = el.ilosc;
            edycjaId = el.id;
        };
        
        let btnUsun = document.createElement('button');
        btnUsun.textContent = "Skasuj";
        btnUsun.onclick = function() {
            bazaTowarow = bazaTowarow.filter(item => item.id !== el.id);
            odswiezTabele();
        };
        
        akcjeTd.appendChild(btnEdytuj);
        akcjeTd.appendChild(btnUsun);
    }
}

myForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let nazwaVal = poleNazwa.value;
    let iloscVal = Number(poleIlosc.value);
    
    if (nazwaVal === "" || iloscVal < 0) return;

    if (edycjaId === null) {

        let nowy = {
            id: Date.now(),
            nazwa: nazwaVal,
            ilosc: iloscVal
        };
        bazaTowarow.push(nowy);
    } else {
        let znaleziony = bazaTowarow.find(item => item.id === edycjaId);
        if (znaleziony) {
            znaleziony.nazwa = nazwaVal;
            znaleziony.ilosc = iloscVal;
        }
        edycjaId = null;
    }

    myForm.reset();
    odswiezTabele();
});