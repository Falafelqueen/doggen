const dogDiv = document.querySelector(".dog-image-hold");

const insertImg = (data) => {
  const dogSrc = data.url;
  const imgTag = `<img src=${dogSrc} class="random-dog">`;
  dogDiv.insertAdjacentHTML("afterbegin", imgTag);
};
const fetchDog = () => {
  fetch("https://random.dog/woof.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      insertImg(data);
    });
};

const restartBtn = document.querySelector(".restart-btn");
document.addEventListener("DOMContentLoaded", () => {
  fetchDog();
  restartBtn.classList.add("hidden");
});

const form = document.getElementById("guessing-form");
const correctAnswer = document.getElementById("random-response");

const reaction = () => {
  const reactionArray = ["Oh, no you suck", "Yey, congratulation"];
  const reactionA =
    reactionArray[Math.floor(Math.random() * reactionArray.length)];
  return reactionA;
};

form.addEventListener("submit", (event) => {
  const userGuess = () => {
    let guess = "";
    if (document.getElementById("female").checked) {
      guess = "female";
    } else if (document.getElementById("male").checked) {
      guess = "male";
    }
    return guess;
  };

  let guess = userGuess();
  let randomReaction = reaction();

  const randomAnswer = () => {
    let answer = "";
    if (randomReaction === "Yey, congratulation") {
      answer = guess;
    } else if (guess === "female") {
      answer = "male";
    } else {
      answer = "female";
    }
    return answer;
  };

  const answer = randomAnswer();

  event.preventDefault();
  correctAnswer.innerHTML = "";
  form.classList.add("hidden");
  correctAnswer.classList.remove("hidden");
  const answerTag = `<h2> ${randomReaction}</h2>
  <p>You guessed ${guess} and the correct answer was ${answer}</p>`;
  correctAnswer.insertAdjacentHTML("afterbegin", answerTag);

  restartBtn.classList.remove("hidden");
});

restartBtn.addEventListener("click", () => {
  dogDiv.innerHTML = "";
  form.classList.remove("hidden");
  correctAnswer.classList.add("hidden");
  fetchDog();
});
