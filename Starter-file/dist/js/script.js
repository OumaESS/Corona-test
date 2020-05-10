
function getValues() {

    var qst1 = document.querySelector('[name="response"]:checked')
    if (qst1 != null) {
        result1 = qst1.value;
    }
    //    *******
    var qst2 = document.querySelector('[name="response2"]:checked')
    if (qst2 != null) {
        result2 = qst2.value;
    }
    //    ********
    var qst3 = document.querySelector('[name="response3"]:checked')
    if (qst3 != null) {
        result3 = qst3.value;
    }
    //    ********
    var qst4 = document.querySelector('[name="response4"]:checked')
    if (qst4 != null) {
        result4 = qst4.value;
    }
    //    ********
    var qst5 = document.querySelector('[name="response5"]:checked')
    if (qst5 != null) {
        result5 = qst5.value;
    }
    //    ********



    Arra = [result1, result2, result3, result4, result5];
    document.getElementById('result').innerHTML = Arra;


}







let testBtn = document.getElementById("start");
let  para = document.querySelector('#para');
let questionnaire = document.querySelector("#questionnaire");
let stepper = document.querySelectorAll(".stepper h1");
let nextBtn = document.querySelector(".next");
let previousBtn = document.querySelector(".previous");
let currentquestion = document.querySelector(".question");
let answerInputs = document.querySelector(".answer-inputs");
let progressBar = document.querySelector(".bar");
let questionNumber = document.querySelector(".question-number");
let inputBox = document.querySelector(".inputBox");
let result = document.querySelector(".para h1");
let resultMessage = document.querySelectorAll(".para p");
let currentQuestionIndex = 0;

function hideprevious() {
    if (currentQuestionIndex === 0) {
        previousBtn.classList.add("hide");
    } else {
        previousBtn.classList.remove("hide");
    }
}

function startTest() {
    stepper[0].classList.remove("active");
    stepper[1].classList.add("active");
    testBtn.style.display = "none";
    para.style.display = "none";
    questionnaire.style.display = "block";
    hideprevious();
    nextBtn.disabled = true;
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    currentquestion.innerText = question.question;
    answerInputs.innerHTML = "";
    let inputAnswer = question.input.answer;
    let input = question.input;

    if (question.input.type === "radio") {
        inputAnswer.forEach((answer) => {
            answerInputs.innerHTML += `
                    <div>
                        <input type="radio" name="${input.qNumber}" id="${answer.text}">
                        <label for="${answer.text}">
                        <i class="fas ${answer.icon}"></i>
                        <span>${answer.text}</span> </label>
                    </div>`;
        });
    } else {
        answerInputs.innerHTML += `<input type="number" name="${input.qNumber}" id="${input.name}" min="${input.min}" max="${input.max}" placeholder="${input.min} - ${input.max}">
                                    <span class="input-span">${input.name}</span>`;
    }
}
function folowProgress(number) {

    const currentNmber = number + 1

    questionNumber.innerText = currentNmber
    progressBar.style.width = `calc(${currentNmber} * calc(100% / 22))`

}

testBtn.addEventListener("click", startTest);

inputBox.addEventListener("change", (event) => {
    let input = event.target;

    if (input.type === "number") {
        let number = parseFloat(input.value);

        if (number >= input.min && number <= input.max) {
            answers[input.name] = input.value;
            console.log(answers);

            nextBtn.disabled = false;
        } else {
            nextBtn.disabled = true;
        }
    } else {
        answers[input.name] = input.id;
        console.log(answers);
        nextBtn.disabled = false;
    }
});
nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < 21) {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
        folowProgress(currentQuestionIndex);
        hideprevious();

        nextBtn.disabled = true;
        if (currentQuestionIndex === 21) {
            nextBtn.innerText = "Terminer le test";
            nextBtn.classList.add("result");
            let resultBtn = document.querySelector(".result");
            resultBtn.addEventListener("click", Results);
        } else {
            nextBtn.innerText = "Suivant";
        }
    }
});

previousBtn.addEventListener("click", () => {
    currentQuestionIndex--;
    showQuestion(questions[currentQuestionIndex]);
    folowProgress(currentQuestionIndex);
    hideprevious();

    nextBtn.disabled = true;
    if (currentQuestionIndex === 21) {
        nextBtn.innerText = "Terminer le test";
    } else {
        nextBtn.innerText = "Suivant";
        nextBtn.classList.remove("result");
    }
});

let answers = {}

let severity = 0

function Results() {


//Patient avec fièvre, ou toux + mal de gorge, ou toux + courbatures ou fièvre + diarrhée :
//Tout patient sans facteur pronostique :Sans facteur de gravité & <50 ans :

    if (((answers['Q1'] === 'Oui' || answers['Q3'] === 'Oui') && (answers['Q5'] === 'Oui' || answers['Q3'] === 'Oui') && (answers['Q4'] === 'Oui' || answers['Q1'] === 'Oui') && answers['Q6'] === 'Oui') && (answers['Q14'] === 'Non' && answers['Q15'] === 'Non' && answers['Q16'] === 'Non' && answers['Q17'] === 'Non' && answers['Q18'] === 'Non' && answers['Q19'] === 'Non' && ( answers['Q20'] === 'Non' || answers['Q20'] === 'Homme' ) && answers['Q21'] === 'Non' && answers['Q22'] === 'Non' &&  answers['Q11'] < 50 )) {

        resultMessage[0].innerText = 'Nous vous conseillons de rester à votre domicile et de contacter votre médecin' +
                ' en cas d’apparition de nouveaux symptômes. Vous pourrez aussi utiliser à nouv' +
                'eau l’application pour réévaluer vos symptômes'
        resultMessage[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
                'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
        resultMessage[0].style.fontWeight = 'bold'
        resultMessage[0].style.color = '#369D53'
    }


//Patient avec fièvre, ou toux + mal de gorge, ou toux + courbatures ou fièvre + diarrhée :
//Tout patient sans facteur pronostique : Sans facteur de gravité & 50-69 ans, ou avec au moins un facteur de gravité mineur

    if  (((answers['Q1'] === 'Oui' || answers['Q3'] === 'Oui') && (answers['Q5'] === 'Oui' || answers['Q3'] === 'Oui') && (answers['Q4'] === 'Oui' || answers['Q1'] === 'Oui') && answers['Q6'] === 'Oui') && ((answers['Q14'] === 'Non' && answers['Q15'] === 'Non' && answers['Q16'] === 'Non' && answers['Q17'] === 'Non' && answers['Q18'] === 'Non' && answers['Q19'] === 'Non' && ( answers['Q20'] === 'Non' || answers['Q20'] === 'Homme' ) && answers['Q21'] === 'Non' && answers['Q22'] === 'Non' && answers['Q11'] > 50) || ((answers['Q2'] >= 39) || (answers['Q7'] === 'Oui') || (answers['Q10'] === ' Fatigué(e)') || (answers['Q10'] === 'Très fatigué')))) {

        resultMessage[0].innerText = "Vous pouvez faire une téléconsultation ou médecin généraliste ou visite à domi" +
        "cile. Appelez le 141 si une gêne respiratoire ou des difficultés importantes p" +
        "our s’alimenter ou boire pendant plus de 24h apparaissent."
        resultMessage[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
        'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
         resultMessage[0].style.fontWeight = 'bold'
         resultMessage[0].style.color = '#369D53'
    }


//Patient avec fièvre, ou toux + mal de gorge, ou toux + courbatures ou fièvre + diarrhée :
//Tout patient avec un facteur pronostique ou plus: Aucun facteur de gravité :

    if (((answers['Q1'] === 'Oui' || answers['Q3'] === 'Oui') && (answers['Q5'] === 'Oui' || answers['Q3'] === 'Oui') && (answers['Q4'] === 'Oui' || answers['Q1'] === 'Oui') && answers['Q6'] === 'Oui') && ((answers['Q14'] === 'Oui' || answers['Q15'] === 'Oui' || answers['Q16'] === 'Oui' || answers['Q17'] === 'Oui' || answers['Q18'] === 'Oui' || answers['Q19'] === 'Oui' ||answers['Q20'] === 'Oui'  || answers['Q21'] === 'Oui' || answers['Q22'] === 'Oui') && (answers['Q7'] === 'Non' && answers['Q8'] === 'Non' && answers['Q17'] === 'Non' && answers['Q10'] === 'Assez bien' && answers['Q10'] === 'Bien'))){

        resultMessage[0].innerText = "Vous pouvez faire une téléconsultation ou médecin généraliste ou visite à domi" +
        "cile. Appelez le 141 si une gêne respiratoire ou des difficultés importantes p" +
        "our s’alimenter ou boire pendant plus de 24h apparaissent."
        resultMessage[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
        'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
         resultMessage[0].style.fontWeight = 'bold'
         resultMessage[0].style.color = '#369D53'
    }


//Patient avec fièvre, ou toux + mal de gorge, ou toux + courbatures ou fièvre + diarrhée :
//Tout patient avec un facteur pronostique ou plus: Un seul facteur de gravité mineur :  

   if (((answers['Q1'] === 'Oui' || answers['Q3'] === 'Oui') && (answers['Q5'] === 'Oui' || answers['Q3'] === 'Oui') && (answers['Q4'] === 'Oui' || answers['Q1'] === 'Oui') && answers['Q6'] === 'Oui') && (answers['Q14'] === 'Oui' || answers['Q15'] === 'Oui' || answers['Q16'] === 'Oui' || answers['Q17'] === 'Oui' || answers['Q18'] === 'Oui' || answers['Q19'] === 'Oui' ||answers['Q20'] === 'Oui'  || answers['Q21'] === 'Oui' || answers['Q22'] === 'Oui') && (answers['Q2'] >= 39 || answers['Q7'] === 'Oui' || answers['Q10'] === 'Très fatigué' || answers['Q10'] === 'Fatigué(e)' )){

    resultMessage[0].innerText = "Vous pouvez faire une téléconsultation ou médecin généraliste ou visite à domi" +
    "cile. Appelez le 141 si une gêne respiratoire ou des difficultés importantes p" +
    "our s’alimenter ou boire pendant plus de 24h apparaissent."
    resultMessage[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
    'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
     resultMessage[0].style.fontWeight = 'bold'
     resultMessage[0].style.color = '#369D53'
   }


//Patient avec fièvre, ou toux + mal de gorge, ou toux + courbatures ou fièvre + diarrhée :
//Tout patient avec un facteur pronostique ou plus: deux facteurs de gravité mineurs :

    if (((answers['Q1'] === 'Oui' || answers['Q3'] === 'Oui') && (answers['Q5'] === 'Oui' || answers['Q3'] === 'Oui') && (answers['Q4'] === 'Oui' || answers['Q1'] === 'Oui') && answers['Q6'] === 'Oui') && (answers['Q14'] === 'Oui' || answers['Q15'] === 'Oui' || answers['Q16'] === 'Oui' || answers['Q17'] === 'Oui' || answers['Q18'] === 'Oui' || answers['Q19'] === 'Oui' ||answers['Q20'] === 'Oui'  || answers['Q21'] === 'Oui' || answers['Q22'] === 'Oui') && ((answers['Q2'] >= 39 && answers['Q7'] === 'Oui') || (answers['Q2'] >= 39 && answers['Q10'] === 'Fatigué(e)') || (answers['Q2'] >= 39 && answers['Q10'] === 'Très fatigué') || (answers['Q7'] === 'Oui' && answers['Q10'] === 'Fatigué(e)') || (answers['Q7'] === 'Oui' && answers['Q10'] === 'Très fatigué'))){

        resultMessage[0].innerText = "Appelez le 141"
        resultMessage[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
                'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
        resultMessage[0].style.color = '#FF0000'
        resultMessage[0].style.fontSize = '48px'
        resultMessage[0].style.fontWeight = 'bold'

    }


//Tout patient avec fièvre et toux :
//Tout patient sans facteur pronostique :
//Sans facteur de gravité ou au moins 1 facteur de gravité mineur sans facteur de gravité majeur:

if (((answers['Q1'] === 'Oui' && answers['Q3'] === 'Oui') && (answers['Q14'] === 'Non' && answers['Q15'] === 'Non' && answers['Q16'] === 'Non' && answers['Q17'] === 'Non' && answers['Q18'] === 'Non' && answers['Q19'] === 'Non' && ( answers['Q20'] === 'Non' || answers['Q20'] === 'Homme' ) && answers['Q21'] === 'Non' && answers['Q22'] === 'Non')) && (answers['Q7'] === 'Non' && answers['Q8'] === 'Non' && answers['Q17'] === 'Non' && answers['Q10'] === 'Assez bien' && answers['Q10'] === 'Bien') || ((answers['Q2'] >= 39 || answers['Q7'] === 'Oui' || answers['Q10'] === 'Très fatigué' || answers['Q10'] === 'Fatigué(e)') && answers['Q2'] <= 35,4 && answers['Q17'] === 'Non' && answers['Q8'] === 'Non')) {

    resultMessage[0].innerText = "Vous pouvez faire une téléconsultation ou médecin généraliste ou visite à domi" +
    "cile. Appelez le 141 si une gêne respiratoire ou des difficultés importantes p" +
    "our s’alimenter ou boire pendant plus de 24h apparaissent."
    resultMessage[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
    'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
     resultMessage[0].style.fontWeight = 'bold'
     resultMessage[0].style.color = '#369D53'
}

//Tout patient avec fièvre et toux :
//Tout patient avec un facteur pronostique ou plus :
//Aucun facteur de gravité:

if ((answers['Q1'] === 'Oui' && answers['Q3'] === 'Oui') && (answers['Q14'] === 'Oui' || answers['Q15'] === 'Oui' || answers['Q16'] === 'Oui' || answers['Q17'] === 'Oui' || answers['Q18'] === 'Oui' || answers['Q19'] === 'Oui' ||answers['Q20'] === 'Oui'  || answers['Q21'] === 'Oui' || answers['Q22'] === 'Oui') && answers['Q7'] === 'Non' && answers['Q8'] === 'Non' && answers['Q17'] === 'Non' && answers['Q10'] === 'Assez bien' && answers['Q10'] === 'Bien') {

    resultMessage[0].innerText = "Vous pouvez faire une téléconsultation ou médecin généraliste ou visite à domi" +
    "cile. Appelez le 141 si une gêne respiratoire ou des difficultés importantes p" +
    "our s’alimenter ou boire pendant plus de 24h apparaissent."
    resultMessage[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
    'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
     resultMessage[0].style.fontWeight = 'bold'
     resultMessage[0].style.color = '#369D53'

}

//Tout patient avec fièvre et toux :
//Tout patient avec un facteur pronostique ou plus :
//Un seul facteur de gravité mineur:

if ((answers['Q1'] === 'Oui' && answers['Q3'] === 'Oui') && (answers['Q14'] === 'Oui' || answers['Q15'] === 'Oui' || answers['Q16'] === 'Oui' || answers['Q17'] === 'Oui' || answers['Q18'] === 'Oui' || answers['Q19'] === 'Oui' ||answers['Q20'] === 'Oui'  || answers['Q21'] === 'Oui' || answers['Q22'] === 'Oui') && (answers['Q2'] >= 39 || answers['Q7'] === 'Oui' || answers['Q10'] === 'Très fatigué' || answers['Q10'] === 'Fatigué(e)')) {

    resultMessage[0].innerText = "Vous pouvez faire une téléconsultation ou médecin généraliste ou visite à domi" +
    "cile. Appelez le 141 si une gêne respiratoire ou des difficultés importantes p" +
    "our s’alimenter ou boire pendant plus de 24h apparaissent."
    resultMessage[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
    'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
     resultMessage[0].style.fontWeight = 'bold'
     resultMessage[0].style.color = '#369D53'
}

//Tout patient avec fièvre et toux :
//Tout patient avec un facteur pronostique ou plus :
//Au moins deux facteurs de gravité mineurs:

if (((answers['Q1'] === 'Oui' && answers['Q3'] === 'Oui') && (answers['Q14'] === 'Oui' || answers['Q15'] === 'Oui' || answers['Q16'] === 'Oui' || answers['Q17'] === 'Oui' || answers['Q18'] === 'Oui' || answers['Q19'] === 'Oui' ||answers['Q20'] === 'Oui'  || answers['Q21'] === 'Oui' || answers['Q22'] === 'Oui')) && ((answers['Q2'] >= 39 && answers['Q7'] === 'Oui') || (answers['Q2'] >= 39 && answers['Q10'] === 'Fatigué(e)') || (answers['Q2'] >= 39 && answers['Q10'] === 'Très fatigué') || (answers['Q7'] === 'Oui' && answers['Q10'] === 'Fatigué(e)') || (answers['Q7'] === 'Oui' && answers['Q10'] === 'Très fatigué'))) {

    resultMessage[0].innerText = "Appelez le 141"
    resultMessage[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
            'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
    resultMessage[0].style.color = '#FF0000'
    resultMessage[0].style.fontSize = '48px'
    resultMessage[0].style.fontWeight = 'bold'
}

//Tout patient avec un seul symptôme parmi fièvre, toux, mal de gorge, courbatures :
//Pas de facteur de gravité:

if ((answers['Q1'] === 'Oui' ||answers['Q3'] === 'Oui'  || answers['Q5'] === 'Oui' || answers['Q4'] === 'Oui') &&(answers['Q7'] === 'Non' && answers['Q8'] === 'Non' && answers['Q17'] === 'Non' && answers['Q10'] === 'Assez bien' && answers['Q10'] === 'Bien')){

    resultMessage[0].innerText = 'Votre situation ne relève probablement pas du Covid-19.' +
    'Consultez votre médecin au moindre doute.'
    resultMessage[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
    'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
    resultMessage[0].style.fontWeight = 'bold'
    resultMessage[0].style.fontWeight = 'bold'
    resultMessage[0].style.color = '#369D53'

}

//Tout patient avec un seul symptôme parmi fièvre, toux, mal de gorge, courbatures :
//Au moins un facteur de gravité ou un facteur pronostique:

if ((answers['Q1'] === 'Oui' ||answers['Q3'] === 'Oui'  || answers['Q5'] === 'Oui' || answers['Q4'] === 'Oui') && ((answers['Q14'] === 'Oui' || answers['Q15'] === 'Oui' || answers['Q16'] === 'Oui' || answers['Q17'] === 'Oui' || answers['Q18'] === 'Oui' || answers['Q19'] === 'Oui' ||answers['Q20'] === 'Oui'  || answers['Q21'] === 'Oui' || answers['Q22'] === 'Oui') || (answers['Q7'] === 'oui' && answers['Q8'] === 'oui' && answers['Q17'] === 'oui' && answers['Q10'] === 'Très fatigué' && answers['Q10'] === 'Fatigué(e)' ) )) {

    resultMessage[0].innerText = 'Votre situation ne relève probablement pas du Covid-19.' +
    'Un avis médical est recommandé. Au moindre doute, appelez le 141.'
    resultMessage[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
    'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
    resultMessage[0].style.fontWeight = 'bold'
    resultMessage[0].style.fontWeight = 'bold'
    resultMessage[0].style.color = '#369D53'
}


// Tout patient avec aucun symptôme :

if ((answers['Q1'] === 'Non') && (answers['Q3'] === 'Non') && (answers['Q4'] === 'Non') && (answers['Q5'] === 'Non') && (answers['Q6'] === 'Non')){

    resultMessage[0].innerText = 'Votre situation ne relève probablement pas du Covid-19.' +
    'N’hésitez pas à contacter votre médecin en cas de doute.' + 'Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la situation.' + 'Pour toute information concernant le Covid-19 allez vers la page d’accueil.'
    resultMessage[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
    'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
    resultMessage[0].style.fontWeight = 'bold'
    resultMessage[0].style.fontWeight = 'bold'
    resultMessage[0].style.color = '#369D53'
}

   showResult(severity)

}

function showResult(severity) {

    stepper[1].classList.remove('select')
        
        
    stepper[2] .classList.add('select')
       
        
    testBtn.style.display = 'block'
    Préambule.style.display = 'block'
    questionnaire.style.display = 'none'
    testBtn.textContent = ' Recommencer le test'
    testBtn.addEventListener('click', () => {

        window.location.reload()
            
            
    });

    

} 
resultMessage.innerText = "Résultats";


////////DOM///////////////
