var questions = [
  {
    question: "What is JSON?",
    choices: ["son of Java","son of Javason","Michael Jackson","Javascript Object notation"],
    correctAnswer: 3
  },
  {
    question: "What is POST Request?",
    choices: ["Postal code","postman","post data to a server","Sending data to server"],
    correctAnswer: 2
  },
  {
    question: "What is Get Request?",
    choices: ["GET code","Get process","Get data from a server","Sending data to server"],
    correctAnswer: 2
  },
  
];

var currentQuestion = 0;
var correctAnswer = 0;
var quizOver = false;

$(document).ready(function() {
     displayCurrentQuestion();
     
     $(this).find(".nextButton").on('click',function(){
          if (!quizOver) {
             let value = $("input[type='radio']:checked").val();
             if (value == undefined) {
               $(document).find(".quizMessage").text("Please select an answer!");
             }else{
               $(document).find(".quizMessage").hide();
               //check if the answer is correct or not
               //if correct increment the correctanswer counter
               if (value == questions[currentQuestion].correctAnswer) {
                 correctAnswer++;
               }
               currentQuestion++;
               //display questions till there is no more;
               if (currentQuestion < questions.length) {
                 displayCurrentQuestion();
               }else{
                 displayScore();
                 $(document).find(".nextButton").text("give again?");
                 quizOver = true;
               }
               
             }
          }else{
              quizOver = false;
              $(document).find(".nextButton").text("Next Question");
              resetQuiz();
              displayCurrentQuestion();
              hideScore();
          }
     });
});


function displayCurrentQuestion() {
   console.log("In display next question");

   var question = questions[currentQuestion].question;
   var questionClass = $(document).find(".quizContainer > .question");
   var choiceList = $(document).find(".quizContainer > .choiceList");
   var numChoices = questions[currentQuestion].choices.length;

   //setting the question class text to the current question
   $(questionClass).text(question);

   // remove any current <li> elements (if any)
   $(choiceList).find("li").remove();
   
   var choice;

   //render the choices on the quiz box
   for (let i = 0; i < numChoices; i++) {
     choice = questions[currentQuestion].choices[i];
     $('<li><input type="radio" name="dynRadio" value='+ i + '>' + choice + '<li>').appendTo(choiceList);

   }
}

function resetQuiz() {
  currentQuestion = 0;
  correctAnswer = 0;
  hideScore();
}

function displayScore() {
  $(document).find(".questionContainer > .quizMessage").text("Your score " + correctAnswer + "out of" + questions.length);
  $(document).find(".questionContainer > .quizMessage").show();
}

function hideScore() {
  $(document).find(".result").hide();
}

