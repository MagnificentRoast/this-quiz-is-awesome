// const and let statements here. Note, I was working on getting this code wired to the HTML, but something went horribly wrong, I can click start quiz, it shows the first question, but all of the answers combine into one button and it isn't clickable. There are also a ton of errors. It doesn't save the high scores because of a lack of local storage code, and it doesn't move on to the next question. I sincerely apologize for the halfhaphard coding this week.
const header = document.querySelector(".header")
const clickedBtn = document.querySelector("#clicked");
const qContainer = document.querySelector(".q-container");
const questBox = document.querySelector(".q-box");
const everyAnswer = document.querySelector(".every-answer")
let response = document.querySelector(".response");
let timer = document.querySelector("#timer")

// start function
const startQuiz = function() {
    console.log("started")
    questionIndex = 0;
};

    timeleft = 60;
    // countdown timer attached to timer (starts on click)
    // var timeleft = "";
    document.getElementById("clicked").addEventListener("click", function(){ 
        
        var downloadTimer = setInterval(function function1(){
        document.getElementById("timer").innerHTML = timeleft + " "+"";
        timeleft.textContent = timeleft
        
        // timeleft = 0;
        if (timeleft >0) {
            timeleft --
        }
        else if(timeleft == 0){
            clearInterval(downloadTimer);
            document.getElementById("timer").innerHTML = "Times up!";
            qContainer.remove(); //remove previous question for next
            everyAnswer.remove(); //remove answers
            endQuiz();
        }
        
        }, 1000);
        
        showQuestions();
        header.remove();
        clickedBtn.remove();
    });


//questions array provided to me by Chris Masters to help me understand syntax.
var questionsArray = [
    {
        questionText: "Commonly used data types DO not include:",
        choice: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: "Alerts",
    },
    {
        questionText: "The condition in an if / else statement is enclosed with __________.",
        choice: ["Quotes", "Curly brackets", "Parenthesis", "Square brackets"],
        answer: "Parenthesis",
    },
    {
        questionText: "Arrays in JavaScript can be used to store __________ ",
        choice: ["Numbers and Strings", "Other arrays", "Booleans", "All of the above"],
        answer: "All of the above",
    },
    {
        questionText: "String values must be enclosed within __________ when being assigned to variables ",
        choice: ["Commas", "Curly brackets", "Quotes", "Parenthesis"],
        answer: "Quotes",
    },
    {
        questionText: "A very useful tool used during development and debugging from printing content to the debugger is:",
        choice: ["JavaScript", "Terminal/bash", "For loops", "Console.log"],
        answer: "Console.log"
    }
    ]
//questions end//


// show questions snippet found through a few tutorials
const showQuestions = function(){
    let currQuestion = questionsArray[questionIndex];
    
    let qContainer = document.createElement("div");
    questBox.prepend(qContainer);

    let questionTitle = document.createElement("h3");
    questionTitle.textContent = currQuestion.questionText;
    qContainer.appendChild(questionTitle);

    // questions would go into answer box here
    let aContainer = document.createElement("ol");
    everyAnswer.appendChild(aContainer);

    for (let i = 0; i < currQuestion.choice.length; i++) {
        var answerChoice = document.createElement("li");
        answerChoice.className = "answer";
        answerChoice.textContent = currQuestion.choice[i];

      var clickedAnswer = answerChoice.setAttribute("id", currQuestion.choice[i]);//<<<<<<<<<<

      aContainer.appendChild(answerChoice);
    }

    aContainer.addEventListener("click", function(event) {
        answerChoice = event.target;

        // if/else statement assistance by Chris Masters during a study group.
        if (answerChoice.id == currQuestion.answer) {
            response.innerHTML = '<h3>Correct</h3>';
            aContainer.appendChild(response);
            questionIndex++;
        }

        else {
            response.innerHTML = '<h3>Incorrect</h3>'; 
            aContainer.appendChild(response);
            timeleft -=10; // 10 sec off for incorrect code shown by Chris Masters
            document.getElementById("timer").innerHTML = timeleft;
            questionIndex++;
        }

        // So I tried some stuff here, but the functionality was never achieved sadly. I tried to wire up the HTML properly, but sadly time was not on my side.

        const displayNextQuestion = setTimeout(function() {
            if (questionIndex < questionsArray.length) {
                qContainer.remove();
                aContainer.remove();
                showQuestions();
            }
            else {
                endQuiz();
            }
        }, 500);
    })
}

// So for here I tried to get it to go into local storage, but I don't think I have local storage set up properly, because there were some errors in the console log apart from the basic functionality
showResults = function(){
    localStorage.getItem("q_results", JSON.stringify(results));
}





// call start quiz
startQuiz()

// click to begin quiz
clickedBtn.addEventListener("click", startQuiz);






const endQuiz = function() {
// function endQuiz() {

    // stop timer
    clearInterval(downloadTimer);
    
    //hide questions/asnwers/button
    qContainer.remove(); //remove previous question for next
    everyAnswer.remove(); //remove answers
    
    if (currQuestion < questionsArray.length)
        showQuestions();
    else
        showResults();
}

// save score
// user initials
//start again
//load HS