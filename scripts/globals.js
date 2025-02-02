import getRandomWord from "./Utils/wordGen.js";

const startNewRound = () => {
	console.log("new round")
  let keyWord = getRandomWord().split("");

  fillGuessBoxContainer();

  setActiveRow();

  setActiveBox();

  addKeyboard(keyWord);

  // $("body").on("keydown", (e) => {
  //   const letter = e.key.toUpperCase();
  //   if (
  //     !![...$("#keyboard input")].find((ele) => ele.value === letter) ||
  //     letter === "BACKSPACE" ||
  //     letter === "RETURN"
  //   ) {
  //     handleKeyClick(e, keyWord);
  //   }
  // });
};

const addKeyboard = (keyWord) => {
  //toggle here
  // const keyboard = $('<keyboard-ele class="container-fluid"></keyboard-ele>')
  // keyboard.attr('key', keyWord)
  // $('footer').append(keyboard)

  //start comment for testing keyboard component
  $("footer").html("");
  $("footer").append(`
	<div id="keyboard" class="container-fluid justify-content-center">
    <div id="keyboard-row-1"></div>
    <div id="keyboard-row-2" class="container"></div>
    <div id="keyboard-row-3"></div>
	</div>
	`);

  let keyboardKeys = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
  keyboardKeys.push("DELETE");
  keyboardKeys.splice(19, 0, "ENTER");

  let keyEle = $("<input class='key' type='button'></input>");

  keyEle.click((e) => {
    handleKeyClick(e, keyWord);
    $(e.target).removeClass("clicked");
  });

  keyboardKeys.forEach((ele, i) => {
    let key = keyEle.clone(true);
    $(key).attr("value", ele);
    switch (true) {
      case i < 10:
        $("#keyboard-row-1").append(key);
        break;
      case i < 19:
        $("#keyboard-row-2").append(key);
        break;
      default:
        $("#keyboard-row-3").append(key);
    }
    let enterKey = $(key).attr("value") === "ENTER";
  });

  $("body").off();
  const handleKeyPress = (e) => {
    const letter = e.key.toUpperCase();
    if (
      !![...$("#keyboard input")].find((ele) => ele.value === letter) ||
      letter === "BACKSPACE" ||
      letter === "RETURN"
    ) {
      handleKeyClick(e, keyWord);
    }
  };
  $("body").on("keydown", (e) => handleKeyPress(e));
  //end comment
};

const setActiveBox = (target) => {
  const boxes = $(".guess-row.active guess-box");
  let current = $("guess-box.active");
  const currentIdx = boxes.index(current);
  switch (true) {
    case !!target || target === 0:
      $(current).removeClass("active");
      current = target;
      $(current).addClass("active");
      $(current).attr("letter", "");
      break;
    case currentIdx >= boxes.length - 1:
      null;
      break;
    default:
      $(current).index() < boxes.length
        ? ($(current).removeClass("active"),
          (current = boxes.get(currentIdx + 1)),
          $(current).addClass("active"))
        : null;
      break;
  }
};

const fillGuessBoxContainer = () => {
  const container = $("#guess-box-container");
  container.html("");
  for (var i = 0; i < 6; i++) {
    let guessRow = $(`
			<div class="guess-row row g-1"></div>
		`);
    for (var j = 0; j < 5; j++) {
      guessRow.append('<guess-box class="col" letter=""></guess-box>');
    }
    container.append(guessRow);
  }
};

const setActiveRow = () => {
  const guessRows = $(".guess-row");
  let current = $(".guess-row.active");
  const currentIdx = guessRows.index(current);
  $(current).removeClass("active");
  current = guessRows.get(currentIdx + 1);
  $(current).addClass("active");
};

const checkGuess = async (keyWord) => {
  const boxes = $(".guess-row.active guess-box");
  const word = [...boxes].map((ele) => ele.getAttribute("letter")).join("");
	const isValid = await validWordCheck(word)
  if (!isValid) {
    alert("invalid word");
    return false;
  } else {
		boxes.each((i, b) => {
	    let letter = $(b).attr("letter");
	    switch (true) {
	      case letter === keyWord[i]:
	        $(b).addClass("correct");
	        break;
	      case keyWord.includes(letter):
	        $(b).addClass("includes");
	        break;
	      default:
	        $(b).addClass("invalid");
	        null;
	    }
	  });	
	  return checkWin(keyWord);
	}
};

const checkWin = (keyWord) => {
  switch (true) {
    case $(".guess-row.active guess-box.correct").length === 5:
      alert("You Win!");
      return true;
      break;
    case $(".guess-row").index($(".guess-row.active")) === 5:
      alert("You are out of guesses \n The word was " + keyWord.join(""));
      $(".guess-row.active").removeClass("active");
      return true;
      break;
    default:
      return false;
  }
};

const handleKeyClick = async (e, keyWord) => {
  $(e.target).addClass("clicked");
  let letter = e.target.value || e.key.toUpperCase();
  let activeBox = $("guess-box.active");
  let idx = activeBox.index();
  let prevBox = $(".active guess-box").get(idx - 1);
  switch (true) {
    case letter === "ENTER":
      await checkGuess(keyWord) ? startNewRound() : (setActiveRow(), setActiveBox());
      break;
    case letter === "DELETE" || letter === "BACKSPACE":
      !!$(activeBox).attr("letter")
        ? $(activeBox).attr("letter", "")
        : setActiveBox($(prevBox));
      break;
    default:
      activeBox.attr("letter", letter);
      setActiveBox();
      break;
  }
};

const validWordCheck = async (word) => {
  return await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  ).then((resp) => resp.ok);
};

export {
  startNewRound,
  fillGuessBoxContainer,
  setActiveBox,
  setActiveRow,
  checkGuess,
  handleKeyClick,
};
