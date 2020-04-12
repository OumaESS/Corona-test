const AIGUILLEHR = document.querySelector("#hour");
const AIGUILLEMIN = document.querySelector("#minute");
const AIGUILLESEC = document.querySelector("#second");
function demarrerLaMontre() {
    const heurActuel = new Date();

    let hr = heurActuel.getHours();
    let min = heurActuel.getMinutes();
    let sec = heurActuel.getSeconds();

    let secDeg = sec * 6; // sec * 6 --- pour terminer la tour de 360 deg dans 60 step il doit passer 6 Deg pour chaque step
    let minDeg = (min * 6) + (0.1 * sec); //==> 6 / 60 = 0.1 --- chaque step de laguille sec, laguille min il doit passer 0.1 deg
    let hrDeg = (hr * 30) + (0.5 * min); //==> 30 / 60 = 0.5 --- chaque step de laguille min , laguille heur doit passer 0.5 deg 

    AIGUILLESEC.style.transform = 'rotate(' + secDeg + 'deg)';
    AIGUILLEMIN.style.transform = 'rotate(' + minDeg + 'deg)';
    AIGUILLEHR.style.transform = 'rotate(' + hrDeg + 'deg)';
}
demarrerLaMontre();

// Exercuter la fonction chaque second
var interval = setInterval(demarrerLaMontre, 1000);