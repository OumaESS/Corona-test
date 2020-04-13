const AIGUILLE_HEURE = document.querySelector("#hour");
const AIGUILLE_MINUTUE = document.querySelector("#minute");
const AIGUILLE_SECONDE = document.querySelector("#second");

function demarrerLaMontre() {
    const date_actuel = new Date();

    let heure_actuel = date_actuel.getHours();
    let minute_actuel = date_actuel.getMinutes();
    let seconde_actuel = date_actuel.getSeconds();

    let seconde_degree = seconde_actuel * 6; 
    let minute_degree = (minute_actuel * 6) + (0.1 * seconde_actuel); 
    let heure_degree = (heure_actuel * 30) + (0.5 * minute_actuel); 

    AIGUILLE_SECONDE.style.transform = `rotate(${seconde_degree}deg)`;
    AIGUILLE_MINUTUE.style.transform = `rotate(${minute_degree}deg)`;
    AIGUILLE_HEURE.style.transform = `rotate('${heure_degree}deg)`;
}

// Exercuter la fonction chaque second
setInterval(demarrerLaMontre, 1000);
