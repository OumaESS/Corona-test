const AIGUILLEHR = document.querySelector("#hour");
const AIGUILLEMIN = document.querySelector("#minute");
const AIGUILLESEC = document.querySelector("#second");
function demarrerLaMontre() {
    const heurActuel = new Date();

    let hr = heurActuel.getHours();
    let min = heurActuel.getMinutes();
    let sec = heurActuel.getSeconds();

    let secDeg = sec * 6; 
    let minDeg = (min * 6) + (0.1 * sec); 
    let hrDeg = (hr * 30) + (0.5 * min); 

    AIGUILLESEC.style.transform = 'rotate(' + secDeg + 'deg)';
    AIGUILLEMIN.style.transform = 'rotate(' + minDeg + 'deg)';
    AIGUILLEHR.style.transform = 'rotate(' + hrDeg + 'deg)';
}
demarrerLaMontre();

// Exercuter la fonction chaque second
var interval = setInterval(demarrerLaMontre, 1000);