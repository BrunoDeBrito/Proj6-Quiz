let currentQuestion = 0;
let correctAnswer = 0;

showQuestion();

document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

/**
 * Mostra as questões e respostas
 */
function showQuestion() {

    if (questions[currentQuestion]) {

        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`;

        // Remove toda a area de pontos
        document.querySelector('.scoreArea').style.display = 'none';
        //Apresenta a questão
        document.querySelector('.questionArea').style.display = 'block';

        //Monta a questão no html
        document.querySelector('.question').innerHTML = q.question;

        /**
         ** 1° Opção ela consome um pouco mais de recurso do usuario0...
         * 
         *  //limpa as resposta 
         *  document.querySelector('.options').innerHTML = '';
         *
         *  for (let i in q.options) {
         *
         *     document.querySelector('.options').innerHTML += `<div>${ q.options[i] }</div>`; 
         *  } 
        */

        let optionsHtml = ''; 

        for (let i in q.options) {

            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) +1}</span> ${ q.options[i] }</div>`; 
        }

        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {

            item.addEventListener('click', optionClickEvent);

        });

    } else {

        finishQuiz();

    }
}

/**
 * Click na pertgunta
 * @param {*} e 
 */
function optionClickEvent(e) {

    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if (questions[currentQuestion].answer === clickedOption) {

        correctAnswer ++;

    }

    currentQuestion ++;
    showQuestion();
}

function finishQuiz() {

    let points = Math.floor((correctAnswer / questions.length) * 100);

    document.querySelector('.scorePct').innerHTML   = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswer}`;

    if (points < 30) {

        document.querySelector('.scoreText1').innerHTML  = 'Precisa estudar mais sobre';
        document.querySelector('.scorePct').style.color = '#ff0000';
        
    } else if (points >= 30 && points < 70) {
        
        document.querySelector('.scoreText1').innerHTML  = 'Começando a fica bom isso ai hein';
        document.querySelector('.scorePct').style.color = '#ffff00';
        
    } else if (points >= 70) {
        
        document.querySelector('.scoreText1').innerHTML  = '2 palavras PARA BAINS';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }
 
    // Remove toda a area de pontos
    document.querySelector('.scoreArea').style.display = 'block';
    //Apresenta a questão
    document.querySelector('.questionArea').style.display = 'none';

    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    correctAnswer   = 0;
    currentQuestion = 0;

    showQuestion();


}
