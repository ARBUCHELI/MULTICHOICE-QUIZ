//Question types
const MULTIPLE_CHOICE = 0;
const SINGLE_CHOICE = 1;
const DROPDOWN = 2;
const NUMBER = 3;
const SHORT_ANSWER = 4;

const settings = {
  /*=== PLEASE DO NOT MAKE ANY EDITS ABOVE THIS LINE ===*/

  /*This applet creates a quiz of various formats of multiple
  choice questions. After completing the quiz, the user can
  check their accuracy at the end*/

  title: "Analyses Review",

  //Optionally, you can write instructions at the top of the applet page. Use this to describe functionality to the user. (enclose in quotes)
  promptText: "Indicate which variables you would use to answer each question:",
  promptImage: undefined, //Similarly, you can add an image prompt to illustrate instructions (this would be an image filename enclosed in quotes)

  //When true, questions are displayed one at a time. When false, questions are displayed as a scrolling view
  singleQuestion: false,

  //When true, grading shows which specific questions the user got correct or wrong
  markQuestionAccuracy: true,

  //When true, grading shows the correct answer to incorrectly answered and unanswered SINGLE_CHOICE and MULTIPLE_CHOICE questions (markQuestionAccuracy must be true). Does not apply for other question types.
  revealSolutions: true,

  //When true, user can still submit quiz even if some questions were unanswered. Unanswered questions are marked WRONG. (not applicable when checkImmediately is true)
  allowUnanswered: false,

  //Whether or not to show percentage accuracy at the bottom
  showAccuracySummary: true,

  //Displays a progress bar at the top of the screen
  showProgressBar: true,

  //Displays a timer during the quiz
  showTimer: false,

  //Show a header displaying the question number above each question (ex. "Question #5")
  showQuestionNumber: true,

  //When true, the quiz will be in a different order every time
  shuffleQuestionOrder: false,

  //The confetti upon successful completion
  celebration: {
    doCelebration: true,
    minimumScore: 90, //The minimum percentage accuracy to do the celebration
  },

  styling: {

    backgroundColor: "#0F1931", //The color of the background of the page

    bodyCopyColor: "white",
    questionTitleColor: "white",
    questionNumberColor: "gray",

    progressBarColor: "cyan",

    //The colors of checkboxes and multiple choice options
    selectedOptionColor: "#FED230",
    unselectedOptionColor: "#0F1931",

    //The color of text input fields
    fieldInputTextColor: "white",
    fieldInputBackgroundColor: "#0F1931",
    fieldInputBorderColor: "white",
    fieldInputSelectedColor: "#FED230",

    //The color of dropdowns
    dropdownBackgroundColor: "#0F1931",
    dropdownBorderColor: "white",
    dropdownTextColor: "white",

    //The coloration of the buttons at the bottom of the page (ex. the grade button)
    buttonTextColor: "#0F1931",
    buttonBackgroundColor: "#FED230",
    buttonBorderColor: "#0F1931",

    buttonHighlightedTextColor: "#FED230",
    buttonHighlightedBackgroundColor: "#0F1931",
    buttonHighlightedBorderColor: "#FED230",

    //The coloration of the scoring
    scoreColor: "#FED230",
    scorePathColor: "#080e1c",

    //The colors are applied to all things marked correct and incorrect
    correctColor: "green",
    incorrectColor: "red",

    /*Adjust the font used by the program.
    This could just be one font, or a list of fonts (as seen by default).
    Each font is separated by a comma. If the first font is unavailable,
    the program will use the next font. If that is also unavailable, it will
    proceed to the next font, and so forth. It is therefore best to include
    as many workable fonts as possible, in case the user does not have many
    fonts available on their system.
    */
    font: `
    Apercu,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Ubuntu,
    Cantarell,
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    sans-serif
    `,
  },

  gradeButtonText: "Check Answers",
  nextButtonText: "Next",
  previousButtonText: "Back",

  //These settings will be applied to all questions, unless the specific question denotes otherwise
  questionDefaults: {
    type: DROPDOWN,

    shuffleAnswerOrder: false,

    //Number the list of answers
    numberAnswers: false,

    //Add letter next to the list of answers
    letterAnswers: false,

    //For NUMBER type questions, specify if decimals are allowed or not
    allowDecimal: false,

    //For SHORT_ANSWER type questions, specify if the input is case sensitive
    caseSensitive: false,
  },

  questions: [
    {
      title: undefined,

      /*Choose from multiple question types

      DROPDOWN - The user selects from a dropdown of options
      SINGLE_CHOICE - The user selects a single answer from a list of answer bubbles. There can be more than one right answer, if multiple correct answers are specified
      MULTIPLE_CHOICE - The user can select any number of answer choices, but there is only one correct arrangement of answers
      NUMBER - The user can provide numeric input as their answer
      - allowDecimal: true | false :  Defines if the response allows for non-whole-numbers or not
      SHORT_ANSWER - The user can provide text input as their answer
      - caseSensitive: true | false :  Defines if the response is case sensitive or not

      */

      type: MULTIPLE_CHOICE,

      promptText: "You want to know if trees near highways are taller than trees in cities.", //The body copy on the front of the card
      promptImage: undefined,

      answers: [
        {
          answerText: "Height",
          answerImage: undefined,
          correct: true,
        },
        {
          answerText: "Location Type",
          answerImage: undefined,
          correct: true,
        },
        {
          answerText: "Species",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Prettiness",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Distance",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Single",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Not Valid",
          answerImage: undefined,
          correct: false,
        },
      ]
    },
    {
      title: undefined,

      /*Choose from multiple question types

      DROPDOWN - The user selects from a dropdown of options
      SINGLE_CHOICE - The user selects a single answer from a list of answer bubbles. There can be more than one right answer, if multiple correct answers are specified
      MULTIPLE_CHOICE - The user can select any number of answer choices, but there is only one correct arrangement of answers
      NUMBER - The user can provide numeric input as their answer
      - allowDecimal: true | false :  Defines if the response allows for non-whole-numbers or not
      SHORT_ANSWER - The user can provide text input as their answer
      - caseSensitive: true | false :  Defines if the response is case sensitive or not

      */

      type: MULTIPLE_CHOICE,

      promptText: "You want to know what species of trees live the longest.", //The body copy on the front of the card
      promptImage: undefined,

      answers: [
        {
          answerText: "Height",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Location Type",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Species",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Prettiness",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Distance",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Single",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Not Valid",
          answerImage: undefined,
          correct: true,
        },
      ]
    },
    {
      title: undefined,

      /*Choose from multiple question types

      DROPDOWN - The user selects from a dropdown of options
      SINGLE_CHOICE - The user selects a single answer from a list of answer bubbles. There can be more than one right answer, if multiple correct answers are specified
      MULTIPLE_CHOICE - The user can select any number of answer choices, but there is only one correct arrangement of answers
      NUMBER - The user can provide numeric input as their answer
      - allowDecimal: true | false :  Defines if the response allows for non-whole-numbers or not
      SHORT_ANSWER - The user can provide text input as their answer
      - caseSensitive: true | false :  Defines if the response is case sensitive or not

      */

      type: MULTIPLE_CHOICE,

      promptText: "You want to know what species of trees are the prettiest.", //The body copy on the front of the card
      promptImage: undefined,

      answers: [
        {
          answerText: "Height",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Location Type",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Species",
          answerImage: undefined,
          correct: true,
        },
        {
          answerText: "Prettiness",
          answerImage: undefined,
          correct: true,
        },
        {
          answerText: "Distance",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Single",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Not Valid",
          answerImage: undefined,
          correct: false,
        },
      ]
    },
    {
      title: undefined,

      /*Choose from multiple question types

      DROPDOWN - The user selects from a dropdown of options
      SINGLE_CHOICE - The user selects a single answer from a list of answer bubbles. There can be more than one right answer, if multiple correct answers are specified
      MULTIPLE_CHOICE - The user can select any number of answer choices, but there is only one correct arrangement of answers
      NUMBER - The user can provide numeric input as their answer
      - allowDecimal: true | false :  Defines if the response allows for non-whole-numbers or not
      SHORT_ANSWER - The user can provide text input as their answer
      - caseSensitive: true | false :  Defines if the response is case sensitive or not

      */

      type: MULTIPLE_CHOICE,

      promptText: "You want to know in what kind of location trees grow the closest together.", //The body copy on the front of the card
      promptImage: undefined,

      answers: [
        {
          answerText: "Height",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Location Type",
          answerImage: undefined,
          correct: true,
        },
        {
          answerText: "Species",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Prettiness",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Distance",
          answerImage: undefined,
          correct: true,
        },
        {
          answerText: "Single",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Not Valid",
          answerImage: undefined,
          correct: false,
        },
      ]
    },
    {
      title: undefined,

      /*Choose from multiple question types

      DROPDOWN - The user selects from a dropdown of options
      SINGLE_CHOICE - The user selects a single answer from a list of answer bubbles. There can be more than one right answer, if multiple correct answers are specified
      MULTIPLE_CHOICE - The user can select any number of answer choices, but there is only one correct arrangement of answers
      NUMBER - The user can provide numeric input as their answer
      - allowDecimal: true | false :  Defines if the response allows for non-whole-numbers or not
      SHORT_ANSWER - The user can provide text input as their answer
      - caseSensitive: true | false :  Defines if the response is case sensitive or not

      */

      type: MULTIPLE_CHOICE,

      promptText: "You want to know what kinds of trees grow in groups.", //The body copy on the front of the card
      promptImage: undefined,

      answers: [
        {
          answerText: "Height",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Location Type",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Species",
          answerImage: undefined,
          correct: true,
        },
        {
          answerText: "Prettiness",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Distance",
          answerImage: undefined,
          correct: false,
        },
        {
          answerText: "Single",
          answerImage: undefined,
          correct: true,
        },
        {
          answerText: "Not Valid",
          answerImage: undefined,
          correct: false,
        },
      ]
    },
    /*

    ADDING QUESTIONS - You may add as many questions as you like.
    Do so by copying one of the blocks above, and pasting it
    here, at the end of this list. (Before the closing square bracket)
    Be sure to include the curly braces ({ }) and comma (,) when you
    copy the block, otherwise the program will fail.

    REMOVING QUESTIONS - To remove a question, simply delete one of the question
    blocks above. Be sure to delete everything - including the curly
    braces ({ }) and comma (,).

    */
  ],


  /*=== PLEASE DO NOT MAKE ANY EDITS BELOW THIS LINE ===*/
};