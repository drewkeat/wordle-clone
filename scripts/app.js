import GuessBox from "./Components/GuessBox.js"

$(".navbar button").click(e=>alert(`${e.target.parentNode?.id} clicked`))

const fillGuessBoxContainer = () => {
	const container = $('#guess-box-container')
  for (var i = 0; i < 6; i++) {
		let guessRow = $(`
			<div class="guess-row row g-1"></div>
		`)
		for (var j = 0; j < 5; j++){
			guessRow.append('<guess-box class="col" letter=""></guess-box>')	
		}
		container.append(guessRow)
	}
	// $('.guess-row').first().addClass('active')
}

fillGuessBoxContainer()

const setActiveRow=()=>{
	const guessRows = $(".guess-row")
	let current = $(".guess-row.active")
	const currentIdx = guessRows.index(current)
	$(current).removeClass('active')
	current = guessRows.get(currentIdx+1)
	$(current).addClass('active')
}

setActiveRow()

const setActiveBox=(target)=>{
	const boxes = $('.guess-row.active guess-box')
	let current = $('guess-box.active')
	const currentIdx = boxes.index(current)
	switch (true) {
		case !!target || target === 0:
		  $(current).removeClass('active')
			current = target
			$(current).addClass('active')
			$(current).attr('letter','')
			break;
		case currentIdx >= boxes.length - 1:
		  null
		  break;
		default:
			$(current).index() < boxes.length ?
		  ($(current).removeClass('active'),
	 		current = boxes.get(currentIdx+1),
			$(current).addClass('active')) :
			null
			break;
	}
}

setActiveBox()

const checkGuess = () => {
	let activeRow = $('.guess-row.active')
	let boxes = activeRow.children('guess-box')
	let word = boxes.text()
	console.log(word)
}

let keyboardKeys = "QWERTYUIOPASDFGHJKLZXCVBNM".split('')
keyboardKeys.push("DELETE")
keyboardKeys.splice(19,0,"ENTER")

let keyEle = $("<button class='key btn btn-dark'></button>")

const handleKeyClick = (e) => {
	let letter = e.target.innerText
	let activeBox = $('guess-box.active')
  let idx = activeBox.index()
	let prevBox = $('.active guess-box').get(idx-1)
	switch (true) {
		case letter==="ENTER": 
		  checkGuess()
		  setActiveRow();
			setActiveBox();
			break;
		case letter === "DELETE":
			!!$(activeBox).attr('letter') ?
			$(activeBox).attr('letter', '') :
			setActiveBox($(prevBox))
		  break;
		default:
			activeBox.attr('letter',letter)
			setActiveBox()
		  break;
	}
}

keyEle.click(e=>{
	handleKeyClick(e)
})

keyboardKeys.forEach((ele,i) => {
	let key = keyEle.clone(true)
	key.text(ele)
	switch(true){
		case i < 10:
			$('#keyboard-row-1').append(key)
			break;
		case i < 19: 
			$('#keyboard-row-2').append(key)
			break;
		default:
			$('#keyboard-row-3').append(key)
	}
})

