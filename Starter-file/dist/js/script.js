// DOM

const stepper = document.querySelectorAll('.stepper h1')
const préambule = document.querySelector('.Préambule')
const questionnaire = document.querySelector('.questionnaire')
const testBtn = document.querySelector('.start')
const prec = document.querySelector('.precedent')
const suiv =document.querySelector('.suivant')
const progressBar = document.querySelector('.bar')
const questionNumber = document.querySelector('.number')
const currentQuestion = document.querySelector('.question')
const answerInputs = document.querySelector('.answer-inputs')
const box = document.querySelector('.box')



//      Event Listener




testBtn.addEventListener('click', start)

function start() {
    stepper[0]
        .classList
        .remove('active')
    stepper[1]
        .classList
        .add('active')
    testBtn.style.display = 'none'
    préambule.style.display = 'none'
    questionnaire.style.display = 'block'
    hidePrevious ()
    
}