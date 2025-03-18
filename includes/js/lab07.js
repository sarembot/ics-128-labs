// Mitchell Saremba - ICS128 - Lab07
$(document).ready(() => {
  const submitNameBtn = $("#submitNameBtn");
  const submitNameInput = $("#submitNameInput");
  const url = `https://opentdb.com/api.php?amount=5&type=multiple`;

  /***
   * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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

  /***
   * Fetch the quiz questions/ answers
   */
  const getData = async () => {
    const res = await fetch(url);
    const data = await res.json();

    return data.results;
  };

  const correctAnswers = {};

  const makeQuestions = async () => {
    const questions = await getData();

    let idCount = 0;
    for (let q of questions) {
      let answers = q.incorrect_answers.concat(q.correct_answer);
      shuffle(answers);

      $("#quizList").append(`
                <li id="q${idCount}">
                 ${q.question} 
                </li> `);

      const id = "#" + "q" + idCount;

      console.log(idCount);

      let charCount = "a";
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
        charCount = String.fromCharCode(charCount.charCodeAt(0) + 1);
      }
      idCount += 1;
    }

    console.log(correctAnswers);
    // Idea for checking if it's correct:
    // Return a structure containing the correct answer for each question
    // After quiz submission, compare to see if correct answer is selected
  };

  $("#quizPage").hide();

  submitNameBtn.on("click", (e) => {
    e.preventDefault();
    const nameRe = /^[a-zA-Z-]{1,20}$/;
    try {
      const name = submitNameInput.val();

      if (!name) throw new Error("Name can't be empty.");
      if (!nameRe.test(name)) {
        console.log();
        throw new Error("Invalid name.");
      }

      $("#loginPage").hide();
      $("#quizPage").show();
      $("#welcomeMessage.h4").text(`Hello, ${name}`);
      makeQuestions();
    } catch (error) {
      console.log(error.message);
      $("#errorSpan").text(error.message);
    }
  });
});
