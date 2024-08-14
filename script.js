const alphabet = "abcdefghijklmnopqrstuvwxyz"
let hasGraded = false;
let questionList = undefined;

let percentAccuracy = 0;

var currentQuestion = 0; //Keeps track of advancement on single question mode

const celebrate = () => {
  let myCanvas = document.createElement("canvas");
  myCanvas.id = "celebrate";

  document.body.appendChild(myCanvas);
  var myConfetti = confetti.create(myCanvas, {
  resize: true,
  useWorker: true
});
myConfetti({
  particleCount: 100,
  spread: 160
  // any other options from the global
  // confetti function
});
}

//A helper function to adjust the progress bar
const updateProgress = (w) => {
  if(this.bar === undefined) this.bar = document.getElementById("progressBar"); //Optimization: You access the DOM as little as possible, because it's slow
  this.bar.style.width = w + "%";
}

//Function that fills in the DOM with questions, based on information from config
let populator = () => {
  console.log("Running populator...");

  let mainContainer = document.getElementById("main-container");

  //Put in the prompt information
  let promptContainer = document.getElementById("prompt-container");
  if(settings.promptText !== undefined) document.getElementById("promptText").innerHTML = settings.promptText;
  if(settings.promptImage !== undefined) document.getElementById("promptImage").src = "assets/" + settings.promptImage;
  if(settings.promptText === undefined && settings.promptImage == undefined) promptContainer.style.display = "none"; //Hide the prompt area if no prompt is included

  let questionContainer = document.getElementById("question-container");
  let resultsContainer = document.getElementById('results-container');

  let gradeButton = document.getElementById("gradeButton");
  let previousButton = document.getElementById("previousButton");
  let nextButton = document.getElementById("nextButton");
  let accuracyCalculation = document.getElementById('accuracyCalculation');

  if(settings.showTimer) {
    var startTime = performance.now();
    var timer = document.getElementById("timer");
    var elapsedSeconds = 0;
    var elapsedMinutes = 0;
    timer.style.display = "block";

    const updateTimer = () => {

      //Increment the timer
      elapsedSeconds++;
      if(elapsedSeconds >= 60) {
        elapsedMinutes = 0;
        elapsedMinutes++;
      }

      //Make sure there are at least two digits in each time component
      let stringSeconds = elapsedSeconds + "";
      while(stringSeconds.length < 2) stringSeconds = "0" + stringSeconds;

      let stringMinutes = elapsedMinutes + "";
      while(stringMinutes.length < 2) stringMinutes = "0" + stringMinutes;

      //Display the time output
      timer.innerHTML = stringMinutes + ":" + stringSeconds;
    }
    updateTimer();
    setInterval(updateTimer, 1000); //Update the timer each time a second elapses
  }
  if(settings.showProgressBar) document.getElementById("progress-container").style.display = "block";

  //Shuffle the questions
  questionList = settings.questions;
  if(settings.shuffleQuestionOrder) questionList = shuffleArray(questionList);

  //Iterate through all questions
  for(let i = 0; i < questionList.length; i++) {
    //Build each question
    const question = questionList[i];
    let questionDiv = document.createElement("div");
    questionDiv.classList.add("question")

    //The number
    if(settings.showQuestionNumber) {
      let numberHeader = document.createElement("h3");
      numberHeader.innerHTML = "QUESTION #" + (i + 1);
      questionDiv.appendChild(numberHeader);
    }

    //The title
    if(question.title !== undefined) {
      let questionTitle = document.createElement("h2");
      questionTitle.innerHTML = question.title;
      questionDiv.appendChild(questionTitle);
    }

    //The prompt
    if(question.promptText !== undefined || question.promptImage !== undefined) {
      let questionPrompt = document.createElement("div");
      if(question.promptText !== undefined) {
        let promptText = document.createElement("p");
        promptText.innerHTML = question.promptText;
        questionPrompt.appendChild(promptText);
      }
      if(question.promptImage !== undefined) {
        let promptImage = document.createElement("img");
        promptImage.src = "assets/" + question.promptImage;
        questionPrompt.appendChild(promptImage);
      }
      questionDiv.appendChild(questionPrompt);
    }

    //The answer input (choices or input field)
    let questionType = question.type;
    if(questionType === undefined) questionType = settings.questionDefaults.type;

    if(questionType === undefined || questionType == MULTIPLE_CHOICE || questionType == SINGLE_CHOICE || questionType == DROPDOWN) {

      let answerList = question.answers;
      if(question.shuffleAnswerOrder || settings.questionDefaults.shuffleAnswerOrder) answerList = shuffleArray(answerList);

      if(questionType == DROPDOWN) containerTagName = "select";
      else containerTagName = "fieldset";

      let answerSelection = document.createElement(containerTagName);
      answerSelection.classList.add("answerContainer");

      answerSelection.name = "q_" + i;

      for(let j = 0; j < answerList.length; j++) {

        let choice = answerList[j];

        let choiceDisplayText = "";

        if(question.numberAnswers || settings.questionDefaults.numberAnswers) choiceDisplayText = (j + 1) + ". " + choice.answerText;
        else if(question.letterAnswers || settings.questionDefaults.letterAnswers) choiceDisplayText = alphabet.charAt(j) + ". " + choice.answerText;
        else choiceDisplayText = choice.answerText;

        let choiceDiv = undefined;

        if(questionType == DROPDOWN) {
          choiceDiv = document.createElement("option");
          choiceDiv.value = choice.answerText;
          choiceDiv.innerHTML = choiceDisplayText;
        }
        else {
          choiceDiv = document.createElement("div");

          //Record if this option is correct or not
          if(settings.revealSolutions) {
            if(choice.correct) {
              choiceDiv.classList.add("correctChoice");
            }
            else {
              choiceDiv.classList.add("incorrectChoice");
            }
          }

          let button = document.createElement("input");
          button.id = button.name = "q_" + i; //Give the button a unique ID, so the label can attach

          if(questionType == SINGLE_CHOICE) button.type = "radio";
          else button.type = "checkbox";
          button.value = choiceDisplayText;

          choiceDiv.appendChild(button);

          let label = document.createElement("label");
          label.innerHTML = choiceDisplayText;
          label.for = "q_" + i;

          choiceDiv.appendChild(label);
        }
        choiceDiv.classList.add("answerChoice");
        answerSelection.appendChild(choiceDiv);
      }

      questionDiv.appendChild(answerSelection);

    }
    else if (questionType == SHORT_ANSWER || questionType == NUMBER) {
      let responseField = document.createElement("input");

      if(questionType == NUMBER) responseField.type = "number";
      else responseField.type = "text";

      responseField.name = "q_" + i;

      if(!question.allowDecimal && !settings.questionDefaults.allowDecimal) {
        //Whenever the user tries to enter a decimal, abort it
        responseField.addEventListener("keydown", (event) => {
          if(event.key==='.') {
            event.preventDefault();
          }
        })
      }

      questionDiv.appendChild(responseField);
    }

    //The explanations
    if(question.correctExplanation !== undefined) {
      let explanationDiv = document.createElement("div");
      explanationDiv.classList.add("correctExplanation");
      if(question.correctExplanation.explanationText !== undefined) {
        let explanationText = document.createElement("p");
        explanationText.innerHTML = question.correctExplanation.explanationText;
        explanationDiv.appendChild(explanationText);
      }
      if(question.correctExplanation.explanationImage !== undefined) {
        let explanationImage = document.createElement("img");
        explanationImage.src = question.correctExplanation.explanationImage;
        explanationDiv.appendChild(explanationImage);
      }
      questionDiv.appendChild(explanationDiv);
    }
    if(question.incorrectExplanation !== undefined) {
      let explanationDiv = document.createElement("div");
      explanationDiv.classList.add("incorrectExplanation");
      if(question.incorrectExplanation.explanationText !== undefined) {
        let explanationText = document.createElement("p");
        explanationText.innerHTML = question.incorrectExplanation.explanationText;
        explanationDiv.appendChild(explanationText);
      }
      if(question.incorrectExplanation.explanationImage !== undefined) {
        let explanationImage = document.createElement("img");
        explanationImage.src = question.incorrectExplanation.explanationImage;
        explanationDiv.appendChild(explanationImage);
      }
      questionDiv.appendChild(explanationDiv);
    }

    //Finally, insert into DOM
    questionContainer.appendChild(questionDiv);

    //If displaying questions one at a time, all questions other than the first should be hidden
    if(settings.singleQuestion && i > 0) questionDiv.style.display = "none";
  }

  //The grade button
  if(!settings.gradeImmediately) {
    gradeButton.innerHTML = settings.gradeButtonText;

    gradeButton.addEventListener("click", () => {
      //Reset things if already graded before
      percentAccuracy = 0;

      const userRespose = new FormData(questionContainer);

      for(let q = 0; q < questionList.length; q++) { //Iterate over all the questions, to see if the user provided a response
        let answersSupplied = userRespose.getAll("q_" + q);

        //If a question is unanswered
        if(!settings.allowUnanswered) {
          if(answersSupplied === undefined || answersSupplied.length == 0 || answersSupplied[0].length == 0) {
            //Undo all grading that has been done
            for(let u = 0; u < q; u++) {
              let gradedQuestion = questionContainer.children[u];
              gradedQuestion.classList.remove("correctQuestion");
              gradedQuestion.classList.remove("incorrectQuestion");
            }

            //Alert user
            alert("You must answer all questions.")

            //Force stop grading
            return;
          }
        }

        //Assume the question was answered correctly, until proven otherwise below
        let isCorrect = true;

        //Check to see if the answer is totally correct or not
        for(let r = 0; r < questionList[q].answers.length && isCorrect; r++) { //Iterate over all question options
          let compareAnswer = questionList[q].answers[r];

          let isSelected = false;
          for(let a = 0; a < answersSupplied.length && isCorrect; a++) { //Check against the options the user selected
            let userChecked = answersSupplied[a];
            if(userChecked.length) {
              if((userChecked == compareAnswer.answerText) || (userChecked.toLowerCase() == compareAnswer.answerText.toLowerCase() && !(answersSupplied[a].caseSensitive || settings.questionDefaults.caseSensitive)) || (userChecked == compareAnswer.answerImage)) { //We found an option the user selected
                isSelected = true;
                if(!compareAnswer.correct) isCorrect = false; //It was selected, but it SHOULD NOT have been
              }
            }
          }
          if(!isSelected && compareAnswer.correct) isCorrect = false; //It wasn't selected, but it should've been
        }

        //Mark the accuracy of the whole question
        if(settings.markQuestionAccuracy) {
          let myQuestion = questionContainer.children[q];

          if(isCorrect) {
            myQuestion.classList.remove("incorrectQuestion");
            myQuestion.classList.add("correctQuestion");
          }
          else {
            myQuestion.classList.remove("correctQuestion"); //These are mutually exclusive
            myQuestion.classList.add("incorrectQuestion");
          }
        }
        //Calculate score
        if(isCorrect) percentAccuracy += Math.floor((1 / questionList.length) * 100)

        hasGraded = true;
      }

      //Hide the button
      if(!settings.allowRetry) gradeButton.style.display = "none";

      //Show the accuracy percentage
      if(settings.showAccuracySummary) {
        accuracyCalculation.style.display = "grid";
        accuracyCalculation.style.setProperty("--gradeValue", Math.round(percentAccuracy));
      }

      //Run the celebration
      if(settings.celebration.doCelebration) {
        if(percentAccuracy >= settings.celebration.minimumScore) {
          celebrate();
        }
      }
    });

  }
  if(settings.singleQuestion) {

    //Restructure the page on single question mode to not use scrolling as primary navigation
    document.body.style.overflowY = "hidden";
    questionContainer.style.overflowY = "scroll";
    questionContainer.style.height = "50vh"

    //Toggle the appropriate buttons to their starting positions
    if(settings.questions.length > 1) {
      gradeButton.style.display = "none"; //Hide the grade button at first, since you're not on the last question (unless it's a one question quiz!)
      nextButton.style.display = "block";
    }

    nextButton.innerHTML = settings.nextButtonText;

    previousButton.innerHTML = settings.previousButtonText;

    nextButton.addEventListener("click", () => {
      questionContainer.children[currentQuestion].style.display = "none";
      currentQuestion++;
      questionContainer.children[currentQuestion].style.display = "block";

      previousButton.style.display = "block";
      if(currentQuestion >= questionContainer.children.length - 1) {
        nextButton.style.display = "none";
        if(!hasGraded || settings.allowRetry) gradeButton.style.display = "block";
      }

      updateProgress(((currentQuestion) / (questionContainer.children.length - 1)) * 100)
    });

    previousButton.addEventListener("click", () => {
      gradeButton.style.display = "none";
      questionContainer.children[currentQuestion].style.display = "none";
      currentQuestion--;
      questionContainer.children[currentQuestion].style.display = "block";

      nextButton.style.display = "block";
      if(currentQuestion <= 0) previousButton.style.display = "none";

      updateProgress(((currentQuestion) / (questionContainer.children.length - 1)) * 100)
    });


  }
  else {
    if(settings.showProgressBar) { //Progress bar is tied to scrolling

      progressBar.style.transition = "width .1s"; //Turn down the animation duration, since this JS implementation is much faster than updating jumps

      var scrollContainer = document.getElementById("scroll-container");

      scrollContainer.addEventListener('scroll', () => {

        let scrollTop = scrollContainer.scrollTop;
        let totalHeight = Math.max(scrollContainer.scrollHeight, scrollContainer.offsetHeight);
        let percent = Math.round((scrollTop / (totalHeight - scrollContainer.offsetHeight)) * 100);

        progressBar.style.width = percent + "%";

      });
    }
  }

  console.log("Population complete!");
}

populator();