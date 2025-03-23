// Mitchell Saremba - ICS128 - Lab07
$(document).ready(() => {
  const submitNameBtn = $("#submitNameBtn");
  const submitNameInput = $("#submitNameInput");
  const url = `https://opentdb.com/api.php?amount=4&type=multiple`;
  let name;

  // Fetch questions and answers from https://opentdb.com
  const getData = async () => {
    const res = await fetch(url);
    const data = await res.json();

    return data.results;
  };

  /***
   * Got this little function to shuffle array items from here
   *
   * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   *
   * Gonna use it to shuffle fetched questions/answers so that the correct answer doesn't always occur at the same index
   */
  const shuffle = (array) => {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  };

  // To store correct answers for current version of quiz
  const answerKey = {};

  // Renders all of the fetched data into HTML
  const makeQuestions = async () => {
    const questions = await getData();

    // Hint functionality so I can use it for fetched questions and for my hardcoded checkbox question
    const configHint = (idNum) => {
      const hint = $(`#q${idNum}Hint`);
      const hintAnswer = $(`#q${idNum}HintAnswer`);

      hintAnswer.hide(); // Hide answer initially
      hint.on("click", () => {
        hintAnswer.stop(); // Stop default .hide()
        hintAnswer.fadeToggle("slow");
      });
    };

    // Loop through each question and make a li tag with content, then loop through each answer for the current question and add radio inputs for each one
    let idCount = 0; // For making custom IDs in question HTML
    for (let q of questions) {
      // Add correct answer to answer key for each question
      answerKey[idCount] = q.correct_answer;

      // Combine incorrect and correct answers and mix their order up
      let answers = q.incorrect_answers.concat(q.correct_answer);
      shuffle(answers);

      // Add questions to the DOM - add textContent and custom ID's for future manipulation
      $("#quizList").append(`
                <li class="p-2 border-bottom border-1 w-100" id="q${idCount}">
                 ${q.question} 
                </li>
                <div class="d-flex flex-row justify-content-start  " role="button" id=q${idCount}Hint>
                  <span class="btn btn-secondary py-0 px-2 mx-1 border border-1 border-dark" role="button" >Hint</span>
                  <span class="text-success" id="q${idCount}HintAnswer">  ➡ ${q.correct_answer}</span>
                </div>
                <hr class="me-4">
                `);

      configHint(idCount); // Add hint for this question

      // Make a custom ID for current question
      const id = "#" + "q" + idCount;

      let charCount = "a"; // For making custom IDs for each answer

      // Add all of the answers to this question
      for (let a of answers) {
        $(id).append(`
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  id="${idCount + charCount}"
                  name="q${idCount}"
                />
                <label class="form-check-label" for="${
                  idCount + charCount
                }">${charCount}. ${a}</label>
                  </div>
           `);

        charCount = String.fromCharCode(charCount.charCodeAt(0) + 1); // Iterates charCount in alphabetic order
      }

      idCount += 1;
    }

    // Need to add the checkbox question in at the end since fetched data doesn't have checkbox answers
    $("#quizList").append(`
      <li class="p-2 border-bottom border-1 w-100" id="q5">
       Javascript is:
       <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="4a"
                  name="q4"
                />
                <label class="form-check-label" for="4a">a. Cool</label>
        </div>
        <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="4b"
                  name="q4"
                />
                <label class="form-check-label" for="4b">b. Fun</label>
        </div>
        <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="4c"
                  name="q4"
                />
                <label class="form-check-label" for="4c">c. Dumb</label>
        </div>
      </li>
      <div class="d-flex flex-row justify-content-start  " role="button" id=q4Hint>
        <span class="btn btn-secondary py-0 px-2 mx-1 border border-1 border-dark" role="button" >Hint</span>
        <span class="text-success" id="q4HintAnswer">  ➡ Cool and Fun obviously</span>
      </div>
      <hr class="me-4">
      `);

    configHint(4); // Add hint for checkbox
    answerKey[4] = ["Cool", "Fun"]; // Send answers to key
  };

  let scoreAndTime = {}; // To store score and time globally
  const makeTimer = () => {
    let minutes = 0;
    let seconds = 1; // Second starts at 1 to avoid delayed start

    const increment = () => {
      // Convert to strings that format to two digits
      let formatMinutes = minutes.toString().padStart(2, "0");
      let formatSeconds = seconds.toString().padStart(2, "0");

      if (seconds === 59) {
        minutes += 1;
        seconds = 0;
      } else {
        seconds += 1;
      }

      // Update DOM
      $("#timer").text(`${formatMinutes} : ${formatSeconds}`);
    };

    // Start counting
    const startTimer = setInterval(increment, 1000);

    // Post submission modal - I don't like how this logic is in with the same function as the timer logic but also too lazy to refactor so it works
    let modal = new bootstrap.Modal("#submitModal");
    $("#quizList").on("submit", (e) => {
      e.preventDefault();

      try {
        // Stop counter
        clearInterval(startTimer);

        // Send score and time to global scope
        scoreAndTime.score = markQuiz();
        scoreAndTime.time = $("#timer").text();

        displayScoreInDOM();

        // Bring up modal
        handleModal(modal, name);
      } catch (error) {
        handleUnansweredQuestionsError(); // Alert at top of the page
      }
    });
  };

  // Async function that sets up the quiz page and shows it to the user
  const showQuizPage = async (name) => {
    await makeQuestions();
    await $("#welcomeMessage.h4").text(`Welcome, ${name}. Good luck!`);
    await $("#quizPage").fadeIn(1000);
    makeTimer();
  };

  // Throws an error and alerts at the top of the page if any questions are unanswered
  const makeSureAllQuestionsAnswered = (question) => {
    if (question === null) {
      throw new Error("Make sure you've answered all the questions");
    }
  };

  // Gets user answers after submission to compare with the answerKey
  const getUserAnswers = () => {
    let userAnswers = {};

    for (let i = 0; i <= 3; i++) {
      // Check every question to make sure it's not empty

      // HANDLE CHECKBOX HERE
      // if input == checkbox -
      makeSureAllQuestionsAnswered(
        document.querySelector(`input[name=q${i}]:checked`)
      );

      userAnswers[`${i}`] = document
        .querySelector(`input[name=q${i}]:checked`)
        .nextElementSibling.textContent.slice(3); // Slice off start of answer (a. , b. , etc)
    }

    // Checkbox handling
    makeSureAllQuestionsAnswered(
      // Makes sure at least one box is checked
      document.querySelector("input[name=q4]:checked")
    );

    // Get NodeList of answers
    const checkboxAnswersNodeList = document.querySelectorAll(
      `input[name=q4]:checked`
    );

    // Map NodeList textContent to an array
    const checkboxAnswers = Array.from(checkboxAnswersNodeList).map((answer) =>
      answer.nextElementSibling.textContent.slice(3)
    );

    userAnswers[4] = checkboxAnswers;
    console.log(userAnswers);
    return userAnswers;
  };

  // Handles displaying of alert if unanswered questions error is thrown
  const handleUnansweredQuestionsError = () => {
    // Make an alert
    const div = `<div class="alert alert-primary position-fixed top-0 start-0 w-100 text-center" role="alert" style="z-index:1050;">Make sure you've answered all the questions before submitting</div>`;

    $("body").prepend(div); // Add to start of DOM
    $(".alert").alert();

    // After 2.5 seconds, remove alert from DOM
    setTimeout(() => {
      $(".alert").fadeOut(300, () => {
        this.dispose();
      });
    }, 2500);
  };

  // Compares user's answers with the answer key
  // Returns the user's score
  const markQuiz = () => {
    let correctCount = 0;
    const userAnswers = getUserAnswers();
    for (let a in answerKey) {
      // Need to handle special checkbox question
      // If the answer in the answer key is an array...
      if (Array.isArray(answerKey[a])) {
        if (
          // And both of the answers match...
          answerKey[a][0] === userAnswers[4][0] &&
          answerKey[a][1] === userAnswers[4][1]
        ) {
          // Add one to score and skip the rest of the loop
          correctCount += 1;
          continue;
        }
      }

      // Need to parse out the HTML encodings from some fetched answers that contain puncuatition
      let parsedAnswer = new DOMParser().parseFromString(
        answerKey[a],
        "text/html"
      ).documentElement.textContent;

      if (parsedAnswer === userAnswers[a]) correctCount += 1;

      // console.log(`Answer: ${parsedAnswer}\nUser answer: ${userAnswers[a]}`);
    }

    return correctCount;
  };

  // Handles post submission modal events
  const handleModal = async (modal, name) => {
    modal.show();

    const perfectScoreNameResult = $("#perfectScoreNameResult");
    const scoreResult = $("#scoreResult");
    const timeResult = $("#timeResult");

    // Stop any animations from last game
    perfectScoreNameResult.stop().hide();
    scoreResult.stop().hide();
    timeResult.stop().hide();

    // Reset text content
    perfectScoreNameResult.text("");
    scoreResult.text("");
    timeResult.text("");

    // If score is perfect
    if (scoreAndTime.score == 5) {
      // Update text content
      perfectScoreNameResult.text(`${name.toUpperCase()}!`);
      perfectScoreNameResult.addClass("fw-bold text-primary");
      scoreResult.html(
        `You scored <span class="text-success fw-bold">5/5</span>. Way to go!`
      );
      timeResult.html(
        `You finished in <span class="text-warning fw-bold">${scoreAndTime.time}!</span>`
      );

      // Need to wrap fadeIn in a promise to make sure it resolves before moving on to the flashing
      await new Promise((resolve) => {
        // Once the fadeIn has resolved itself - move on
        perfectScoreNameResult.fadeIn(3000, resolve);
      });

      // Flash score and time results on screen
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          scoreResult.toggle();
          timeResult.toggle();
        }, i * 100); // Need to use i * 100 here because of how setTimeout works with the call stack (I think)
        // Without it, rather than toggling every 100 ms, it just adds 20 calls and executes them all at once
        // i * 100 adds the calls to the call stack to execute every 100ms
      }

      // Make sure results show at the end
      scoreResult.show();
      timeResult.show();

      // else if score is less then perfect
    } else {
      // Display score over 1 second fade in
      await new Promise((resolve) => {
        scoreResult
          .html(
            `Results for <span class="fw-bold text-success">${name}: <span class="text-danger fw-bold">${scoreAndTime.score} out of 5</span>`
          )
          .fadeIn(1000, resolve);
      });

      // After score display, display time over 1 second fade in
      await new Promise((resolve) => {
        console.log(scoreAndTime.time);
        timeResult
          .html(
            `You finished in <span class="text-primary fw-bold">${scoreAndTime.time}</span>`
          )
          .fadeIn(1000, resolve);
      });
    }

    // After modal has popped up...

    // Click on "Try Again"
    $("#tryAgainBtn").on("click", () => {
      modal.hide();
      clearDOM();
      showQuizPage(name);
    });

    // Click on "Logout"
    $("#logoutBtn").on("click", () => {
      clearDOM();
      $("#quizPage").hide();
      $("#loginPage").fadeIn(1000);
      $("#submitNameInput").val("");
      modal.hide();
    });
  };

  // Resets DOM after new game or logout
  const clearDOM = () => {
    $("#timer").html("00 : 00");
    $("#welcomeMessage").html("");
    $("#finalScore").html("");
    $("#quizList").html("");
    $("#perfectScoreNameResult").html("");
    $("#perfectScoreNameResult").hide();
    $("#scoreResult").html("");
    $("#scoreResult").hide();
    $("#timeResult").html("");
    $("#timeResult").hide();
  };

  const displayScoreInDOM = (score) => {
    $("#finalScore").text(`You scored ${score} out of 5`);
  };

  $("#quizPage").hide();

  submitNameBtn.on("click", (e) => {
    e.preventDefault();

    // Regex for username validation
    const nameRe = /^[a-zA-Z-]{1,20}$/;
    try {
      name = submitNameInput.val();

      if (!name) throw new Error("Name can't be empty."); // If empty name
      if (!nameRe.test(name)) {
        // If invalid name
        throw new Error("Invalid name.");
      }

      $("#loginPage").fadeOut();
      showQuizPage(name);
    } catch (error) {
      const errorSpan = $("#errorSpan");

      // Show error message in DOM
      errorSpan.text(error.message);
      errorSpan.stop().show();
      errorSpan.addClass("text-danger fw-bold w-100 text-center");

      // Automatically fadeOut error message
      setTimeout(() => {
        errorSpan.fadeOut(300);
      }, 2000);
    }
  });
});
